import TrustBadges from "@/features/home/components/TrustBadges";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";


export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBadges />
    </main>
  );
}
