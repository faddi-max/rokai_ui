import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";
import SeoHead from "@/shared/seo/SeoHead";
import { sitebg } from "@/assets"; 
export default function RootLayout() {
  return (
      <div className="site-bg relative flex min-h-screen flex-col bg-[#111111] text-white selection:bg-[#E51B24] selection:text-white">
      {/* Global background — stretches across the full page height */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
        style={{ backgroundImage: `url(${sitebg})`, backgroundSize: "100% 100%" }}
      />
      <SeoHead />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


