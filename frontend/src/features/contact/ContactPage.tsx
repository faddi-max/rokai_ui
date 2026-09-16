import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import Button from "@/shared/components/ui/Button";
import FAQSection from "@/shared/components/sections/FAQSection";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import type { FAQItemData } from "@/shared/types/sections";

const contactFaqs: FAQItemData[] = [
  {
    id: "contact-faq-1",
    question: "How quickly will I receive a production quote?",
    answer:
      "Our team reviews technical inquiries and sends a detailed transparent cost breakdown with fabric specs within 24 business hours of form submission.",
  },
  {
    id: "contact-faq-2",
    question: "Can I receive physical fabric swatches before ordering?",
    answer:
      "Yes! We dispatch physical fabric swatch kits (including Pearl Weave, Ripstop, Microfiber, and Sublimated lycra samples) via express courier to anywhere in the world.",
  },
  {
    id: "contact-faq-3",
    question: "What file formats should I upload for my tech pack or academy crest?",
    answer:
      "Vector formats (AI, EPS, SVG, or vector PDF) are best for high-density embroidery and sublimation. High-resolution PNGs or JPEGs (300 DPI) are also accepted.",
  },
  {
    id: "contact-faq-4",
    question: "Do you sign Non-Disclosure Agreements (NDAs)?",
    answer:
      "Always. If you have proprietary cuts, custom weave formulations, or unreleased brand designs, we sign a standard bilateral NDA prior to reviewing your files.",
  },
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string>("custom-order");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "United States",
    volume: "50-100 pieces",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-black text-white selection:bg-[#E51B24] selection:text-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-black pb-12 pt-8 lg:pb-16 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(229,27,36,0.18),transparent_70%)]" />

        <div className="relative mx-auto max-w-[1512px] px-6 sm:px-10 lg:px-16 text-center">
          <SectionEyebrow label="PRODUCTION CONSULTATION & INQUIRIES" />

          <h1 className="mt-6 font-space-grotesk text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] text-white">
            START YOUR CUSTOM
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              COMBAT SPORTS ORDER
            </span>
          </h1>

          <div className="mx-auto mt-4 h-[3px] w-20 bg-white" />

          <p className="mx-auto mt-6 max-w-2xl font-space-grotesk text-base leading-relaxed text-white/80 sm:text-lg">
            Request physical fabric swatches, upload your tech pack, or get a
            factory-direct wholesale price quote within 24 hours. No hidden fees.
          </p>

          {/* Direct Channels Quick Cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="font-space-grotesk text-xs uppercase tracking-wider text-white/60">
                  Email Us
                </span>
                <p className="font-space-grotesk text-sm font-bold text-white hover:text-[#E51B24] transition-colors">
                  production@rokaicorp.com
                </p>
                <span className="text-[11px] text-white/50">24/7 dedicated intake</span>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="font-space-grotesk text-xs uppercase tracking-wider text-white/60">
                  Direct Line & WhatsApp
                </span>
                <p className="font-space-grotesk text-sm font-bold text-white">
                  +1 (800) 512-ROKAI
                </p>
                <span className="text-[11px] text-white/50">Mon–Fri: 8am–7pm EST</span>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="font-space-grotesk text-xs uppercase tracking-wider text-white/60">
                  Global Logistics
                </span>
                <p className="font-space-grotesk text-sm font-bold text-white">
                  DDP Global Delivery
                </p>
                <span className="text-[11px] text-white/50">USA • UK • EU • UAE • AUS</span>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="font-space-grotesk text-xs uppercase tracking-wider text-white/60">
                  Quote Turnaround
                </span>
                <p className="font-space-grotesk text-sm font-bold text-white">
                  Within 24 Hours
                </p>
                <span className="text-[11px] text-white/50">Free 3D visual mockup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Badges */}
      <TrustBadgesSection floating />

      {/* Main Interactive Contact / Tech Pack Submission Section */}
      <section id="inquiry-form" className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Left Column: Form */}
            <div className="rounded-2xl border border-white/15 bg-[#121212] p-6 sm:p-10 shadow-2xl">
              {formSubmitted ? (
                <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E51B24]/20 text-[#E51B24]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-space-grotesk text-2xl sm:text-3xl font-bold text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="mt-3 max-w-md font-space-grotesk text-sm sm:text-base text-white/80">
                    Thank you, <span className="text-[#E51B24] font-semibold">{formData.name || "partner"}</span>. Our production engineering team has logged your specs and will respond with a tailored quote and free 3D digital mockup within 24 hours.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    variant="outline"
                    className="mt-8"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-white">
                      Request a Quote or Swatches
                    </h2>
                    <p className="mt-1 font-space-grotesk text-sm text-white/60">
                      Select your project scope below to customize your consultation.
                    </p>
                  </div>

                  {/* Inquiry Type Tabs */}
                  <div>
                    <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-2">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        { id: "custom-order", label: "Custom Gis & Gear" },
                        { id: "swatches", label: "Fabric Swatch Kit" },
                        { id: "wholesale", label: "Academy Wholesale" },
                        { id: "techpack", label: "Tech Pack Review" },
                        { id: "sponsorship", label: "Sponsorship / Team" },
                        { id: "general", label: "Other Inquiry" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedInquiry(type.id)}
                          className={`rounded-lg border px-3 py-2.5 text-center font-space-grotesk text-xs font-semibold transition-all ${
                            selectedInquiry === type.id
                              ? "border-[#E51B24] bg-[#E51B24] text-white"
                              : "border-white/15 bg-black/40 text-white/80 hover:border-white/40"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Master Marcus Almeida"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/30 focus:border-[#E51B24] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="coach@academybjj.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/30 focus:border-[#E51B24] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Organization & Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Academy / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Gracie Combat Academy"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/30 focus:border-[#E51B24] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/30 focus:border-[#E51B24] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Volume & Region */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Estimated Batch Size
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white focus:border-[#E51B24] focus:outline-none"
                      >
                        <option value="20-50 pieces">20 – 50 pieces (Academy Starter)</option>
                        <option value="50-100 pieces">50 – 100 pieces (Most Popular)</option>
                        <option value="100-300 pieces">100 – 300 pieces (Multi-Academy)</option>
                        <option value="500+ pieces">500+ pieces (Commercial Retail)</option>
                        <option value="swatches-only">Sample Kit / Swatches Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                        Destination Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white focus:border-[#E51B24] focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="European Union">European Union</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Other">Other Global Location</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block font-space-grotesk text-xs uppercase tracking-wider text-white/80 mb-1.5">
                      Project Details & Weave Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your gi weave preference (e.g. 450 GSM Pearl Weave), pants preference, rashguard quantities, IBJJF tournament legality needs, or delivery timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/30 focus:border-[#E51B24] focus:outline-none"
                    />
                  </div>

                  {/* Tech Pack / Artwork Upload Mock */}
                  <div className="rounded-xl border border-dashed border-white/20 bg-black/50 p-6 text-center">
                    <UploadCloud className="mx-auto h-8 w-8 text-[#E51B24]" />
                    <p className="mt-2 font-space-grotesk text-xs sm:text-sm font-medium text-white">
                      Upload Tech Pack, Academy Crest or Sketches (Optional)
                    </p>
                    <p className="mt-1 text-[11px] text-white/50">
                      Supports AI, EPS, PDF, PNG, JPG or ZIP (up to 50MB)
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    icon={ArrowUpRight}
                    weight="medium"
                    size="15px"
                    className="h-[48px] w-full"
                  >
                    Submit Production Request
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column: Why Partner With Rokai Guarantee Box */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <SectionEyebrow label="THE ROKAI ASSURANCE" />
                <h2 className="mt-4 font-space-grotesk text-3xl font-bold uppercase leading-tight text-white">
                  WHY 500+ ACADEMIES
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                    }}
                  >
                    TRUST OUR FACTORY
                  </span>
                </h2>

                <p className="mt-4 font-space-grotesk text-sm sm:text-base leading-relaxed text-white/80">
                  Combat sports apparel requires specialized reinforcement that ordinary sportswear factories cannot deliver. We specialize exclusively in Jiu Jitsu uniforms, rashguards, and martial arts equipment.
                </p>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-space-grotesk text-base font-bold text-white">
                        Bilateral Non-Disclosure Agreement
                      </h4>
                      <p className="mt-1 font-space-grotesk text-sm text-white/70">
                        Your custom patterns, proprietary cuts, and logos are strictly protected under mutual NDA. We never resell your designs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                      <PackageCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-space-grotesk text-base font-bold text-white">
                        Pre-Production Golden Sample
                      </h4>
                      <p className="mt-1 font-space-grotesk text-sm text-white/70">
                        Never worry about bulk surprises. You test and roll in an exact physical prototype before we cut bulk fabric.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E51B24]/10 text-[#E51B24]">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-space-grotesk text-base font-bold text-white">
                        Guaranteed On-Time Delivery
                      </h4>
                      <p className="mt-1 font-space-grotesk text-sm text-white/70">
                        Every commercial production batch includes milestone tracking and our 99.4% on-time DDP delivery guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swatch Kit Callout Card */}
              <div className="rounded-2xl border border-[#E51B24]/40 bg-gradient-to-br from-[#1a0809] to-black p-6 sm:p-8">
                <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24]">
                  Physical Swatch Kit
                </span>
                <h3 className="mt-2 font-space-grotesk text-xl sm:text-2xl font-bold text-white">
                  Want to Feel the Fabrics First?
                </h3>
                <p className="mt-2 font-space-grotesk text-sm text-white/80">
                  Order our comprehensive textile sample pack including 350-550 GSM Pearl Weaves, Gold Weaves, Ripstop blends, and Italian sublimation swatches.
                </p>
                <div className="mt-5">
                  <button
                    onClick={() => {
                      setSelectedInquiry("swatches");
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-space-grotesk text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#E51B24] hover:text-white"
                  >
                    Select Swatch Kit
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        header={{
          eyebrow: "ORDERING & CONSULTATION",
          titleTop: "FREQUENTLY ASKED",
          titleBottom: "QUESTIONS",
          description:
            "Find answers about lead times, international freight, sample fees, and payment terms.",
        }}
        faqs={contactFaqs}
      />
    </div>
  );
}
