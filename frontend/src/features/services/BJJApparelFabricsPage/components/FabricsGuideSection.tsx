import { fabricFocusAreas } from "../data/fabrics.data";

export default function FabricsGuideSection() {
  return (
    <section className="bg-[#0d0808] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-295">
        <p className="font-space-grotesk text-xs font-medium uppercase tracking-[0.15em] text-[#E63946]">
          Fabric selection
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-155 font-space-grotesk text-[30px] font-bold uppercase leading-tight text-white sm:text-[38px]">
            Materials chosen around the product.
          </h2>
          <p className="max-w-110 font-space-grotesk text-sm leading-6 text-white/60">
            Fabric decisions depend on the garment, how it will be used, and the feel your brand wants to deliver. Review options on product-specific samples before confirming a specification.
          </p>
        </div>

        <div className="mt-9 grid gap-0 border-y border-white/15 md:grid-cols-3">
          {fabricFocusAreas.map((area, index) => (
            <article
              key={area.id}
              className={`py-6 md:px-6 md:py-7 ${
                index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
              } ${index === 0 ? "md:pl-0" : ""}`}
            >
              <span className="font-space-grotesk text-xs font-medium text-[#E63946]">
                {area.number}
              </span>
              <h3 className="mt-6 font-space-grotesk text-lg font-bold text-white">
                {area.title}
              </h3>
              <p className="mt-2 font-space-grotesk text-sm leading-6 text-white/60">
                {area.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.considerations.map((item) => (
                  <li
                    key={item}
                    className="border border-white/15 px-2.5 py-1 font-space-grotesk text-[11px] text-white/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}