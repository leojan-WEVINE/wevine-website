type FooterProps = {
  brandName: string;
  footerLine: string;
  navCollections: string;
  navMaterials: string;
  navInspiration: string;
  navContact: string;
};

export default function Footer({
  brandName,
  footerLine,
  navCollections,
  navMaterials,
  navInspiration,
  navContact,
}: FooterProps) {
  return (
    <footer className="bg-[#0d0d0c] px-8 py-16 text-white lg:px-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-serif text-5xl tracking-[0.15em]">
            {brandName}
          </h2>

          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50">
            {footerLine}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm uppercase tracking-[0.18em] text-white/60 lg:gap-10">
          <a href="#collections">{navCollections}</a>
          <a href="#materials">{navMaterials}</a>
          <a href="#inspiration">{navInspiration}</a>
          <a href="#contact">{navContact}</a>
        </div>
      </div>
    </footer>
  );
}