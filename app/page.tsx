"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SampleRequestForm from "@/components/SampleRequestForm";

const translations = {
  en: {
    brandName: "NATURAL WALLCOVERING",
    brandSubtitle: "Natural Weave Series",
    navCollections: "Collections",
    navInspiration: "Inspiration",
    navContact: "Contact",
    heroLabel: "Natural Wallcoverings",
    heroTitle: "Woven by Nature,\nDesigned for\nTimeless Interiors",
    heroText:
      "Handcrafted natural textures designed for refined interiors, hospitality spaces, and quiet contemporary living.",
    heroButton: "Explore Collections",
    collectionsLabel: "Collections",
    collectionsText:
      "Discover our woven collections, each defined by texture and atmosphere.",
    
    contactLabel: "Contact",
  },
  zh: {
    brandName: "NATURAL WALLCOVERING",
    brandSubtitle: "自然編織系列",
    navCollections: "系列",
    navInspiration: "靈感空間",
    navContact: "聯絡",
    heroLabel: "天然壁材",
    heroTitle: "源於自然編織，\n為恆久空間而設",
    heroText:
      "以天然材質與手工肌理，為高端住宅、飯店與當代空間創造安靜而深邃的牆面表情。",
    heroButton: "探索產品系列",
    collectionsLabel: "產品系列",
    collectionsText: "探索天然編織壁材系列，每一款皆由紋理與空間氛圍定義。",
    productsLabel: "精選產品",
    productsTitle: "為高端室內空間精選的天然紋理。",
    contactLabel: "聯絡",
  },
};

const collections = [
  {
    en: "Atelier Weave",
    zh: "工坊編織",
    slug: "atelier-weave",
    image: "/images/collections/atelier-weave.jpg",
    descEn: "Layered handcrafted weaves with refined artisanal rhythm.",
    descZh: "帶有工藝節奏感的層次編織紋理。",
  },
  {
    en: "Timber Trace",
    zh: "木紋軌跡",
    slug: "timber-trace",
    image: "/images/collections/timber-trace.jpg",
    descEn: "Natural textures inspired by weathered wood and organic grain.",
    descZh: "靈感來自自然木紋與歲月痕跡的有機肌理。",
  },
  {
    en: "Drift Weave",
    zh: "流紋編織",
    slug: "drift-weave",
    image: "/images/collections/drift-weave.jpg",
    descEn: "Soft flowing weaves with quiet movement and tonal depth.",
    descZh: "帶有柔和流動感與色澤層次的編織語言。",
  },
  {
    en: "Totem Grain",
    zh: "圖騰紋理",
    slug: "totem-grain",
    image: "/images/collections/totem-grain.jpg",
    descEn: "Ancestral geometry woven into warm earthy textures.",
    descZh: "將部落幾何與溫潤天然肌理融合的編織語彙。",
  },
  {
    en: "Palette Weave",
    zh: "織彩系列",
    slug: "palette-weave",
    image: "/images/collections/palette-weave.jpg",
    descEn: "Woven color for modern living.",
    descZh: "為現代生活織入色彩。",
  },
];



export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
const [langReady, setLangReady] = useState(false);
const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [sampleFormOpen, setSampleFormOpen] = useState(false);

  useEffect(() => {
  const savedLang = localStorage.getItem("wevine-lang");

  if (savedLang === "en" || savedLang === "zh") {
    setLang(savedLang);
  }

  setLangReady(true);
}, []);

useEffect(() => {
  if (!langReady) return;

  localStorage.setItem("wevine-lang", lang);
}, [lang, langReady]);

