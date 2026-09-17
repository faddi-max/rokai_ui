import { heroContent } from "@/features/home/data/heroContent";
import SharedHeroSection from "@/shared/components/sections/HeroSection";

export default function HeroSection() {
  return <SharedHeroSection {...heroContent} />;
}
