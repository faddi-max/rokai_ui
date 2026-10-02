import { useState } from "react";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import LoginCard from "@/shared/components/sections/LoginCard";
import SignupCard, { type SignupValues } from "@/shared/components/sections/SignupCard";
import {
  affiliateAuthService,
  type AuthResponse,
} from "@/shared/api/services/affiliateAuthService";
import { authStorage } from "@/shared/utils/authStorage";
import SectionGlow from "@/shared/components/layout/SectionGlow";

type View = "signup" | "login";

export default function AffiliateLoginSection() {
  const [showDashboard, setShowDashboard] = useState(
    () => authStorage.hasSignupToken() || Boolean(authStorage.getSession())
  );
  const [view, setView] = useState<View>(() =>
    authStorage.hasSignupToken() ? "login" : "signup"
  );
  const [account, setAccount] = useState<AuthResponse | null>(null);

  const handleSignup = async (values: SignupValues) => {
    const response = await affiliateAuthService.signup({
      name: values.full_name,
      email: values.email,
      password: values.password,
    });
    if (!response.token) {
      throw new Error("Your account was created, but no sign-in token was returned.");
    }
    authStorage.saveSignup(response.token, values.email);
    setAccount(response);
    setShowDashboard(true);
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await affiliateAuthService.login({ email, password });
    if (!response.token) {
      throw new Error("Login succeeded, but no sign-in token was returned.");
    }
    authStorage.saveSession(response.token);
    setAccount(response);
    setShowDashboard(true);
  };

  return (
    <section>
      <SectionHeaderblog
        eyebrow={showDashboard ? "Affiliate account" : "Affiliate account access"}
        title={showDashboard ? "Your affiliate" : "Start new"}
        highlight={showDashboard ? "dashboard." : "or continue."}
        description={
          showDashboard
            ? "Your account is ready. Find your affiliate status and program details below."
            : "Create an affiliate account to begin your journey. Already registered? Log in to access your dashboard and track your activity."
        }
      />

      {showDashboard ? (
        <AffiliateDashboard account={account} />
      ) : view === "signup" ? (
        <SignupCard onSubmit={handleSignup} onSwitchToLogin={() => setView("login")} />
      ) : (
        <LoginCard
          defaultEmail={authStorage.getSignupEmail()}
          onSubmit={handleLogin}
          onSwitchToSignup={() => setView("signup")}
        />
      )}
    </section>
  );
}

function AffiliateDashboard({ account }: { account: AuthResponse | null }) {
  const status = account?.profile.status ?? "Signed in";

  return (
    <SectionGlow>
    <div className="mx-auto my-6 w-full max-w-193.5 rounded-xl border border-white/10 bg-[#111] p-6 text-white sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-space-grotesk text-xs font-bold uppercase tracking-[1px] text-[#e63946]">
            Affiliate dashboard
          </p>
          <h3 className="mt-2 font-space-grotesk text-2xl font-bold">
            Welcome{account?.user.name ? `, ${account.user.name}` : " back"}.
          </h3>
          <p className="mt-2 font-space-grotesk text-sm text-white/65">
            Your affiliate account is connected. Your program details will appear here.
          </p>
        </div>
        <span className="rounded-full border border-[#e63946]/40 bg-[#e63946]/10 px-3 py-1 font-space-grotesk text-xs capitalize text-[#ff7b82]">
          {status}
        </span>
      </div>

      {account && (
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