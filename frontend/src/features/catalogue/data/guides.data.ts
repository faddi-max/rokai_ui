import { bloghero } from "@/assets"; 

export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  fileType: string;
  downloadHref: string;
  openHref: string;
}

export const GUIDES_PER_PAGE = 6;

const BASE_GUIDE = {
  title: "BJJ Kimonos",
  description: "Engineered For Durability, Comfort, And Performance.",
  image: bloghero,
  imageAlt: "Red ROKAI BJJ kimono with black belt",
  fileType: "PDF",
  downloadHref: "/documents/rokai-bjj-kimonos.pdf",
  openHref: "/documents/rokai-bjj-kimonos.pdf",
};

// Placeholder data (4 pages x 6). Replace with API / CMS data later.
export const guides: Guide[] = Array.from({ length: 24 }, (_, i) => ({
  ...BASE_GUIDE,
  id: `guide-${i + 1}`,
}));