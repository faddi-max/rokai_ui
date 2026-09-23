export type NavSubItem = {
  label: string;
  href: string;
  description: string;
  image: string;
};

export type CategoryGroupItem = {
  label: string;
  href: string;
};

export type CategoryGroup = {
  title: string;
  items: CategoryGroupItem[];
};

export type CategoryLink = {
  label: string;
  href: string;
  image: string;
  groups: CategoryGroup[];
  quickLinks?: CategoryGroupItem[];
};

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavSubItem[];
  categories?: CategoryLink[];
};

import {
  affiliateProgramhero,
  ambassadorProgramhero,
  sponserhero,


  competitionGiCategoryImage,
  work1,
  work2,
  work3,
  work4,
} from "@/assets";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },

  {
    label: "Categories",
    href: "/categories",
    hasDropdown: true,
    categories: [
      {
        label: "BJJ / Grappling",
        href: "/categories/bjj-grappling",
        image: work1,
        groups: [
          {
            title: "GI",
            items: [
              { label: "Custom BJJ Gis", href: "/categories/bjj-grappling#gis" },
              { label: "Competition Gis", href: "/categories/bjj-grappling#gis" },
              { label: "Training Gis", href: "/categories/bjj-grappling#gis" },
            ],
          },
          {
            title: "RASH GUARDS",
            items: [
              { label: "Custom BJJ Rash Guards", href: "/categories/bjj-grappling#rashguards" },
              { label: "Competition Rash Guards", href: "/categories/bjj-grappling#rashguards" },
            ],
          },
          {
            title: "GRAPPLING SHORTS",
            items: [
              { label: "Custom Grappling Shorts", href: "/categories/bjj-grappling#shorts" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
      },
      {
        label: "Boxing",
        href: "/categories/boxing",
        image: work4,
        groups: [
          {
            title: "GLOVES & WRAPS",
            items: [
              { label: "Custom Boxing Gloves", href: "/categories/boxing#gloves" },
              { label: "Hand Wraps", href: "/categories/boxing#gloves" },
            ],
          },
          {
            title: "APPAREL",
            items: [
              { label: "Boxing Shorts", href: "/categories/boxing#apparel" },
              { label: "Robes & Ring Jackets", href: "/categories/boxing#apparel" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
      },
      {
        label: "MMA",
        href: "/categories/mma",
        image: work2,
        groups: [
          {
            title: "SHORTS",
            items: [
              { label: "Custom MMA Fight Shorts", href: "/categories/mma#shorts" },
              { label: "Training Shorts", href: "/categories/mma#shorts" },
            ],
          },
          {
            title: "RASH GUARDS",
            items: [
              { label: "Custom MMA Rash Guards", href: "/categories/mma#rashguards" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
      },
      {
        label: "Muay Thai / Kickboxing",
        href: "/categories/muay-thai-kickboxing",
        image: work3,
        groups: [
          {
            title: "SHORTS",
            items: [
              { label: "Custom Muay Thai Shorts", href: "/categories/muay-thai-kickboxing#shorts" },
            ],
          },
          {
            title: "APPAREL",
            items: [
              { label: "Kickboxing Rash Guards", href: "/categories/muay-thai-kickboxing#apparel" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
      },
      {
        label: "Wrestling",
        href: "/categories/wrestling",
        image: work4,
        groups: [
          {
            title: "SINGLETS",
            items: [
              { label: "Custom Wrestling Singlets", href: "/categories/wrestling#singlets" },
            ],
          },
          {
            title: "APPAREL",
            items: [
              { label: "Wrestling Shorts", href: "/categories/wrestling#apparel" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
      },
      {
        label: "Martial Arts",
        href: "/categories/martial-arts",
        image: competitionGiCategoryImage,
        groups: [
          {
            title: "UNIFORMS",
            items: [
              { label: "Custom Martial Arts Uniforms", href: "/categories/martial-arts#uniforms" },
            ],
          },
          {
            title: "APPAREL",
            items: [
              { label: "Training Apparel", href: "/categories/martial-arts#apparel" },
            ],
          },
        ],
        quickLinks: [
          { label: "Fightwear", href: "/categories/fightwear" },
          { label: "Team Apparel", href: "/categories/team-apparel" },
        ],
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
        image: "",
      },
      {
        label: "AI Pattern Grading & Sizing",
        href: "/services#capabilities",
        description:
          "Proprietary algorithm for zero-variance shrinkage control",
        image: "",
      },
      {
        label: "Tajima Embroidery & Sublimation",
        href: "/services#capabilities",
        description: "Industrial high-density stitching and Italian inks",
        image: "",
      },
      {
        label: "Private Label Packaging",
        href: "/services#capabilities",
        description:
          "Custom damask neck tags, hang tags, and branded pouches",
        image: "",
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
        image: affiliateProgramhero,
      },
      {
        label: "BJJ Apparel Ambassador Program",
        href: "/programs/ambassador",
        description: "Represent the brand and grow with Rokai",
        image: ambassadorProgramhero,
      },
      {
        label: "BJJ Apparel Club Sponsorship",
        href: "/programs/sponsorship",
        description: "Support your academy with premium team gear",
        image: sponserhero,
      },
      {
        label: "BJJ Apparel Club Partnership",
        href: "/programs/partnership",
        description: "Build a long-term partnership with Rokai",
        image: sponserhero,
      },
    ],
  },

  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/resources" },
];