const inspirationSlides = [
  {
    titleEn: "Material Story",
    titleZh: "材質之境",
    subtitleEn: "Crafted from Nature",
    subtitleZh: "源於自然",
    descEn:
  "Natural fibers,\nrefined textures,\ntimeless interiors.",

descZh:
  "天然纖維，\n細緻紋理，\n歷久彌新的空間美學。",
    image: "/images/inspiration/material-story.jpg",
  },

  {
    titleEn: "Residential",
    titleZh: "住宅空間",
    subtitleEn: "Featuring Atelier Weave",
    subtitleZh: "Atelier Weave 系列",
    descEn:
      "Soft textures and natural warmth for refined living spaces.",
    descZh:
      "以柔和紋理與自然暖意，營造精緻居住空間。",
    image: "/images/inspiration/residential.jpg",
  },

  {
    titleEn: "Hospitality",
    titleZh: "旅宿空間",
    subtitleEn: "Featuring Timber Trace",
    subtitleZh: "Timber Trace 系列",
    descEn:
      "Layered materials that bring warmth and quiet luxury.",
    descZh:
      "以層次材質帶來溫度與低調奢華。",
    image: "/images/inspiration/hospitality.jpg",
  },

  {
    titleEn: "Commercial",
    titleZh: "商業空間",
    subtitleEn: "Featuring Drift Weave",
    subtitleZh: "Drift Weave 系列",
    descEn:
      "Subtle woven movement for modern commercial interiors.",
    descZh:
      "以細膩流動的編織紋理，回應現代商業空間。",
    image: "/images/inspiration/commercial.jpg",
  },
];

const [activeInspiration, setActiveInspiration] = useState(0);

