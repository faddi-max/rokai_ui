import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import LoginCard from "@/shared/components/sections/LoginCard";

export default function AffiliateLoginSection() {
  return (
    <section >
      <SectionHeaderblog
        eyebrow="Affiliate account access"
        title="Start new"
        highlight="or continue."
        description="Create an affiliate account to begin your journey. Already registered? Log in to access your dashboard and track your activity."
      />

     
        <LoginCard />
        <div aria-hidden className="hidden lg:block" />
      
    </section>
  );
}