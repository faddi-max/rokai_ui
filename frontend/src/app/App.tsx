import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/shared/components/layout/RootLayout";
import { PageLoader } from "@/shared/components/feedback";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { gsap, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import BlogCategoryPage from "@/features/blogs/blogCatagoryPage";
import AmbassadorProgramPage, {  } from "@/features/programs/ambassador-program/AmbassadorProgram";
import AffiliatePage from "@/features/programs/affiliate-program/Affiliate-page";
import SponsorshipProgram from "@/features/programs/sponsorship-program/SponsorshipProgram";

import ClubPartnershipProgram from "@/features/programs/club-partnership/ClubPartnershipProgram";
import SinglePageBlog from "@/features/blogs/SingleBlogPage";
import ProgramApplyPage from "@/features/programs/ProgramForm/ProgramApplyPage";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const CategoriesPage = lazy(() => import("@/features/categories/CategoriesPage"));
const BlogsPage = lazy(() => import("@/features/blogs/BlogsPage"));
const ProgramsPage = lazy(() => import("@/features/programs/affiliate-program/Affiliate-page"));


const NotFoundPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          headingRef.current,
          { y: 40, opacity: 0, duration: 0.7 },
          "-=0.25"
        )
        .from(
          textRef.current,
          { y: 30, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"
    >
      <span
        ref={badgeRef}
        className="font-space-grotesk text-sm font-bold uppercase tracking-[0.2em] text-[#E51B24]"
      >
        404 Error
      </span>
      <h1
        ref={headingRef}
        className="mt-3 font-space-grotesk text-4xl sm:text-6xl font-bold uppercase text-white"
      >
        PAGE NOT FOUND
      </h1>
      <p
        ref={textRef}
        className="mt-4 max-w-md font-space-grotesk text-sm sm:text-base text-white/70"
      >
        The equipment or specification page you are looking for has been moved or does not exist.
      </p>
      <div ref={ctaRef} className="mt-8">
        <Button href="/" icon={ArrowLeft} variant="outline" size="14px">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader message="LOADING..." />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/services" element={<NotFoundPage />} />
            {/* <Route path="/programs" element={<AmbassadorProgramPage />} /> */}
            <Route path="/contact" element={<NotFoundPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/resources" element={<NotFoundPage />} />
            <Route path="/blogs/category/:slug" element={<BlogCategoryPage />} />
            <Route path="/blogs/:slug" element={<SinglePageBlog />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/programs" element={<ProgramsPage />} />

<Route
  path="/programs/affiliate"
  element={<AffiliatePage />}
/>

<Route
  path="/programs/ambassador"
  element={<AmbassadorProgramPage />}
/>

<Route
  path="/programs/sponsorship"
  element={<SponsorshipProgram />}
/>

<Route
  path="/programs/partnership"
  element={<ClubPartnershipProgram />}
/>
<Route
  path="/programs/partnership"
  element={<ClubPartnershipProgram />}
/>
<Route path="/programs/apply/:programId" element={<ProgramApplyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
