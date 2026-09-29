import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/shared/icons/socialmediaicons";

export interface ContactDetailData {
  label: string;
  value: string;
  caption: string;
}

export interface FindRokaiSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  intro?: string;
  details?: ContactDetailData[];
  mapEmbedSrc?: string;
  mapTitle?: string;
}

const DEFAULT_DETAILS: ContactDetailData[] = [
  { label: "Email", value: "info@rokai.com", caption: "General inquiries" },
  { label: "Phone", value: "+92 XXX XXXXXXX", caption: "Direct contact" },
  { label: "Location", value: "Sialkot, Pakistan", caption: "ROKAI / Pakistan" },
  { label: "Business Hours", value: "Monday — Friday", caption: "09:00 — 17:00" },
];

const DEFAULT_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193593.44!2d-77.14!3d38.90!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v0";

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

function ContactDetailRow({ label, value, caption }: ContactDetailData) {
  return (
    <li className="flex flex-col gap-1.5 border-t border-white/10 py-4 first:border-t-0 first:pt-0">
      <span className="font-space-grotesk text-[12px] font-bold uppercase leading-[14px] tracking-[1.08px] text-[#E63946]">
        {label}
      </span>
      <span className="font-space-grotesk text-[15px] font-semibold text-white/70">{value}</span>
      <span className="font-space-grotesk text-[11px] font-light text-white/40">{caption}</span>
    </li>
  );
}

export default function FindRokaiSection({
  eyebrow = "Find Rokai",
  title = "LET'S MAKE IT",
  highlight = "PERSONAL.",
  description = "Prefer to contact the team directly? Find the basic contact details and location information below.",
  intro = "Tell Rokai about your labeling and packaging requirements and start a conversation about your product presentation.",
  details = DEFAULT_DETAILS,
  mapEmbedSrc = DEFAULT_MAP_EMBED_SRC,
  mapTitle = "ROKAI location map",
}: FindRokaiSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        accentColor="#E51B24"
      />

      <div className="mx-5 mb-16 flex flex-col gap-10 lg:mx-25 lg:mb-20 lg:flex-row lg:items-start lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col gap-[10px] border-l border-[#3B3B3B] p-[10px] lg:w-[581px] lg:shrink-0"
        >
          <p className="font-space-grotesk text-[18px] font-normal leading-[27px] tracking-[0%] text-white/70">
            {intro}
          </p>

          <ul className="mt-2 flex flex-col">
            {details.map((detail) => (
              <ContactDetailRow key={detail.label} {...detail} />
            ))}
          </ul>

          <div className="mt-2 flex items-center gap-2.5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-black transition hover:bg-[#E51B24] hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[1140/576] w-full overflow-hidden rounded-[10px] border border-white/10"
        >
          <iframe
            src={mapEmbedSrc}
            title={mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/[0.37]" />
        </motion.div>
      </div>
    </SectionGlow>
  );
}