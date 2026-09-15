import {
  testimonialFactory1,
  testimonialFactory2,
  testimonialFactory3,
} from "@/assets";

export interface Testimonial {
  id: string;
  image: string;
  videoUrl?: string;
  title: string;
  subtitle: string;
}

export const testimonialsHeading = {
  titleTop: "WHAT OUR",
  titleBottom: "CLIENTS SAYS",
  description:
    "Real feedback from academies and brands who trust us for consistent quality, reliability, and performance-driven BJJ gear.",
};

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-cutting",
    image: testimonialFactory1,
    title: "Transparent. Efficient",
    subtitle: "450 GSM Pearl Weave",
  },
  {
    id: "testimonial-pressing",
    image: testimonialFactory2,
    title: "Transparent. Efficient",
    subtitle: "450 GSM Pearl Weave",
  },
  {
    id: "testimonial-embroidery",
    image: testimonialFactory3,
    title: "Transparent. Efficient",
    subtitle: "450 GSM Pearl Weave",
  },
];
