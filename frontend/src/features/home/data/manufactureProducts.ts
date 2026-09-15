import {
  manufactureGlovesImage,
  manufactureGiImage,
  manufactureRashguardImage,
  manufactureShortsImage,
} from "@/assets";

export interface ManufactureProduct {
  id: string;
  image: string;
  alt: string;
}

export const whatWeManufactureHeading = {
  eyebrow: "What We Manufacture",
  titleTop: "COMBAT SPORT GEAR,",
  titleBottom: "ENGINEERED FOR PERFORMANCE.",
  description:
    "Gloves, Gis, Fit wear, Protective Gear, Training Equipment and More Fully Customization For Your Brand and Organization.",
};

export const manufactureProducts: ManufactureProduct[] = [
  { id: "gloves", image: manufactureGlovesImage, alt: "Rokai MMA gloves" },
  { id: "gi", image: manufactureGiImage, alt: "Rokai BJJ gi" },
  { id: "rashguard", image: manufactureRashguardImage, alt: "Rokai rashguard" },
  { id: "shorts", image: manufactureShortsImage, alt: "Rokai fight shorts" },
];
