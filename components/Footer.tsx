type FooterProps = {
  navCollections: string;
  navMaterials: string;
  navInspiration: string;
  navContact: string;
};

export default function Footer({
  
  navCollections,
  navMaterials,
  navInspiration,
  navContact,
}: FooterProps) {
  return (
    <footer className="bg-[#0d0d0c] px-8 py-16 text-white lg:px-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-8">
  <img
    src="/images/brand/wevine-lockup-white.svg"
    alt="WEVINE"
    className="h-12 w-auto"
  />

  <p className="text-xs uppercase tracking-[0.16em] text-white/50">
    © 2026 WEVINE. All rights reserved.
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