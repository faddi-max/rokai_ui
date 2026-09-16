import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-[#E51B24] selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
