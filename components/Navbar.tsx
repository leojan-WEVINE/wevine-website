import { Menu, X } from "lucide-react";

type NavbarProps = {
navCollections: string;
navInspiration: string;
navContact: string;
scrolled: boolean;
menuOpen: boolean;
setMenuOpen: (value: boolean) => void;
onToggleLang: () => void;
};

export default function Navbar({
navCollections,
navInspiration,
navContact,
scrolled,
menuOpen,
setMenuOpen,
onToggleLang,
}: NavbarProps) {
return (
<>
<header
className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-1 text-white transition-all duration-500 lg:px-20 ${
          scrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent"
        }`}
> 
<a
  href="/"
  onClick={(e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    }
  }}
  className="flex items-center"
>
  <img
    src="/images/brand/wevine-lockup-white.svg"
    alt="WEVINE"
    className="h-10 w-auto object-contain lg:h-14"
  />
</a>


    <div className="hidden items-center gap-8 lg:flex">
      <nav className="flex items-center gap-8 text-[12px] uppercase tracking-[0.24em] text-white/80">
        <a
          href="/#collections"
          className="transition hover:text-white"
        >
          {navCollections}
        </a>

        <a
          href="/#inspiration"
          className="transition hover:text-white"
        >
          {navInspiration}
        </a>

        <a
          href="/#contact-info"
          className="transition hover:text-white"
        >
          {navContact}
        </a>
      </nav>

      <button
        onClick={onToggleLang}
        className="text-[12px] uppercase tracking-[0.24em] text-white/80 transition hover:text-white"
      >
        EN / 中文
      </button>
    </div>

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="lg:hidden"
    >
      {menuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </header>

{menuOpen && (
  <div className="fixed left-0 right-0 top-[64px] z-40 bg-black/80 px-8 py-8 text-white backdrop-blur-md lg:hidden">
    <div className="mb-8">
      <img
        src="/images/brand/wevine-lockup-white.svg"
        alt="WEVINE"
        className="h-10 w-auto object-contain"
      />
    </div>

    <div className="grid gap-6 text-sm uppercase tracking-[0.22em] text-white/80">
      <a href="/#collections" onClick={() => setMenuOpen(false)}>
        {navCollections}
      </a>

      <a href="/#inspiration" onClick={() => setMenuOpen(false)}>
        {navInspiration}
      </a>

      <a href="/#contact-info" onClick={() => setMenuOpen(false)}>
        {navContact}
      </a>

      <button
        onClick={() => {
          onToggleLang();
          setMenuOpen(false);
        }}
        className="w-fit text-sm uppercase tracking-[0.22em] text-white/80"
      >
        EN / 中文
      </button>
    </div>
  </div>
)}
</>

);
}
