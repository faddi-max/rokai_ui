export type NavSubItem = {
  label: string;
  href: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavSubItem[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },

  {
    label: "Categories",
    href: "/categories",
    hasDropdown: false,
    dropdownItems: [
      {
        label: "BJJ Training Gis",
        href: "/categories#catalog",
        description: "450 GSM Pearl Weave daily academy kimonos",
      },
      {
        label: "Competition Gis",
        href: "/categories#catalog",
        description: "IBJJF 2026 certified ultralight tournament uniforms",
      },
      {
        label: "Performance Rashguards",
        href: "/categories#catalog",
        description: "Zero-chafing flatlock compression gear",
      },
      {
        label: "Fight Shorts & Teamwear",
        href: "/categories#catalog",
        description: "4-way stretch grappling shorts and academy fleece",
      },
    ],
  },

  {
    label: "Services",
    href: "/services",
    hasDropdown: false,
    dropdownItems: [
      {
        label: "Full OEM / ODM Manufacturing",
        href: "/services#capabilities",
        description:
          "Turnkey custom cut & sew production from 50 to 50,000 units",
      },
      {
        label: "AI Pattern Grading & Sizing",
        href: "/services#capabilities",
        description:
          "Proprietary algorithm for zero-variance shrinkage control",
      },
      {
        label: "Tajima Embroidery & Sublimation",
        href: "/services#capabilities",
        description:
          "Industrial high-density stitching and Italian inks",
      },
      {
        label: "Private Label Packaging",
        href: "/services#capabilities",
        description:
          "Custom damask neck tags, hang tags, and branded pouches",
      },
    ],
  },

 {
  label: "Programs",
  href: "/programs",
  hasDropdown: true,
  dropdownItems: [
    {
      label: "BJJ Apparel Affiliate Program",
      href: "/programs/affiliate",
      description: "Earn recurring commissions on gear recommendations",
    },
    {
      label: "BJJ Apparel Ambassador Program",
      href: "/programs/ambassador",
      description: "Represent the brand and grow with Rokai",
    },
    {
      label: "BJJ Apparel Club Sponsorship",
      href: "/programs/sponsorship",
      description: "Support your academy with premium team gear",
    },
    {
      label: "BJJ Apparel Club Partnership",
      href: "/programs/partnership",
      description: "Build a long-term partnership with Rokai",
    },
  ],
},

  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/resources" },
];