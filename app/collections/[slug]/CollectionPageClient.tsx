"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ProductModal from "@/components/ProductModal";
import FloatingCollectionNav from "@/components/FloatingCollectionNav";
import { productLanguage } from "@/lib/design-language/product-language";


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
      { length: 38 },
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
      { length: 26 },
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
      { length: 26 },
      (_, i) =>
        `/images/products/totem-grain/totem-grain-${String(i + 1).padStart(
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
const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
const [showFloatingNav, setShowFloatingNav] = useState(false);

const [sampleCart, setSampleCart] = useState<string[]>(() => {
  if (typeof window === "undefined") return [];

  const savedSamples = localStorage.getItem("wevine-sample-cart");

  if (!savedSamples) return [];

  try {
    return JSON.parse(savedSamples);
  } catch {
    return [];
  }
});

const [toastMessage, setToastMessage] = useState("");

const sampleCount = sampleCart.length;

useEffect(() => {
  if (sampleCart.length === 0) {
    localStorage.removeItem("wevine-sample-cart");
    return;
  }

  localStorage.setItem("wevine-sample-cart", JSON.stringify(sampleCart));
}, [sampleCart]);

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

useEffect(() => {
  const checkGalleryVisible = () => {
    const gallery = document.getElementById("product-gallery");
    if (!gallery) return;

    const rect = gallery.getBoundingClientRect();
    setShowFloatingNav(rect.top <= window.innerHeight * 0.45);
  };

  checkGalleryVisible();
  window.addEventListener("scroll", checkGalleryVisible);

  return () => window.removeEventListener("scroll", checkGalleryVisible);
}, []);

  const [storyPage, setStoryPage] = useState(0);

  const storyTotal = 4;
  

  const item = collectionData[slug];

  const collectionCodeMap = {
  "atelier-weave": "AW",
  "timber-trace": "TT",
  "drift-weave": "DW",
  "totem-grain": "TG",
  
} as const;

const collectionCode = collectionCodeMap[slug];
const selectedProduct =
  selectedProductIndex !== null ? item.products[selectedProductIndex] : null;

const selectedProductCode =
  selectedProductIndex !== null
    ? `${collectionCode}-${String(selectedProductIndex + 1).padStart(2, "0")}`
    : "";

const prevProduct = () => {
  setSelectedProductIndex((current) => {
    if (current === null) return null;
    return current === 0 ? item.products.length - 1 : current - 1;
  });
};

const nextProduct = () => {
  setSelectedProductIndex((current) => {
    if (current === null) return null;
    return current === item.products.length - 1 ? 0 : current + 1;
  });
};

const addSampleToCart = () => {
  console.log("selectedProductCode:", selectedProductCode);

  if (!selectedProductCode) return;

  setSampleCart((current) => {
    if (current.includes(selectedProductCode)) return current;

    const updated = [...current, selectedProductCode];

    localStorage.setItem("wevine-sample-cart", JSON.stringify(updated));


    window.dispatchEvent(new Event("sample-cart-updated"));

    setToastMessage(selectedProductCode);

setTimeout(() => {
  setToastMessage("");
}, 2200);

    return updated;
  });
};

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
  sampleCount={sampleCart.length}
/>
<FloatingCollectionNav
  currentSlug={slug}
  visible={showFloatingNav}
  lang={lang}
  sampleItems={sampleCart}
  onRemoveSample={(code) =>
    setSampleCart(sampleCart.filter((item) => item !== code))
  }
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
      <ProductGallery
  products={item.products}
  titleEn={item.title.en}
  titleZh={item.title.zh}
  lang={lang}
  collectionCode={collectionCode}
  onSelectProduct={setSelectedProductIndex}
/>


{/* Specification + SAMPLE CTA */}
<section
  id="sample-request-section"
  className="relative overflow-hidden px-8 py-20 text-[#2d241c] lg:px-20"
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/contact/contact-bg.jpg')" }}
  />
  <div className="absolute inset-0 bg-[#f5efe7]/85" />

  <div className="relative z-10 grid gap-16 lg:grid-cols-[60%_40%]">
    {/* LEFT */}
    <div className="p-8 lg:p-10">
      <p className="mb-5 text-base uppercase tracking-[0.25em] text-[#2d241c]">
        {lang === "en" ? "Specification" : "規格資訊"}
      </p>

      <h2 className="min-h-[72px] text-[2rem] font-light leading-tight text-[#2d241c]">
        {item.title[lang]}
      </h2>

      <div className="mt-10 border-t border-[#c7b8a5]/70 pt-8">
        <div className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-12">
          <div>
            <p className="mb-2 text-base uppercase tracking-[0.18em] text-black">
              {lang === "en" ? "Width" : "門幅"}
            </p>
            <p className="text-2xl text-black">{item.specifications.width}</p>
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
        {/* TECHNICAL RESOURCES */}
<div className="mt-10 border-t border-[#c7b8a5]/70 pt-8">
  <p className="text-base uppercase tracking-[0.25em] text-[#2d241c]">
    {lang === "en" ? "Technical Resources" : "技術資源"}
  </p>

  <h3 className="mt-4 text-2xl font-light leading-tight text-[#2d241c]">
    {lang === "en"
      ? "Maintenance & Installation Guidelines"
      : "維護與安裝指南"}
  </h3>

  <p className="mt-4 max-w-2xl text-lg leading-8 text-black/75">
    {lang === "en"
      ? "Professional guidance for wall preparation, installation, seam finishing and routine care."
      : "提供牆面準備、安裝施工、接縫處理及日常維護的專業指引。"}
  </p>
  <div className="mt-6 flex flex-wrap gap-3">
    <a
      href="/downloads/WEVINE-Wallcovering-Maintenance-Installation-Guidelines.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 min-w-[180px] items-center justify-center border border-[#2d241c] px-6 text-sm uppercase tracking-[0.12em] text-[#2d241c] transition hover:bg-[#2d241c] hover:text-[#f6f2ec]"
    >
      {lang === "en" ? "View PDF" : "查看 PDF"}
    </a>

  </div>
</div>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col p-8 lg:p-10">
      <p className="mb-5 text-base uppercase tracking-[0.25em] text-[#2d241c]">
        {lang === "en" ? "Sample Request" : "樣品申請"}
      </p>

      <h2 className="min-h-[72px] text-[2rem] font-light leading-tight text-[#2d241c]">
        {lang === "en"
          ? `Experience ${item.title.en}`
          : `親手感受 ${item.title.zh}`}
      </h2>

      <div className="mt-10 border-t border-[#c7b8a5]/70 pt-8">
        <p className="text-2xl leading-9 text-black">
          {lang === "en"
            ? "Receive curated wallcovering samples to explore texture, craftsmanship and colour before specifying your next project."
            : "索取精選壁布樣品，親自感受材質、編織細節與色彩層次，為您的下一個空間專案找到最適合的選擇。"}
        </p>

        <a
          href="/#contact-info"
          className="mt-10 inline-flex h-12 w-[280px] max-w-full items-center justify-center border border-[#2d241c] px-6 text-sm uppercase tracking-[0.12em] text-[#2d241c] transition hover:bg-[#2d241c] hover:text-[#f6f2ec]"
        >
          {lang === "en" ? "Request Samples" : "申請樣品"}
        </a>
      </div>
    </div>
  </div>

  <div className="relative z-10 mt-12 flex items-center justify-end gap-6">
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

{selectedProduct && (
  <ProductModal
    selectedProduct={selectedProduct}
    selectedProductCode={selectedProductCode}
    collectionTitle={item.title[lang]}
    patternEn={
  productLanguage[selectedProductCode as keyof typeof productLanguage]
    ?.patternEn ?? ""
}
patternZh={
  productLanguage[selectedProductCode as keyof typeof productLanguage]
    ?.patternZh ?? ""
}
atmosphereEn={
  productLanguage[selectedProductCode as keyof typeof productLanguage]
    ?.atmosphereEn ?? ""
}
atmosphereZh={
  productLanguage[selectedProductCode as keyof typeof productLanguage]
    ?.atmosphereZh ?? ""
}
    lang={lang}
    sampleCart={sampleCart}
    onClose={() => setSelectedProductIndex(null)}
    onPrev={prevProduct}
    onNext={nextProduct}
    onAddSample={addSampleToCart}
    onRemoveSample={(code) =>
      setSampleCart(sampleCart.filter((item) => item !== code))
    }
  />
)}

{toastMessage && (
  <div className="fixed right-8 top-[140px] z-[200] animate-[toastIn_0.35s_ease-out,toastOut_0.4s_ease-in_1.8s_forwards] rounded-lg border border-white/30 bg-[#f6f2ec]/78 px-4 py-3 shadow-xl backdrop-blur-md">
    <p className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[#8a7965]">
      <span className="text-[11px]">✓</span>
      {lang === "en" ? "Sample Added" : "已加入樣品申請"}
    </p>

    <p className="mt-1 pl-[15px] text-[14px] font-light tracking-[0.06em] text-[#2d241c]">
      {toastMessage}
    </p>
  </div>
)}

    </main>
  );
}