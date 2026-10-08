import { useState } from "react";
import { LogOut, Loader2,Pencil } from "lucide-react";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import LoginCard from "@/shared/components/sections/LoginCard";
import SignupCard, { type SignupValues } from "@/shared/components/sections/SignupCard";
import OtpVerifyCard from "@/shared/components/sections/OtpVerifyCard";
import NotificationModal from "@/shared/components/sections/NotificationModal";
import ForgotPasswordCard from "@/shared/components/sections/ForgotPasswordCard";
import ResetPasswordCard from "@/shared/components/sections/ResetPasswordCard";
import { ApiError, apiClient } from "@/shared/api/apiClient";

import {
  affiliateAuthService,
  type AuthResponse,
} from "@/shared/api/services/affiliateAuthService";
import {
  affiliateProfileService,
  buildProfilePayload,
} from "@/shared/api/services/affiliateProfileService";
import { authStorage } from "@/shared/utils/authStorage";
import { validateOtp } from "@/shared/utils/formValidation";
import SectionGlow from "@/shared/components/layout/SectionGlow";

type View =
  | "signup"
  | "login"
  | "verify-otp"
  | "forgot-password"
  | "reset-otp"
  | "reset-password";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDisplayableMessage(value: string): boolean {
  const message = value.trim();
  if (!message || message.length > 400) return false;
  if (/<\/?[a-z][^>]*>|<style\b|<!doctype/i.test(message)) return false;
  if (/[{}]/.test(message) || /(?:^|[;}])\s*[-\w]+\s*:\s*[^;{}]+;/.test(message)) {
    return false;
  }
  return true;
}

function extractServerMessage(payload: unknown): string | null {
  if (typeof payload === "string") {
    const message = payload.trim();
    return isDisplayableMessage(message) ? message : null;
  }
  if (!isRecord(payload)) return null;

  for (const key of ["message", "error", "errors"]) {
    const value = payload[key];
    if (typeof value === "string" && isDisplayableMessage(value)) return value.trim();
    if (Array.isArray(value)) {
      const firstMessage = value.find(
        (item): item is string =>
          typeof item === "string" && isDisplayableMessage(item)
      );
      if (firstMessage) return firstMessage.trim();
    }
    if (isRecord(value)) {
      const message = Object.values(value)
        .map((item) => extractServerMessage(item))
        .find((item): item is string => item !== null);
      if (message) return message;
    }
  }

  return extractServerMessage(payload.data);
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "Email or password is incorrect. Check your details and try again.";
    }

    const serverMessage = extractServerMessage(error.details);
    if (serverMessage) return serverMessage;

    switch (error.status) {
      case 403:
        return "This account cannot sign in yet. Verify your email or contact support.";
      case 404:
        return "We couldn't find an account with those details.";
      case 409:
        return "An account with this email already exists. Try logging in instead.";
      case 422:
        return "Some of the information is invalid. Review your details and try again.";
      case 408:
        return "The request timed out. Check your connection and try again.";
      case 429:
        return "Too many attempts. Please wait a moment before trying again.";
      default:
        return error.status >= 500
          ? "We couldn't connect to the account service. Please try again shortly."
          : fallback;
    }
  }

  if (error instanceof Error && isDisplayableMessage(error.message)) {
    return error.message.trim();
  }
  return fallback;
}

function getEmailVerificationMessage(error: unknown): string | null {
  if (!(error instanceof ApiError)) return null;

  const message = extractServerMessage(error.details) ?? error.message;
  return /(?:otp|one[- ]time (?:password|code)).{0,80}(?:sent|send)|(?:unverified|not verified)/i.test(
    message
  )
    ? message
    : null;
}

function isResetCodeError(error: unknown): boolean {
  if (error instanceof ApiError) {
    const message = `${error.message} ${extractServerMessage(error.details) ?? ""}`;
    return (
      [400, 401, 422].includes(error.status) &&
      /(otp|verification|reset|code|expired|invalid)/i.test(message)
    );
  }

  return error instanceof Error && /(otp|verification|reset) code.*(invalid|expired)/i.test(error.message);
}

