import StepCard from "@/shared/components/sections/StepCard";
import { Benefit } from "../data/benefits.data";


type BenefitCardProps = Omit<Benefit, "id"> & { index: number };


export default function BenefitCard({ index, title, description }: BenefitCardProps) {
  return (
    <StepCard
      index={index}
      title={title}
      description={description}
      accent={false}
      showArrow={false}
    />
  );
}
