import { useState } from "react";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import LoginCard from "@/shared/components/sections/LoginCard";
import SignupCard, { type SignupValues } from "@/shared/components/sections/SignupCard";
import OtpVerifyCard from "@/shared/components/sections/OtpVerifyCard";
import NotificationModal from "@/shared/components/sections/NotificationModal"; // <-- Modal Import kiya
import {
  affiliateAuthService,
  type AuthResponse,
} from "@/shared/api/services/affiliateAuthService";
import { authStorage } from "@/shared/utils/authStorage";
import SectionGlow from "@/shared/components/layout/SectionGlow";

type View = "signup" | "login" | "verify-otp";

export default function AffiliateLoginSection() {
  const [showDashboard, setShowDashboard] = useState(
    () => Boolean(authStorage.getSession())
  );
  const [view, setView] = useState<View>("signup");
  
  const [pendingEmail, setPendingEmail] = useState<string>(
    () => authStorage.getSignupEmail() || ""
  );
  
  const [account, setAccount] = useState<AuthResponse | null>(null);

  // Modal States
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState<string>('');


  const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.data?.message ||
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

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

      // Success Modal show karein
      setModalType('success');
      setModalMessage(response.message || "Account created successfully! Please verify your email.");
      setModalOpen(true);
    } catch (error: any) {
      const serverMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Signup failed. Please try again.";

      setModalType('error');
      setModalMessage(serverMessage);
      setModalOpen(true);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const activeEmail = pendingEmail || authStorage.getSignupEmail();
    
    if (!activeEmail) {
      setModalType('error');
      setModalMessage("Email address is missing. Please sign up or log in again.");
      setModalOpen(true);
      setView("signup");
      return;
    }

    try {
      const authData = await affiliateAuthService.verifyOtp({
        email: activeEmail,
        otp,
      });

      if (!authData?.token) {
        throw new Error("Verification succeeded, but no sign-in token was returned.");
      }
      const email = authStorage.getSignupEmail();
      authStorage.saveSession(authData.token);
      authStorage.saveSignup(authData.token, email);
      authStorage.saveUser(authData);
      setAccount(authData);
      setShowDashboard(true);

      setModalType('success');
      setModalMessage("Your email has been successfully verified!");
      setModalOpen(true);
    } catch (error: any) {
      const serverMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message || 
        "Invalid OTP code. Please try again.";

      setModalType('error');
      setModalMessage(serverMessage);
      setModalOpen(true);
    }
  };

  const handleResendOtp = async () => {
    const activeEmail = pendingEmail || authStorage.getSignupEmail();
    if (!activeEmail) {
      setModalType('error');
      setModalMessage("Email address is missing.");
      setModalOpen(true);
      return;
    }
    try {
      await affiliateAuthService.resendOtp({ email: activeEmail });
      setModalType('success');
      setModalMessage("New OTP has been sent to your email!");
      setModalOpen(true);
    } catch (error: any) {
      const serverMessage = error.response?.data?.message || "Failed to resend OTP.";
      setModalType('error');
      setModalMessage(serverMessage);
      setModalOpen(true);
    }
  };

const handleLogin = async (email: string, password: string) => {
  try {
    const authData: any = await affiliateAuthService.login({ email, password });

    // User verified nahi hai: OTP screen par bhejo
    if (authData?.is_verified === false) {
      setPendingEmail(email);
      authStorage.saveSignup("", email);
      setView("verify-otp");

      setModalType("error");
      setModalMessage(authData.message);
      setModalOpen(true);
      return;
    }

    if (!authData?.token) {
      throw new Error("Login failed. No token received.");
    }

    authStorage.saveSession(authData.token);
    authStorage.saveSignup(authData.token, email);
    authStorage.saveUser(authData);
    setAccount(authData);
    setShowDashboard(true);

    setModalType("success");
    setModalMessage("Login successful!");
    setModalOpen(true);
  } catch (error: any) {
    setModalType("error");
    setModalMessage(getErrorMessage(error, "Email or Password is incorrect!"));
    setModalOpen(true);
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
        title={showDashboard ? "Your affiliate" : view === "verify-otp" ? "Confirm your" : "Start new"}
        highlight={showDashboard ? "dashboard." : view === "verify-otp" ? "identity." : "or continue."}
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

      {/* Global Dynamic Notification Modal */}
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