import { blogcatagory } from "@/assets";

export interface TrendingBlogPost {
  id: string;
  slug: string;
  image: string;
  badgeLabel: string;
  highlightTitle: string;
  bodyTitle: string;
  description: string;
}

export const trendingBlogs: TrendingBlogPost[] = [
  {
    id: "1",
    slug: "how-to-wash-bjj-gi-the-right-way",
    image: blogcatagory,
    badgeLabel: "BJJ TRAINING APPAREL",
    highlightTitle: "HOW TO WASH BJJ GI THE RIGHT WAY:",
    bodyTitle: "A SURVIVAL GUIDE FOR BJJ ACADEMIES & BRANDS",
    description:
      "If You Manage A BJJ Academy, Run A Competition Team, Or Produce Private Label Gis, You Know That A Gi Is More Than Just Fabric",
  },
  {
    id: "2",
    slug: "how-to-wash-bjj-gi-the-right-way-2",
    image: blogcatagory,
    badgeLabel: "BJJ TRAINING APPAREL",
    highlightTitle: "HOW TO WASH BJJ GI THE RIGHT WAY:",
    bodyTitle: "A SURVIVAL GUIDE FOR BJJ ACADEMIES & BRANDS",
    description:
      "If You Manage A BJJ Academy, Run A Competition Team, Or Produce Private Label Gis, You Know That A Gi Is More Than Just Fabric",
  },
  {
    id: "3",
    slug: "how-to-wash-bjj-gi-the-right-way-3",
    image: blogcatagory,
    badgeLabel: "BJJ TRAINING APPAREL",
    highlightTitle: "HOW TO WASH BJJ GI THE RIGHT WAY:",
    bodyTitle: "A SURVIVAL GUIDE FOR BJJ ACADEMIES & BRANDS",
    description:
      "If You Manage A BJJ Academy, Run A Competition Team, Or Produce Private Label Gis, You Know That A Gi Is More Than Just Fabric",
  },
];