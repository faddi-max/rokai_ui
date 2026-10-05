import { bespokehero } from "@/assets";
import FabricsHero from "@/features/services/BJJApparelFabricsPage/components/FabricsHero";

export default function LeadMagnetHero() {
  return (
    <FabricsHero
      image={bespokehero}
      imageAlt="Combat sports apparel development, from fabric selection to finished gear"
      lineOne="Build your Academy"
      lineTwo="Identity"
      lineThree="framework"
      description="ROKAI Leads Magnet helps businesses attract, engage, and convert
high-quality prospects into valuable customers."
      primaryCta={{ label: "Open the studio", href: "#lead-magnet-studio" }}
    />
  );
}
