interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export default function SectionHeaderblog({
  eyebrow,
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex lg:m-15 m-3 flex-col gap-6 mb-10 md:flex-row md:items-start md:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-[#E51B24]" />
        </div>
        <h2 className="font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
          <span className="block text-white">{title}</span>
          <span className="block text-[#E51B24]">{highlight}</span>
        </h2>
      </div>
      <p className="max-w-xs border-l-2 border-[#E51B24] pl-4 text-sm text-white/60">
        {description}
      </p>
    </div>
  );
}