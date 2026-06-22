"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



const collectionData = {
  "atelier-weave": {
    title: { en: "Atelier Weave", zh: "工坊編織" },
    subtitle: {
      en: "Layered handcrafted weaves with refined artisanal rhythm.",
      zh: "帶有工藝節奏感的層次手工編織紋理。",
    },
    textureTitle: {
      en: "The Beauty of Handwoven Rhythm",
      zh: "手工編織節奏之美",
    },
    textureText: {
      en: "Atelier Weave expresses the quiet intelligence of handwoven surfaces. Subtle tonal shifts, refined fiber structure, and natural irregularities come together to create a wallcovering with warmth, depth, and timeless restraint.",
      zh: "Atelier Weave 以細緻的手工編織表情，呈現天然壁材安靜而深邃的層次。細微色澤變化、纖維結構與自然不規則感交織成溫潤、克制且歷久彌新的牆面質感。",
    },
    textureImage: "/images/textures/atelier-weave-texture.jpg",
    spaceBoard: "/images/spaces/atelier-weave-space-board.jpg",
    specifications: {
  width: '91.4 cm (36")',
  backing: "Paper Backing",
  application: "Interior Wallcovering",
  maintenance:
    "Gently wipe the area with a soft, non-abrasive cloth to remove dirt",
},
    products: Array.from(
      { length: 16 },
      (_, i) =>
        `/images/products/atelier-weave/atelier-weave-${String(i + 1).padStart(
          2,
          "0"
        )}.jpg`
    ),
  },

  "timber-trace": {
    title: { en: "Timber Trace", zh: "木紋軌跡" },
    subtitle: {
      en: "Natural textures inspired by weathered wood and organic grain.",
      zh: "靈感來自風化木紋與自然肌理的溫潤表情。",
    },
    textureTitle: {
      en: "Traces of Natural Grain",
      zh: "自然木紋的時間痕跡",
    },
    textureText: {
      en: "Timber Trace follows the quiet movement of aged wood, softened grain, and earth-toned fiber. Its surface carries a grounded warmth, offering interiors a calm architectural rhythm shaped by nature.",
      zh: "Timber Trace 捕捉老木紋理、柔化肌理與大地色纖維的自然流動。其表面帶有沉穩溫度，為空間注入由自然形塑而成的安定節奏。",
    },
    textureImage: "/images/textures/timber-trace-texture.jpg",
    spaceBoard: "/images/spaces/timber-trace-space-board.jpg",
    specifications: {
  width: '91.4 cm (36")',
  backing: "Paper Backing",
  application: "Interior Wallcovering",
  maintenance:
    "Gently wipe the area with a soft, non-abrasive cloth to remove dirt",
},
    products: Array.from(
      { length: 16 },
      (_, i) =>
        `/images/products/timber-trace/timber-trace-${String(i + 1).padStart(
          2,
          "0"
        )}.jpg`
    ),
  },

  "drift-weave": {
    title: { en: "Drift Weave", zh: "流紋編織" },
    subtitle: {
      en: "Soft flowing weaves with quiet movement and tonal depth.",
      zh: "帶有柔和流動感與色澤層次的編織語言。",
    },
    textureTitle: {
      en: "Soft Movement in Woven Form",
      zh: "柔和流動的編織形態",
    },
    textureText: {
      en: "Drift Weave is shaped by gentle movement, softened texture, and subtle tonal transitions. Its woven rhythm gives walls a sense of air, flow, and quiet spatial depth.",
      zh: "Drift Weave 以柔和動勢、細膩肌理與微妙色階轉換構成。其編織節奏讓牆面帶有空氣感、流動性與安靜的空間深度。",
    },
    textureImage: "/images/textures/drift-weave-texture.jpg",
    spaceBoard: "/images/spaces/drift-weave-space-board.jpg",
    specifications: {
  width: '91.4 cm (36")',
  backing: "Paper Backing",
  application: "Interior Wallcovering",
  maintenance:
    "Gently wipe the area with a soft, non-abrasive cloth to remove dirt",
},
    products: Array.from(
      { length: 16 },
      (_, i) =>
        `/images/products/drift-weave/drift-weave-${String(i + 1).padStart(
          2,
          "0"
        )}.jpg`
    ),
  },

  "totem-grain": {
    title: { en: "Totem Grain", zh: "圖騰紋理" },
    subtitle: {
      en: "Ancestral geometry woven into warm earthy textures.",
      zh: "將部落幾何與溫潤天然肌理融合的編織語彙。",
    },
    textureTitle: {
      en: "Rooted Texture, Tribal Rhythm",
      zh: "原始肌理與部落節奏",
    },
    textureText: {
      en: "Totem Grain draws inspiration from tribal carvings, desert lodges, and handcrafted woven patterns. Its layered geometric rhythm creates a grounded atmosphere filled with warmth, shadow, and sculptural depth.",
      zh: "Totem Grain 靈感源自部落雕刻、沙漠旅宿與手工編織圖騰。層層交錯的幾何節奏，營造出帶有陰影深度與雕塑感的沉穩空間氛圍。",
    },
    textureImage: "/images/textures/totem-grain-texture.jpg",
    spaceBoard: "/images/spaces/totem-grain-space-board.jpg",
    specifications: {
  width: '91.4 cm (36")',
  backing: "Paper Backing",
  application: "Interior Wallcovering",
  maintenance:
    "Gently wipe the area with a soft, non-abrasive cloth to remove dirt",
},
    products: Array.from(
      { length: 16 },
      (_, i) =>
        `/images/products/totem-grain/totem-grain-${String(i + 1).padStart(
          2,
          "0"
        )}.jpg`
    ),
  },

  "palette-weave": {
    title: { en: "Palette Weave", zh: "織彩系列" },
    subtitle: {
      en: "Woven color for modern living.",
      zh: "為現代生活織入色彩。",
    },
    textureTitle: {
      en: "Soft Color, Editorial Texture",
      zh: "柔和色彩與雜誌感肌理",
    },
    textureText: {
      en: "Palette Weave brings color into natural woven surfaces with a refined, fashion-inspired sensibility. From blush and coral to seafoam and indigo tones, the series is designed for boutique apartments, modern residences, and interiors that seek warmth, personality, and quiet elegance.",
      zh: "Palette Weave 將色彩注入天然編織表面，以細膩而時尚的語彙呈現空間個性。從桃紅、珊瑚紅到藍綠與靛藍色調，適合精品公寓、現代住宅與追求溫度、個性及柔和優雅的室內空間。",
    },
    textureImage: "/images/textures/palette-weave-texture.jpg",
    spaceBoard: "/images/spaces/palette-weave-space-board.jpg",
    specifications: {
  width: '91.4 cm (36")',
  backing: "Paper Backing",
  application: "Interior Wallcovering",
  maintenance:
    "Gently wipe the area with a soft, non-abrasive cloth to remove dirt",
},
    products: Array.from(
      { length: 16 },
      (_, i) =>
        `/images/products/palette-weave/palette-weave-${String(i + 1).padStart(
          2,
          "0"
        )}.jpg`
    ),
  },
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as keyof typeof collectionData;

  const [lang, setLang] = useState<"en" | "zh">("en");
const [langReady, setLangReady] = useState(false);
const [scrolled, setScrolled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [zoomImage, setZoomImage] = useState<string | null>(null);
const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

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

  const [storyPage, setStoryPage] = useState(0);

  const storyTotal = 4;
  

  const item = collectionData[slug];

  const collectionCodeMap = {
  "atelier-weave": "AW",
  "timber-trace": "TT",
  "drift-weave": "DW",
  "totem-grain": "TG",
  "palette-weave": "PW",
} as const;

const collectionCode = collectionCodeMap[slug];

  const nextStory = () => {
    setStoryPage((current) => Math.min(current + 1, storyTotal - 1));
  };

  const prevStory = () => {
    setStoryPage((current) => Math.max(current - 1, 0));
  };

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4efe7]">
        <h1 className="font-serif text-5xl">Collection not found</h1>
      </main>
    );
  }

  return (
  <main className="min-h-screen bg-[#f4efe7] text-stone-900">
    <Navbar

  navCollections={lang === "en" ? "Collections" : "系列產品"}
  navInspiration={lang === "en" ? "Inspiration" : "靈感案例"}
  navContact={lang === "en" ? "Contact" : "聯絡我們"}
  scrolled={scrolled}
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  onToggleLang={() => setLang(lang === "en" ? "zh" : "en")}
/>
    

    


      {/* COLLECTION STORY SLIDER */}
<section className="relative min-h-screen overflow-hidden bg-[#f4efe7]">
  {storyPage > 0 && (
    <button
      onClick={prevStory}
      className="
absolute
left-6
top-1/2
z-50
-translate-y-1/2
text-[72px]
font-extralight
leading-none
text-white/70
transition-all
duration-500
ease-out
hover:scale-105
hover:text-white
md:left-10
"
style={{
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textShadow:
    "0 0 4px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.35)",
}}
    >
      ‹
    </button>
  )}

  <button
    onClick={() => {
      if (storyPage === storyTotal - 1) {
        setStoryPage(0);
      } else {
        nextStory();
      }
    }}
    className="
absolute
right-6
top-1/2
z-50
-translate-y-1/2
text-[72px]
font-extralight
leading-none
text-white/70
transition-all
duration-500
ease-out
hover:scale-105
hover:text-white
md:right-10
"
style={{
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textShadow:
    "0 0 4px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.35)",
}}
  >
    ›
  </button>

  <button
    className="animate-bounce"
    onClick={() => {
      document
        .getElementById("product-gallery")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
    style={{
      position: "absolute",
      left: "50%",
      bottom: "28px",
      transform: "translateX(-50%)",
      zIndex: 60,
      border: "none",
      background: "transparent",
      color: "#ffffff",
      fontSize: "34px",
      fontWeight: 200,
      cursor: "pointer",
      textShadow:
        "0 0 4px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.35)",
    }}
  >
    ﹀
  </button>

        {/* PAGE 01 / HERO */}
        {storyPage === 0 && (
          <section
            className="relative flex min-h-screen items-end bg-cover bg-center px-8 pb-24 pt-32 text-white lg:px-20 lg:pb-32"
            style={{
              backgroundImage: `url('/images/heroes/${slug}-hero.jpg')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/20" />

            <div className="relative z-10 max-w-3xl animate-[fadeUp_0.9s_ease-out_forwards]">
              <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/60">
                {lang === "en" ? "Collection" : "產品系列"}
              </p>

              <h1 className="font-serif text-6xl leading-none lg:text-8xl">
                {item.title[lang]}
              </h1>

              <p className="mt-10 max-w-2xl text-2xl leading-10 text-white/75">
                {item.subtitle[lang]}
              </p>
            </div>
          </section>
        )}

        {/* PAGE 02 + PAGE 03 + PAGE 04 / COLLECTION STORY SLIDER */}
{storyPage >= 1 && (
  <div className="relative min-h-screen overflow-hidden bg-[#f4efe7]">
    <div
      className="flex min-h-screen transition-transform duration-1000 ease-out"
      style={{
        transform: `translateX(-${(storyPage - 1) * 100}%)`,
      }}
    >
      {/* PAGE 02 / STORY TEXT ON HERO */}
      <section
        className="relative flex min-h-screen w-full shrink-0 items-end bg-cover bg-center px-8 pb-24 pt-32 text-white lg:px-20 lg:pb-32"
        style={{
          backgroundImage: `url('/images/heroes/${slug}-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35" />

        <div className="relative z-10 max-w-3xl animate-[fadeUp_0.9s_ease-out_forwards]">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/60">
            {lang === "en" ? "Texture Story" : "材質敘事"}
          </p>

          <h2 className="font-serif text-5xl leading-tight lg:text-7xl">
            {item.textureTitle[lang]}
          </h2>

          <p className="mt-10 max-w-2xl text-xl leading-9 text-white/75">
            {item.textureText[lang]}
          </p>
        </div>
      </section>

      {/* PAGE 03 / TEXTURE DETAIL */}
      <section className="min-h-screen w-full shrink-0 bg-[#f4efe7] px-8 py-0">
        <div className="mx-auto w-full">
          <img
            src={item.textureImage}
            alt={`${item.title.en} texture detail`}
            className="block h-auto w-full"
          />
        </div>
      </section>

      {/* PAGE 04 / LOOKBOOK BOARD */}
      <section className="flex min-h-screen w-full shrink-0 items-center justify-center overflow-hidden bg-[#f4efe7]">
        <img
          src={item.spaceBoard}
          alt={`${item.title.en} lookbook`}
          className="h-screen w-screen object-contain"
        />
      </section>
    </div>
  </div>
)}

      </section>
      {/* PRODUCT GALLERY */}
<section
  id="product-gallery"
  className="bg-[#f4efe7] px-8 py-20 lg:px-20"
>
  <div className="mb-10 flex items-end justify-between">
    <div>

      <h2 className="font-serif text-5xl leading-tight text-[#2d241c] lg:text-6xl">
  {lang === "en"
    ? `Explore ${item.title.en}`
    : `探索 ${item.title.zh}`}
</h2>
    </div>

  
  </div>

  <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
    {item.products.map((image, index) => (
      <div key={`${image}-${index}`} className="group">
        <div className="overflow-hidden bg-[#eee7dd]">
          <img
            src={image}
            alt={`${item.title.en} sample ${index + 1}`}
            className="aspect-[3/4] w-full object-cover transition-all duration-[1600ms] ease-out group-hover:scale-[1.15] group-hover:brightness-[1.03]"
          />
        </div>

       <div className="mt-4 border-b border-stone-300/50 pb-3">
  <p className="text-xs uppercase tracking-[0.22em] text-stone-700">
    {`${collectionCode}-${String(index + 1).padStart(2, "0")}`}
  </p>
</div>
      </div>
    ))}
  </div>
</section>

{/* Specification + SAMPLE CTA */}
<section className="relative overflow-hidden px-8 py-20 text-[#2d241c] lg:px-20">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/contact/contact-bg.jpg')" }}
  />
  <div className="absolute inset-0 bg-[#f5efe7]/85" />

  <div className="relative z-10 flex flex-col gap-10 lg:flex-row">
    {/* LEFT: SPECIFICATION */}
    <div className="w-full p-8 lg:w-[60%] lg:p-10">
      <p className="mb-5 text-base uppercase tracking-[0.25em] text-[#2d241c]">
        {lang === "en" ? "Specification" : "規格資訊"}
      </p>

      <h2 className="mb-8 text-[2rem] font-light leading-tight text-[#2d241c]">
        {item.title[lang]}
      </h2>

      <div className="mt-12 grid gap-y-8 border-t border-[#c7b8a5]/70 pt-8 sm:grid-cols-2 sm:gap-x-12">
        <div>
          <p className="mb-2 text-base uppercase tracking-[0.18em] text-black">
  {lang === "en" ? "Width" : "門幅"}
</p>

<p className="text-2xl text-black">
  {item.specifications.width}
</p>
        </div>

        <div>
          <p className="mb-2 text-base uppercase tracking-[0.18em] text-black">
            {lang === "en" ? "Backing" : "底材"}
          </p>
          <p className="text-2xl text-black">
            {lang === "en" ? item.specifications.backing : "高級紙質"}
          </p>
        </div>

        <div>
          <p className="mb-2 text-base uppercase tracking-[0.18em] text-black">
            {lang === "en" ? "Application" : "適用範圍"}
          </p>
          <p className="text-2xl text-black">
            {lang === "en"
              ? item.specifications.application
              : "室內壁面裝飾材料"}
          </p>
        </div>

        <div>
          <p className="mb-2 text-base uppercase tracking-[0.18em] text-black">
            {lang === "en" ? "Maintenance" : "保養方式"}
          </p>
          <p className="text-2xl text-black">
            {lang === "en"
              ? item.specifications.maintenance
              : "使用柔軟且不具磨蝕性的布料輕拭表面，以去除灰塵與污漬。"}
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT: SAMPLE REQUEST */}
    <div className="flex min-h-[420px] w-full flex-col p-8 lg:w-[40%] lg:p-10">
      <p className="mb-5 text-base uppercase tracking-[0.25em] text-[#2d241c]">
        {lang === "en" ? "Sample Request" : "樣品申請"}
      </p>

      <h2 className="mb-8 text-[2rem] font-light leading-tight text-[#2d241c]">
        {lang === "en"
  ? `Experience ${item.title.en}`
  : `親手感受 ${item.title.zh}`}
      </h2>

      <p className="mt-16 border-t border-[#c7b8a5]/70 pt-8 text-2xl leading-9 text-black">
        {lang === "en"
          ? "Receive curated wallcovering samples to explore texture, craftsmanship and colour before specifying your next project."
          : "索取精選壁布樣品，親自感受材質、編織細節與色彩層次，為您的下一個空間專案找到最適合的選擇。"}
      </p>

      <div className="pt-10">
  <a
    href="/#contact-info"
    className="mt-8 inline-flex h-14 w-[280px] items-center justify-center bg-[#2d241c] text-base uppercase tracking-[0.12em] text-[#f6f2ec] transition hover:bg-[#6b5744]"
  >
    {lang === "en" ? "Request Samples" : "申請樣品"}
  </a>
</div>
    </div>
  </div>

  {/* Footer Logo */}
  <div className="relative z-10 mt-10 flex items-center justify-end gap-6">
    <img
      src="/images/brand/wevine-lockup-black.svg"
      alt="WEVINE"
      className="h-8 w-auto"
    />

    <p className="text-sm tracking-[0.08em] text-[#2d241c]">
      © 2026 WEVINE. All rights reserved.
    </p>
  </div>
</section>
    </main>
  );
}