import { useState } from "react";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import LoginCard from "@/shared/components/sections/LoginCard";
import SignupCard, { type SignupValues } from "@/shared/components/sections/SignupCard";
import OtpVerifyCard from "@/shared/components/sections/OtpVerifyCard";
import NotificationModal from "@/shared/components/sections/NotificationModal";
import { ApiError } from "@/shared/api/apiClient";
import {
  affiliateAuthService,
  type AuthResponse,
} from "@/shared/api/services/affiliateAuthService";
import { authStorage } from "@/shared/utils/authStorage";
import { validateOtp } from "@/shared/utils/formValidation";
import SectionGlow from "@/shared/components/layout/SectionGlow";

type View = "signup" | "login" | "verify-otp";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractServerMessage(payload: unknown): string | null {
  if (typeof payload === "string") {
    const message = payload.trim();
    return message || null;
  }
  if (!isRecord(payload)) return null;

  for (const key of ["message", "error", "errors"]) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value)) {
      const firstMessage = value.find(
        (item): item is string => typeof item === "string" && !!item.trim()
      );
      if (firstMessage) return firstMessage.trim();
    }
    if (isRecord(value)) {
      const firstFieldError = Object.values(value).find(
        (item) => typeof item === "string" || Array.isArray(item)
      );
      const message = extractServerMessage(firstFieldError);
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

  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

export default function AffiliateLoginSection() {
  const [showDashboard, setShowDashboard] = useState(
    () => Boolean(authStorage.getSession())
  );
  const [view, setView] = useState<View>("signup");

  const [pendingEmail, setPendingEmail] = useState<string>(
    () => authStorage.getSignupEmail() || ""
  );

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
      showError(error, "We couldn't resend the verification code. Please try again.");
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
      setShowDashboard(true);

      openModal("success", "Login successful!");
    } catch (error) {
      showError(error, "Email or password is incorrect. Check your details and try again.");
    }
  };

  const user = authStorage.getUser();

  return (
    <section>
      <SectionHeaderblog
        eyebrow={
          showDashboard
            ? "Affiliate account"
            : view === "verify-otp"
            ? "Email verification"
            : "Affiliate account access"
        }
        title={
          showDashboard ? "Your affiliate" : view === "verify-otp" ? "Confirm your" : "Start new"
        }
        highlight={
          showDashboard ? "dashboard." : view === "verify-otp" ? "identity." : "or continue."
        }
        description={
          showDashboard
            ? "Your account is ready. Find your affiliate status and program details below."
            : view === "verify-otp"
            ? "Enter the 6-digit verification code sent to your email to continue."
            : "Create an affiliate account to begin your journey. Already registered? Log in to access your dashboard and track your activity."
        }
      />

      {showDashboard ? (
        <AffiliateDashboard account={user} />
      ) : view === "verify-otp" ? (
        <OtpVerifyCard
          email={pendingEmail || authStorage.getSignupEmail()}
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
        />
      ) : view === "signup" ? (
        <SignupCard onSubmit={handleSignup} onSwitchToLogin={() => setView("login")} />
      ) : (
        <LoginCard
          defaultEmail={authStorage.getSignupEmail()}
          onSubmit={handleLogin}
          onSwitchToSignup={() => setView("signup")}
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

function AffiliateDashboard({ account }: { account: AuthResponse | null }) {
  const status = account?.profile?.status ?? "Signed in";

  return (
    <SectionGlow>
      <div className="mx-auto my-6 w-full max-w-193.5 rounded-xl border border-white/10 bg-[#111] p-6 text-white sm:p-8">
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
          <span className="rounded-full border border-[#e63946]/40 bg-[#e63946]/10 px-3 py-1 font-space-grotesk text-xs capitalize text-[#ff7b82]">
            {status}
          </span>
        </div>

        {account && account.profile && (
          <dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
            <div>
              <dt className="font-space-grotesk text-xs text-white/50">Email</dt>
              <dd className="mt-1 break-all font-space-grotesk text-sm">{account.user.email}</dd>
            </div>
            <div>
              <dt className="font-space-grotesk text-xs text-white/50">Commission</dt>
              <dd className="mt-1 font-space-grotesk text-sm">
                {account.profile.commission_percentage}%
              </dd>
            </div>
            <div>
              <dt className="font-space-grotesk text-xs text-white/50">Affiliate tier</dt>
              <dd className="mt-1 font-space-grotesk text-sm">{account.profile.badge_tier}</dd>
            </div>
          </dl>
        )}
      </div>
    </SectionGlow>
  );
}





















































































