export default function AffiliateLoginSection() {
  const [showDashboard, setShowDashboard] = useState(
    () => Boolean(authStorage.getSession())
  );
  const [account, setAccount] = useState<AuthResponse | null>(
    () => authStorage.getUser()
  );
  const [view, setView] = useState<View>("signup");

  const [pendingEmail, setPendingEmail] = useState<string>(
    () => authStorage.getSignupEmail() || ""
  );
  const [resetOtp, setResetOtp] = useState("");

  // Modal States
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = (type: "success" | "error", message: string) => {
    setModalType(type);
    setModalMessage(message);
    setModalOpen(true);
  };

  const showError = (error: unknown, fallback: string) => {
    openModal("error", getErrorMessage(error, fallback));
  };

  const handleSignup = async (values: SignupValues) => {
    try {
      const response = await affiliateAuthService.signup({
        name: values.full_name,
        email: values.email,
        password: values.password,
      });

      setPendingEmail(values.email);
      authStorage.saveSignup("", values.email);
      setView("verify-otp");

      openModal(
        "success",
        response.message || "Account created successfully! Please verify your email."
      );
    } catch (error) {
      showError(error, "We couldn't create your account. Please try again.");
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    // Validate the code before hitting the API
    const otpMessage = validateOtp(otp);
    if (otpMessage) {
      openModal("error", otpMessage);
      return;
    }
    const code = otp.trim();

    const activeEmail = pendingEmail || authStorage.getSignupEmail();

    if (!activeEmail) {
      openModal("error", "Email address is missing. Please sign up or log in again.");
      setView("signup");
      return;
    }

    try {
      const authData = await affiliateAuthService.verifyOtp({
        email: activeEmail,
        otp: code,
      });

      if (!authData?.token) {
        throw new Error("Verification succeeded, but no sign-in token was returned.");
      }
      const email = authStorage.getSignupEmail();
      authStorage.saveSession(authData.token);
      authStorage.saveSignup(authData.token, email);
      authStorage.saveUser(authData);
      if (authData.profile) authStorage.saveProfile(authData.profile);
      setAccount(authData);
      setShowDashboard(true);

      openModal("success", "Your email has been successfully verified!");
    } catch (error) {
      showError(
        error,
        "The verification code is invalid or expired. Try again or request a new code."
      );
    }
  };

  const handleResendOtp = async () => {
    const activeEmail = pendingEmail || authStorage.getSignupEmail();
    if (!activeEmail) {
      openModal("error", "Email address is missing.");
      return;
    }
    try {
      await affiliateAuthService.resendOtp({ email: activeEmail });
      openModal("success", "New OTP has been sent to your email!");
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "We couldn't resend the verification code. Please try again.")
      );
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await affiliateAuthService.forgotPassword({ email });
      authStorage.saveResetEmail(email);
      setPendingEmail(email);
      setResetOtp("");
      setView("reset-otp");
      openModal(
        "success",
        response.message || "If an account matches that email, a reset code has been sent."
      );
    } catch (error) {
      showError(error, "We couldn't send the reset code. Please try again.");
    }
  };

  const handleVerifyResetOtp = async (otp: string) => {
    const email = authStorage.getResetEmail() || pendingEmail;
    if (!email) {
      setView("forgot-password");
      openModal("error", "Enter your email address to request a password reset code.");
      return;
    }

    setResetOtp(otp);
    setView("reset-password");
  };

  const handleResendResetCode = async () => {
    const email = authStorage.getResetEmail() || pendingEmail;
    if (!email) {
      openModal("error", "Enter your email address to request a password reset code.");
      setView("forgot-password");
      return;
    }
    try {
      const response = await affiliateAuthService.forgotPassword({ email });
      openModal(
        "success",
        response.message || "If an account matches that email, a new reset code has been sent."
      );
    } catch (error) {
      throw new Error(getErrorMessage(error, "We couldn't resend the reset code. Please try again."));
    }
  };

  const handleResetPassword = async (password: string) => {
    const email = authStorage.getResetEmail() || pendingEmail;
    if (!email || !resetOtp) {
      openModal("error", "Request a password reset code before submitting a new password.");
      setView("forgot-password");
      return;
    }
    try {
      const response = await affiliateAuthService.resetPassword({
        email,
        otp: resetOtp,
        password,
      });
      authStorage.saveSignup("", email);
      authStorage.clearResetEmail();
      setResetOtp("");
      setView("login");
      openModal(
        "success",
        response.message || "Your password has been changed. You can now log in."
      );
    } catch (error) {
      if (isResetCodeError(error)) {
        setResetOtp("");
        setView("reset-otp");
        openModal(
          "error",
          (error instanceof ApiError && extractServerMessage(error.details)) ||
            "The reset code is invalid or expired. Please enter it again."
        );
        return;
      }
      showError(error, "We couldn't reset your password. Check the code and try again.");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const authData = await affiliateAuthService.login({ email, password });

      if (authData?.is_verified === false) {
        setPendingEmail(email);
        authStorage.saveSignup("", email);
        setView("verify-otp");

        openModal(
          "error",
          authData.message ||
            "Please verify your email before signing in. A verification code is required."
        );
        return;
      }

      if (!authData?.token) {
        throw new Error("Login failed. No token received.");
      }

      authStorage.saveSession(authData.token);
      authStorage.saveSignup(authData.token, email);
      authStorage.saveUser(authData);
      if (authData.profile) authStorage.saveProfile(authData.profile);
      setAccount(authData);
      setShowDashboard(true);

      openModal("success", "Login successful!");
    } catch (error) {
      const verificationMessage = getEmailVerificationMessage(error);
      if (verificationMessage) {
        setPendingEmail(email);
        authStorage.saveSignup("", email);
        setView("verify-otp");
        openModal("success", verificationMessage);
        return;
      }

      showError(error, "Email or password is incorrect. Check your details and try again.");
    }
  };

  // Client-side logout: clears every stored affiliate value and resets the UI.
  // (The backend /affiliate/logout endpoint currently deletes the account, so it is NOT called here.)
  const handleLogout = () => {
    authStorage.clearAll();
    apiClient.clearCache();
    setAccount(null);
    setShowDashboard(false);
    setPendingEmail("");
    setResetOtp("");
    setView("login");
    openModal("success", "You have been logged out.");
  };

  return (
    <section>
      <SectionHeaderblog
        eyebrow={
          showDashboard
            ? "Affiliate account"
            : view === "verify-otp"
            ? "Email verification"
            : view === "forgot-password" || view === "reset-otp" || view === "reset-password"
            ? "Password recovery"
            : "Affiliate account access"
        }
        title={
          showDashboard
            ? "Your affiliate"
            : view === "verify-otp"
            ? "Confirm your"
            : view === "forgot-password"
            ? "Recover your"
            : view === "reset-otp"
            ? "Enter your"
            : view === "reset-password"
            ? "Choose a new"
            : "Start new"
        }
        highlight={
          showDashboard
            ? "dashboard."
            : view === "verify-otp"
            ? "identity."
            : view === "forgot-password"
            ? "account."
            : view === "reset-otp"
            ? "reset code."
            : view === "reset-password"
            ? "password."
            : "or continue."
        }
        description={
          showDashboard
            ? "Your account is ready. Find your affiliate status and program details below."
            : view === "verify-otp"
            ? "Enter the 6-digit verification code sent to your email to continue."
            : view === "forgot-password"
            ? "Enter your email and we'll send a code so you can reset your password."
            : view === "reset-otp"
            ? "Enter the 6-digit code we sent to your email."
            : view === "reset-password"
            ? "Your code is verified. Set a new password to finish."
            : "Create an affiliate account to begin your journey. Already registered? Log in to access your dashboard and track your activity."
        }
      />

      {showDashboard ? (
        <AffiliateDashboard
          account={account}
          onLogout={handleLogout}
          onUpdateAccount={(updatedAccount) => {
            authStorage.saveUser(updatedAccount);
            setAccount(updatedAccount);
          }}
        />
      ) : view === "verify-otp" ? (
        <OtpVerifyCard
          email={pendingEmail || authStorage.getSignupEmail()}
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
        />
      ) : view === "forgot-password" ? (
        <ForgotPasswordCard
          defaultEmail={
            pendingEmail || authStorage.getResetEmail() || authStorage.getSignupEmail()
          }
          onSubmit={handleForgotPassword}
          onBackToLogin={(email) => {
            if (email) setPendingEmail(email);
            setView("login");
          }}
        />
      ) : view === "reset-otp" ? (
        <OtpVerifyCard
          email={authStorage.getResetEmail() || pendingEmail}
          onSubmit={handleVerifyResetOtp}
          onResend={handleResendResetCode}
          eyebrow="Password recovery"
          title="Enter reset code"
          description={
            <>
              We sent a one-time code to{" "}
              <span className="font-medium text-white">
                {authStorage.getResetEmail() || pendingEmail || "your email"}
              </span>
              . Enter it below to continue.
            </>
          }
          submitLabel="Verify code"
          onBack={() => setView("login")}
        />
      ) : view === "reset-password" ? (
        <ResetPasswordCard
          email={authStorage.getResetEmail() || pendingEmail}
          onSubmit={handleResetPassword}
          onBackToLogin={() => setView("login")}
        />
      ) : view === "signup" ? (
        <SignupCard onSubmit={handleSignup} onSwitchToLogin={() => setView("login")} />
      ) : (
        <LoginCard
          defaultEmail={pendingEmail || authStorage.getSignupEmail()}
          onSubmit={handleLogin}
          onSwitchToSignup={() => setView("signup")}
          onForgotPassword={(email) => {
            if (email) setPendingEmail(email);
            setView("forgot-password");
          }}
        />
      )}

      <NotificationModal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                 */
/* -------------------------------------------------------------------------- */

type ProfileLinkField =
  | "website_url"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "facebook"
  | "tiktok";

type FormField = ProfileLinkField | "order_amount" | "notes";

const NOTES_MAX_LENGTH = 1000;

const PROFILE_LINK_FIELDS: {
  key: ProfileLinkField;
  label: string;
  placeholder: string;
}[] = [
  { key: "website_url", label: "Website", placeholder: "https://yourwebsite.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourname" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourname" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourname" },
];

function isSafeProfileUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

type ProfileFormState = Record<ProfileLinkField, string> & {
  order_amount: string;
  notes: string;
};

function toFormState(profile?: AuthResponse["profile"] | null): ProfileFormState {
  const links = Object.fromEntries(
    PROFILE_LINK_FIELDS.map(({ key }) => [key, (profile?.[key] as string | null | undefined) ?? ""])
  ) as Record<ProfileLinkField, string>;

  return {
    ...links,
    order_amount: profile?.order_amount != null ? String(profile.order_amount) : "",
    notes: profile?.notes ?? "",
  };
}

function formatAmount(value: number | string): string {
  const amount = Number(value);
  return Number.isFinite(amount) ? `$${amount.toLocaleString()}` : String(value);
}

const inputClass = (hasError: boolean) =>
  `rounded-md border bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#e63946] disabled:opacity-50 ${
    hasError ? "border-red-400" : "border-white/15"
  }`;

const logoutButtonClass =
  "inline-flex h-9 items-center gap-2 rounded-md border border-white/20 px-4 font-space-grotesk text-xs font-bold text-white transition hover:border-[#e63946] hover:bg-[#e63946] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function AffiliateDashboard({
  account,
  onUpdateAccount,
  onLogout,
}: {
  account: AuthResponse | null;
  onUpdateAccount: (account: AuthResponse) => void;
  onLogout: () => void;
}) {
  const status = account?.profile?.status ?? "Signed in";
  const isPending = status.toLowerCase() === "pending";

  const hasSavedDetails =
    PROFILE_LINK_FIELDS.some(({ key }) => Boolean(account?.profile?.[key])) ||
    account?.profile?.order_amount != null ||
    Boolean(account?.profile?.notes?.trim());

  // First-time users (nothing saved yet) start directly in edit mode.
  const [isEditing, setIsEditing] = useState(!hasSavedDetails);
  const [form, setForm] = useState<ProfileFormState>(() => toFormState(account?.profile));
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, string>>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // True only when the form differs from what is saved.
  const isDirty = (() => {
    const saved = toFormState(account?.profile);
    return (Object.keys(saved) as (keyof ProfileFormState)[]).some(
      (key) => form[key].trim() !== saved[key].trim()
    );
  })();

  const updateField = (key: FormField, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setFormError("");
  };

  const startEditing = () => {
    setForm(toFormState(account?.profile)); // always start from the saved data
    setFieldErrors({});
    setFormError("");
    setSaveSuccess(false);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (isDirty && !window.confirm("Discard your unsaved changes?")) return;
    setForm(toFormState(account?.profile));
    setFieldErrors({});
    setFormError("");
    setIsEditing(false);
  };

  const saveProfile = async () => {
    if (!account?.user?.id) return;

    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    const errors: Partial<Record<FormField, string>> = {};

    for (const { key, label } of PROFILE_LINK_FIELDS) {
      const value = form[key].trim();

      if (value && !isSafeProfileUrl(value)) {
        errors[key] = `${label} must be a valid URL beginning with http:// or https://.`;
      }
    }

    const amountText = form.order_amount.trim();
    let orderAmount: number | null = null;

    if (amountText) {
      orderAmount = Number(amountText);

      if (!Number.isFinite(orderAmount) || orderAmount < 0) {
        errors.order_amount = "Order amount must be a number of 0 or more.";
      }
    }

    if (form.notes.length > NOTES_MAX_LENGTH) {
      errors.notes = `Notes can be at most ${NOTES_MAX_LENGTH} characters.`;
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormError("Please correct the highlighted fields before saving.");
      return;
    }

    setFormError("");
    setSubmitting(true);
    setSaveSuccess(false);

    try {
      const payload = buildProfilePayload(
        account.user.id,
        account.user.role,
        account.profile,
        {
          website_url: form.website_url,
          linkedin: form.linkedin,
          youtube: form.youtube,
          instagram: form.instagram,
          facebook: form.facebook,
          tiktok: form.tiktok,
          order_amount: orderAmount,
          notes: form.notes,
        }
      );

      /*
       * IMPORTANT:
       * This now calls:
       *
       * PUT /api/v1/affiliate/update/{userId}
       *
       * The service also refreshes the apiClient GET cache after the PUT.
       */
      const savedProfile = await affiliateProfileService.updateProfile(
        account.user.id,
        payload
      );

      // Use the server's actual response as the source of truth.
      const mergedProfile = {
        ...account.profile,
        ...savedProfile,
      };

      // Persist the newest profile for page refreshes.
      authStorage.saveProfile(mergedProfile);

      // Update React state immediately.
      onUpdateAccount({
        ...account,
        profile: mergedProfile,
      });

      // Reset the form from the actual server response.
      setForm(toFormState(mergedProfile));

      setSaveSuccess(true);
      setIsEditing(false);
    } catch (err) {
      // Keep edit mode and preserve what the user typed.
      setFormError(
        err instanceof Error
          ? err.message
          : "Could not save profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogoutClick = () => {
    if (isEditing && isDirty && !window.confirm("You have unsaved changes. Log out anyway?")) {
      return;
    }
    onLogout();
  };

  return (
    <SectionGlow>
      <div className="mx-auto my-6 w-full max-w-193.5 rounded-xl border border-white/10 bg-[#111] p-6 text-white sm:p-8">
        {/* Pending review: show nothing else */}
        {isPending ? (
          <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-400"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            <div>
              <p className="font-space-grotesk text-xs font-bold uppercase tracking-[1px] text-yellow-400">
                Account under review
              </p>
              <h3 className="mt-2 font-space-grotesk text-2xl font-bold text-white">
                Your application is pending.
              </h3>
              <p className="mt-3 max-w-[420px] font-space-grotesk text-sm leading-relaxed text-white/60">
                Thank you for signing up as a Rokai affiliate. Our team is reviewing your account and will notify you once it has been approved. This usually takes 1–3 business days.
              </p>
            </div>

            <button type="button" onClick={onLogout} className={`mt-2 ${logoutButtonClass}`}>
              Log out
              <LogOut size={14} aria-hidden />
            </button>
          </div>
        ) : (
          <>
            {/* Dashboard header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-space-grotesk text-xs font-bold uppercase tracking-[1px] text-[#e63946]">
                  Affiliate dashboard
                </p>
                <h3 className="mt-2 font-space-grotesk text-2xl font-bold">
                  Welcome{account?.user?.name ? `, ${account.user.name}` : " back"}.
                </h3>
                <p className="mt-2 font-space-grotesk text-sm text-white/65">
                  Your affiliate account is connected. Your program details will appear here.
                </p>
              </div>

            <div className="flex items-center gap-3">
  <span className="rounded-full border border-[#e63946]/40 bg-[#e63946]/10 px-3 py-1 font-space-grotesk text-xs capitalize text-[#ff7b82]">
    {status}
  </span>

  {isEditing ? (
    <button
      type="button"
      onClick={cancelEditing}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-white/20 px-4 font-space-grotesk text-xs font-bold text-white transition hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Back to profile
    </button>
  ) : (
    <button
      type="button"
      onClick={handleLogoutClick}
      className={logoutButtonClass}
    >
      Log out
      <LogOut size={14} aria-hidden />
    </button>
  )}
</div>
            </div>

            {account?.profile && (
              <div className="mt-6 border-t border-white/10 pt-6">
                {/* Section header with Edit button (view mode only) */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-space-grotesk text-xs font-bold uppercase tracking-[1px] text-[#e63946]">
                      Your profile
                    </p>
                    <h3 className="mt-2 font-space-grotesk text-xl font-bold">
                      {isEditing
                        ? "Edit website, social links, order amount and notes"
                        : "Website, social links, order amount and notes"}
                    </h3>
                  </div>

                  {!isEditing && (
                    <button
                      type="button"
                      onClick={startEditing}
                      className="inline-flex h-9 items-center gap-2 rounded-md bg-[#e63946] px-4 font-space-grotesk text-xs font-bold text-white transition hover:bg-[#c92e3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Pencil size={14} aria-hidden />
                      Edit profile
                    </button>
                  )}
                </div>

                {/* VIEW MODE */}
                {!isEditing && (
                  <>
                    {saveSuccess && (
                      <p role="status" className="mt-4 font-space-grotesk text-sm text-green-400">
                        Profile saved successfully!
                      </p>
                    )}

                    <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                      <div>
                        <dt className="font-space-grotesk text-xs text-white/50">Email</dt>
                        <dd className="mt-1 break-all font-space-grotesk text-sm">
                          {account.user.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-space-grotesk text-xs text-white/50">Commission</dt>
                        <dd className="mt-1 font-space-grotesk text-sm">
                          {account.profile.commission_percentage}%
                        </dd>
                      </div>
                      <div>
                        <dt className="font-space-grotesk text-xs text-white/50">Affiliate tier</dt>
                        <dd className="mt-1 font-space-grotesk text-sm">
                          {account.profile.badge_tier}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-space-grotesk text-xs text-white/50">Order amount</dt>
                        <dd className="mt-1 font-space-grotesk text-sm">
                          {account.profile.order_amount != null ? (
                            formatAmount(account.profile.order_amount)
                          ) : (
                            <span className="text-white/40">Not provided</span>
                          )}
                        </dd>
                      </div>

                      {PROFILE_LINK_FIELDS.map(({ key, label }) => {
                        const value = account.profile[key];
                        return (
                          <div key={key}>
                            <dt className="font-space-grotesk text-xs text-white/50">{label}</dt>
                            <dd className="mt-1 break-all font-space-grotesk text-sm">
                              {value && isSafeProfileUrl(value) ? (
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-white underline decoration-white/30 underline-offset-4 hover:text-[#ff7b82]"
                                >
                                  {value}
                                </a>
                              ) : value ? (
                                value
                              ) : (
                                <span className="text-white/40">Not provided</span>
                              )}
                            </dd>
                          </div>
                        );
                      })}

                      <div className="sm:col-span-3">
                        <dt className="font-space-grotesk text-xs text-white/50">Notes</dt>
                        <dd className="mt-1 whitespace-pre-line break-words font-space-grotesk text-sm">
                          {account.profile.notes?.trim() ? (
                            account.profile.notes
                          ) : (
                            <span className="text-white/40">No notes</span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </>
                )}

                {/* EDIT MODE */}
                {isEditing && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      saveProfile();
                    }}
                  >
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {PROFILE_LINK_FIELDS.map(({ key, label, placeholder }) => (
                        <label
                          key={key}
                          className="flex flex-col gap-2 font-space-grotesk text-xs text-white/70"
                        >
                          {label}
                          <input
                            type="text"
                            inputMode="url"
                            value={form[key]}
                            onChange={(event) => updateField(key, event.target.value)}
                            disabled={submitting}
                            placeholder={placeholder}
                            aria-invalid={Boolean(fieldErrors[key])}
                            aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                            className={`h-11 ${inputClass(Boolean(fieldErrors[key]))}`}
                          />
                          {fieldErrors[key] && (
                            <span id={`${key}-error`} className="text-xs text-red-300">
                              {fieldErrors[key]}
                            </span>
                          )}
                        </label>
                      ))}

                      <label className="flex flex-col gap-2 font-space-grotesk text-xs text-white/70">
                        Order amount ($)
                        <input
                          type="text"
                          inputMode="decimal"
                          value={form.order_amount}
                          onChange={(event) => updateField("order_amount", event.target.value)}
                          disabled={submitting}
                          placeholder="0.00"
                          aria-invalid={Boolean(fieldErrors.order_amount)}
                          aria-describedby={
                            fieldErrors.order_amount ? "order_amount-error" : undefined
                          }
                          className={`h-11 ${inputClass(Boolean(fieldErrors.order_amount))}`}
                        />
                        {fieldErrors.order_amount && (
                          <span id="order_amount-error" className="text-xs text-red-300">
                            {fieldErrors.order_amount}
                          </span>
                        )}
                      </label>

                      <label className="flex flex-col gap-2 font-space-grotesk text-xs text-white/70 sm:col-span-2">
                        <span className="flex items-center justify-between">
                          Notes
                          <span className="text-white/30">
                            {form.notes.length}/{NOTES_MAX_LENGTH}
                          </span>
                        </span>
                        <textarea
                          value={form.notes}
                          onChange={(event) =>
                            updateField("notes", event.target.value.slice(0, NOTES_MAX_LENGTH))
                          }
                          disabled={submitting}
                          rows={4}
                          placeholder="Anything you'd like us to know..."
                          aria-invalid={Boolean(fieldErrors.notes)}
                          aria-describedby={fieldErrors.notes ? "notes-error" : undefined}
                          className={`resize-none py-3 ${inputClass(Boolean(fieldErrors.notes))}`}
                        />
                        {fieldErrors.notes && (
                          <span id="notes-error" className="text-xs text-red-300">
                            {fieldErrors.notes}
                          </span>
                        )}
                      </label>
                    </div>

                    {formError && (
                      <p role="alert" className="mt-4 font-space-grotesk text-sm text-red-300">
                        {formError}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={submitting || !isDirty}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#e63946] px-5 font-space-grotesk text-sm font-bold text-white transition hover:bg-[#c92e3a] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Saving…
                          </>
                        ) : (
                          "Save changes"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={cancelEditing}
                        disabled={submitting}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 font-space-grotesk text-sm font-bold text-white transition hover:border-white/50 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </SectionGlow>
  );
}