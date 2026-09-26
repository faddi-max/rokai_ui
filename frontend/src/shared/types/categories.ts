import type { HeroContent } from "./hero";
import type { BlogCategory } from "./blogs";

export interface CategoryItem {
  id: string;
  slug?: string;
  parent_id?: number | string | null;
  level?: number;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  buttonLabel: string;
  buttonHref: string;
  children?: CategoryItem[];
}

export interface CategoriesPageData {
  hero: HeroContent;
  categories?: CategoryItem[];
  blogCategories?: BlogCategory[];
  categoryHeroContent?: HeroContent;
  category?: CategoryItem;
  allCategories?: CategoryItem[];
}
