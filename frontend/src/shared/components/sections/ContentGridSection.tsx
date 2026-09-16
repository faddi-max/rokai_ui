import SectionHeader from "@/shared/components/sections/SectionHeader";
import ContentCard from "@/shared/components/sections/ContentCard";
import type { SectionHeaderProps, ContentCardData } from "@/shared/types/sections";

interface ContentGridSectionProps {
  header: SectionHeaderProps;
  cards: ContentCardData[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ContentGridSection({
  header,
  cards,
  columns = 2,
  className = "",
}: ContentGridSectionProps) {
  const gridClasses = {
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={`relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24 ${className}`}>
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.25),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1512px] px-6 sm:px-10 lg:px-16">
        <SectionHeader {...header} />

        <div className={`grid gap-6 sm:gap-8 ${gridClasses}`}>
          {cards.map((card) => (
            <ContentCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
