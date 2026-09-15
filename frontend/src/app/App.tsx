import HomePage from "@/features/home/HomePage";
import Navbar from "@/shared/components/layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const BlackPage = () => (
  <main className="min-h-screen bg-black">
    <Navbar />
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<BlackPage />} />
        <Route path="/services" element={<BlackPage />} />
        <Route path="/programs" element={<BlackPage />} />
        <Route path="/contact" element={<BlackPage />} />
        <Route path="/blogs" element={<BlackPage />} />
        <Route path="/resources" element={<BlackPage />} />
        <Route path="*" element={<BlackPage />} />
      </Routes>
    </BrowserRouter>
  );
}
