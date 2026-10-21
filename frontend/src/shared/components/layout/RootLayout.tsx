
import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";
import SeoHead from "@/shared/seo/SeoHead";
import { sitebg } from "@/assets";

export default function RootLayout() {
  return (
    <div className="site-bg relative isolate flex min-h-screen flex-col bg-[#111111] text-white selection:bg-[#E51B24] selection:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${sitebg})`,
          backgroundSize: "100% 100%",
        }}
      />

      <SeoHead />
      <ScrollToTop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
