import {
  engineeredBenchmarkImage,
  trainingGiCategoryImage,
  competitionGiCategoryImage,
  manufacturingProcessImage,
  problemSolversImage,
  scalingBrandsImage,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
} from "@/assets";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Technical Guides" | "Academy Growth" | "Material Science" | "Industry Updates";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ibjjf-2026-uniform-rules",
    title: "IBJJF 2026 Uniform Regulation Changes: What Every Academy Needs to Know",
    excerpt:
      "A complete breakdown of the updated sleeve cuff clearances, patch restrictions, collar thickness tolerances, and colorway rules for international tournament competition.",
    category: "Technical Guides",
    readTime: "6 min read",
    date: "Aug 28, 2026",
    author: {
      name: "Marcus Santos",
      role: "Lead Apparel Engineer",
      avatar: avatar1,
    },
    image: competitionGiCategoryImage,
    tags: ["IBJJF", "Competition", "Compliance"],
    featured: true,
  },
  {
    id: "pearl-weave-material-science",
    title: "The Material Science of Pearl Weave: Why GSM and Weft Density Matter on the Mats",
    excerpt:
      "Examining how thread count, yarn torsion, and weave geometry dictate breathability, grip resistance, and long-term tensile durability during intense daily rolling.",
    category: "Material Science",
    readTime: "8 min read",
    date: "Aug 15, 2026",
    author: {
      name: "Dr. Elena Vance",
      role: "Textile Laboratory Director",
      avatar: avatar2,
    },
    image: engineeredBenchmarkImage,
    tags: ["Pearl Weave", "Fabrics", "GSM"],
  },
  {
    id: "academy-pro-shop-revenue",
    title: "How to Triple Your Academy's Pro Shop Revenue With Custom Apparel",
    excerpt:
      "Stop leaving money on the table with generic brands. Learn how top academies leverage bespoke student gis and ranked no-gi kits to build high-margin recurring income.",
    category: "Academy Growth",
    readTime: "5 min read",
    date: "Jul 29, 2026",
    author: {
      name: "Dave Kawahara",
      role: "Academy Partnership Director",
      avatar: avatar3,
    },
    image: scalingBrandsImage,
    tags: ["Academy Growth", "Pro Shop", "Merchandising"],
  },
  {
    id: "sublimation-vs-embroidery",
    title: "Sublimation vs. Direct Embroidery: Which Branding Tech Fits Your Gear?",
    excerpt:
      "Comparing durability, tactile feel, weight, and friction coefficient across rashguards, tournament kimonos, and academy team lifestyle collections.",
    category: "Technical Guides",
    readTime: "7 min read",
    date: "Jul 12, 2026",
    author: {
      name: "Marcus Santos",
      role: "Lead Apparel Engineer",
      avatar: avatar1,
    },
    image: problemSolversImage,
    tags: ["Sublimation", "Embroidery", "Manufacturing"],
  },
  {
    id: "physics-of-gi-shrinkage",
    title: "Preventing Gi Shrinkage: The Physics of Pre-Shrunk Sanforized Cotton",
    excerpt:
      "Why do cheap Gis lose 8% of their size in the wash? Understand hot-water relaxation shrinkage and how our proprietary AI grading guarantees under 1.5% variance.",
    category: "Material Science",
    readTime: "6 min read",
    date: "Jun 24, 2026",
    author: {
      name: "Dr. Elena Vance",
      role: "Textile Laboratory Director",
      avatar: avatar2,
    },
    image: trainingGiCategoryImage,
    tags: ["Shrinkage", "Cotton", "Sanforization"],
  },
  {
    id: "sustainable-combat-sports",
    title: "Sustainable Combat Sports Manufacturing: OEKO-TEX Inks & Organic Cotton",
    excerpt:
      "How Rokai's closed-loop water treatment, zero-waste cutting algorithms, and certified non-toxic dye formulations are setting a new standard for combat equipment.",
    category: "Industry Updates",
    readTime: "5 min read",
    date: "May 30, 2026",
    author: {
      name: "Sarah Chen",
      role: "Sustainability Officer",
      avatar: avatar4,
    },
    image: manufacturingProcessImage,
    tags: ["Sustainability", "Eco-Friendly", "OEKO-TEX"],
  },
];