const t = translations[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollCollections = (direction: "left" | "right") => {
  if (!carouselRef.current) return;

  carouselRef.current.scrollBy({
    left: direction === "left" ? -440 : 440,
    behavior: "smooth",
  });
};

const prevInspiration = () => {
  setActiveInspiration((current) =>
    current === 0
      ? inspirationSlides.length - 1
      : current - 1
  );
};

const nextInspiration = () => {
  setActiveInspiration((current) =>
    current === inspirationSlides.length - 1
      ? 0
      : current + 1
  );
};

const activeSlide =
  inspirationSlides[activeInspiration];

return (
    <main className="bg-[#f4efe8] text-stone-900">
      
      <Navbar
  navCollections={t.navCollections}
  navInspiration={t.navInspiration}
  navContact={t.navContact}
  scrolled={scrolled}
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  onToggleLang={() => setLang(lang === "en" ? "zh" : "en")}
/>

      {/* HERO */}
      <section className="relative flex min-h-screen items-start overflow-hidden px-8 pt-32 text-white lg:px-20 lg:pt-40">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[1.18] contrast-[1.04]"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 max-w-2xl text-left">
          <p className="mb-7 text-sm uppercase tracking-[0.32em] text-white/80">
            {t.heroLabel}
          </p>

          <div className="min-h-[180px] md:min-h-[200px]">
  <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.03em] whitespace-pre-line md:text-6xl">
    {t.heroTitle}
  </h1>
</div>

          <div className="my-9 h-px w-20 bg-white/60" />

          <p className="max-w-md text-base leading-8 text-white/80">
            {t.heroText}
          </p>

          <div className="mt-10">
  <a
    href="#collections"
    className="inline-flex h-16 w-[360px] items-center justify-center border border-white/45 text-sm uppercase tracking-[0.22em] text-white transition-opacity duration-300 hover:opacity-70"
  >
    {t.heroButton}
  </a>
</div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="scroll-mt-48 px-8 py-20 lg:px-20">
        <div className="mb-8 flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-500">
              {t.collectionsLabel}
            </p>

            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              {t.collectionsText}
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
  type="button"
  onClick={() => scrollCollections("left")}
  className="text-[48px] font-extralight leading-none text-black/40 transition-all duration-500 ease-out hover:scale-105 hover:text-black/80"
>
  ‹
</button>

<button
  type="button"
  onClick={() => scrollCollections("right")}
  className="text-[48px] font-extralight leading-none text-black/40 transition-all duration-500 ease-out hover:scale-105 hover:text-black/80"
>
  ›
</button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {collections.map((item, index) => (
            <CollectionCard
              key={item.slug}
              item={item}
              lang={lang}
            />
          ))}
        </div>
      </section>


{/* INSPIRATION */}
<section
  id="inspiration"
  className="relative scroll-mt-48 overflow-hidden bg-black"
>
  <div className="relative h-[85vh] min-h-[720px] w-full overflow-hidden">
    <div className="absolute inset-0 flex transition-transform duration-1000 ease-out"
  style={{ transform: `translateX(-${activeInspiration * 100}%)` }}
>
  {inspirationSlides.map((slide) => (
    <img
      key={slide.image}
      src={slide.image}
      alt={slide.titleEn}
      className="h-full w-full shrink-0 object-cover"
    />
  ))}
</div>

    <div
  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-black/30
    via-black/10
    to-transparent
  "
/>

    <button
      type="button"
      onClick={prevInspiration}
      className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-[72px] font-extralight leading-none text-white/70 transition-all duration-500 ease-out hover:text-white hover:scale-105 md:left-10"
    >
      ‹
    </button>

    <button
      type="button"
      onClick={nextInspiration}
      className="absolute right-6 top-1/2 z-20 -translate-y-1/2 text-[72px] font-extralight leading-none text-white/70 transition-all duration-500 ease-out hover:text-white hover:scale-105 md:right-10"
    >
      ›
    </button>

    <div
  key={activeInspiration}
  className="
    absolute
    left-[8%]
    top-1/2
    z-10
    w-[58%]
    max-w-[760px]
    -translate-y-1/2
    pr-10
    text-white
    [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]
    inspiration-text-fade
  "
>
      <p className="mb-5 text-base uppercase tracking-[0.32em] text-white/75">
  {lang === "en" ? "INSPIRATION" : "靈感空間"}
</p>

      <p className="mb-6 text-sm uppercase tracking-[0.28em] text-white/70">
        {lang === "en" ? activeSlide.subtitleEn : activeSlide.subtitleZh}
      </p>

      <div className="max-w-[700px]">
  <h2 className="font-serif text-5xl leading-tight tracking-[-0.04em] text-white md:text-7xl">
    {lang === "en" ? activeSlide.titleEn : activeSlide.titleZh}
  </h2>

  <p className="mt-8 max-w-[32ch] whitespace-pre-line text-lg leading-9 text-white/85 md:text-xl">
  {lang === "en" ? activeSlide.descEn : activeSlide.descZh}
</p>
</div>

    
    </div>
  </div>
</section>

{/* CONTACT */}
<section
  id="contact-info"
  className="relative scroll-mt-48 overflow-hidden px-8 py-16 text-[#2d241c] lg:px-20 lg:py-20"
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/contact/contact-bg.jpg')" }}
  />
  <div className="absolute inset-0 bg-[#e9ddcd]/35" />

  <div className="relative z-10">
  <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
    <div>
      <p className="mb-6 text-sm uppercase tracking-[0.28em] text-[#5f5040]">
        {t.contactLabel}
      </p>

      <h2 className="max-w-3xl text-5xl font-light leading-[1.02] tracking-[-0.04em] lg:text-7xl">
        {lang === "en" ? (
          <>
            Let’s Discuss
            <br />
            Your Project.
          </>
        ) : (
          <>
            一起討論
            <br />
            你的空間計畫
          </>
        )}
      </h2>
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:pt-10">
  <div className="flex min-h-[520px] flex-col border border-white/35 bg-[#f6f2ec]/50 p-8 backdrop-blur-[3px] transition-all duration-500 hover:-translate-y-[3px] hover:border-white/70 hover:bg-[#f6f2ec]/65 hover:shadow-[0_24px_60px_rgba(45,36,28,0.10)]">
  <div className="inline-block">
  <p className="text-xs uppercase tracking-[0.24em] text-[#564737]">
    {lang === "en" ? "Request Sample" : "索取樣品"}
  </p>

  <div className="mt-2 h-px w-full origin-left scale-x-0 bg-[#8a7965] transition-transform duration-500 group-hover:scale-x-100" />
</div>

<h3 className="mt-8 text-4xl font-light leading-tight text-[#2d241c]">
    {lang === "en" ? (
      <>
        Experience Texture
        <br />
        In Person
      </>
    ) : (
      <>
        親自感受
        <br />
        材質與工藝
      </>
    )}
  </h3>

  <p className="mt-6 max-w-md text-lg leading-8 text-[#6f6254]">
    {lang === "en"
      ? "Receive curated wallcovering samples to explore texture, craftsmanship and colour before specifying your next project."
      : "索取精選壁布樣品，親自感受材質、編織細節與色彩層次，為您的下一個空間專案找到最適合的選擇。"}
  </p>

  <div className="mt-auto flex justify-center pt-24">
    <button
      type="button"
      onClick={() => setSampleFormOpen(true)}
      className="mt-8 inline-flex h-14 w-[280px] items-center justify-center bg-[#2d241c] text-xs uppercase tracking-[0.24em] text-[#f6f2ec] transition hover:bg-[#6b5744]"
    >
      {lang === "en" ? "Request Samples" : "索取樣品"}
    </button>
  </div>

</div>

<div className="min-h-[520px] border border-white/35 bg-[#f6f2ec]/50 p-8 backdrop-blur-[3px] transition-all duration-500 hover:-translate-y-[3px] hover:border-white/70 hover:bg-[#f6f2ec]/65 hover:shadow-[0_24px_60px_rgba(45,36,28,0.10)]">

  <div className="inline-block">
    <p className="text-xs uppercase tracking-[0.24em] text-[#564737]">
      {lang === "en" ? "Contact" : "聯絡我們"}
    </p>

    <div className="mt-2 h-px w-full origin-left scale-x-0 bg-[#8a7965] transition-transform duration-500 group-hover:scale-x-100" />
  </div>

  <h3 className="mt-8 text-[2rem] font-light leading-tight text-[#2d241c]">
    {lang === "en" ? "Project Inquiry" : "專案洽詢"}
  </h3>

  <p className="mt-6 text-lg leading-8 text-[#6f6254]">
    {lang === "en"
      ? "Residential, hospitality, restaurant and commercial projects."
      : "高端住宅、精品飯店、餐飲空間、商業空間及客製化設計專案合作。"}
  </p>

  <div className="mt-10 space-y-5">
    <a
      href="mailto:hello@wevinewallcoverings.com"
      className="block text-xl text-[#2d241c] transition hover:text-[#6b5744]"
    >
      hello@wevinewallcoverings.com
    </a>
  </div>

</div>
    </div>
  </div>

  <div className="mt-12 border-t border-[#c7b8a5]/70 pt-6">
  <div className="flex justify-end items-center gap-6">
  <img
  src="/images/brand/wevine-lockup-black.svg"
  alt="WEVINE"
  className="h-8 w-auto"
/>

  <p className="text-xs uppercase tracking-[0.25em] text-[#7a6a58]">
    © 2026
  </p>
</div>
</div>

{sampleFormOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
    <button
      type="button"
      onClick={() => setSampleFormOpen(false)}
      className="absolute inset-0 bg-black/65 backdrop-blur-md"
      aria-label="Close sample request form"
    />

    <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#d8cec0] bg-[#faf7f2] p-8 shadow-2xl ring-1 ring-white/30 lg:p-10">
      <button
        type="button"
        onClick={() => setSampleFormOpen(false)}
        className="absolute right-6 top-5 text-2xl font-light text-[#6f6254] transition hover:text-[#2d241c]"
      >
        ×
      </button>

      <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#8a7965]">
        {lang === "en" ? "Sample Request" : "索取樣品"}
      </p>

      <h3 className="mb-8 pr-10 text-4xl font-light leading-tight text-[#2d241c]">
        {lang === "en"
          ? "Tell us about your project."
          : "告訴我們您的空間計畫"}
      </h3>

      <SampleRequestForm />
    </div>
  </div>
)}

  </div>
</section>
    </main>
  );
}

function CollectionCard({
  item,
  lang,
}: {
  item: {
    en: string;
    zh: string;
    slug: string;
    image: string;
    descEn: string;
    descZh: string;
  };

  lang: "en" | "zh";
}) {
  return (
    <Link
      href={`/collections/${item.slug}`}
      className="group block min-w-[420px] max-w-[420px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e1d6]">
        <img
          src={item.image}
          alt={item.en}
          className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.025] group-hover:brightness-[1.04]"
        />

        <div className="absolute inset-0 bg-black/20 transition duration-700 group-hover:bg-black/30" />

        <div className="absolute left-8 top-8 text-white">
          

          <h3 className="max-w-[260px] text-4xl font-light leading-[1.05] tracking-[-0.04em]">
            {lang === "en" ? item.en : item.zh}
          </h3>

          <div className="mt-5 h-px w-12 bg-white/60" />
        </div>

        
      </div>
    </Link>
  );
}