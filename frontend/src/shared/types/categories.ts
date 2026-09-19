import type { HeroContent } from "./hero";
import type { BlogCategory } from "./blogs";

export interface CategoryItem {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface CategoriesPageData {
  hero: HeroContent;
  categories?: CategoryItem[];
  blogCategories: BlogCategory[];
  categoryHeroContent: HeroContent;
}
