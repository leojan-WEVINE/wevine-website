"use client";

import { useState } from "react";
import { ChevronDown, Grid3X3, X } from "lucide-react";

type FloatingCollectionNavProps = {
  currentSlug: string;
  visible: boolean;
  lang: "en" | "zh";
  sampleItems: string[];
  onRemoveSample: (code: string) => void;
};

const collections = [
  { slug: "atelier-weave", label: "Atelier Weave" },
  { slug: "timber-trace", label: "Timber Trace" },
  { slug: "drift-weave", label: "Drift Weave" },
  { slug: "totem-grain", label: "Totem Grain" },
  { slug: "palette-weave", label: "Palette Weave" },
];

export default function FloatingCollectionNav({
  currentSlug,
  visible,
  lang,
  sampleItems,
  onRemoveSample,
}: FloatingCollectionNavProps) {
  const [open, setOpen] = useState(false);

  if (!visible) return null;

  const requestSamples = () => {
    localStorage.setItem("wevine-sample-cart", JSON.stringify(sampleItems));

    const samplesQuery = encodeURIComponent(sampleItems.join(","));

    window.location.href = `/?sampleRequest=1&samples=${samplesQuery}#contact-info`;
  };

  return (
    <div className="fixed bottom-12 right-8 z-[85] hidden lg:block">
      <div className="relative">
        {open && (
          <div className="absolute bottom-14 right-0 w-80 rounded-2xl border border-white/40 bg-[#f4efe7]/65 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.12)] backdrop-blur-lg">
            {/* COLLECTIONS */}
            <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#8a7965]">
              {lang === "en" ? "Explore Collections" : "探索系列"}
            </p>

            <div className="mb-5 h-px bg-[#d6cfc4]" />

            <div className="space-y-3">
              {collections.map((item) => {
                const active = item.slug === currentSlug;

                return (
                  <a
                    key={item.slug}
                    href={`/collections/${item.slug}`}
                    className={`group block py-1 text-sm tracking-[0.06em] transition ${
                      active
                        ? "text-[#2d241c]"
                        : "text-[#8a7965] hover:text-black"
                    }`}
                  >
                    <span className="inline-flex items-center">
  {active && (
    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#8a7965]" />
  )}

  <span>{item.label}</span>
</span>

                    <span
                      className={`mt-1 block h-[2px] rounded-full bg-[#8a7965] transition-all duration-500 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* SAMPLE KIT */}
            <div className="my-6 h-px bg-[#d6cfc4]" />

            <div>
              <div className="mb-4">
  <p className="text-[10px] uppercase tracking-[0.28em] text-[#8a7965]">
    {lang === "en" ? "Sample Kit" : "樣品清單"}
  </p>

  <p className="mt-2 text-xs tracking-[0.08em] text-[#8a7965]">
    {lang === "en"
      ? `${sampleItems.length} Selected`
      : `已選擇 ${sampleItems.length} 項`}
  </p>
</div>

              {sampleItems.length === 0 ? (
                <p className="text-sm tracking-[0.04em] text-[#8a7965]">
                  {lang === "en" ? "No samples selected." : "尚未加入任何樣品"}
                </p>
              ) : (
                <div className="space-y-3">
                  {sampleItems.map((code) => (
                    <div
                      key={code}
                      className="group flex items-center justify-between text-sm tracking-[0.08em] text-[#2d241c]"
                    >
                      <span>{code}</span>

                      <button
                        type="button"
                        onClick={() => onRemoveSample(code)}
                        className="opacity-45 transition hover:text-black group-hover:opacity-100"
                        aria-label={`Remove ${code}`}
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="my-6 h-px bg-[#d6cfc4]" />

            <div className="space-y-4">
              <button
  type="button"
  onClick={requestSamples}
  disabled={sampleItems.length === 0}
  className={`group block w-full text-left text-[15px] tracking-[0.08em] transition ${
    sampleItems.length === 0
      ? "cursor-not-allowed text-[#8a7965]/45"
      : "text-[#8a7965] hover:text-black"
  }`}
>
  <span className="inline-flex items-center">
    {lang === "en" ? "Request Samples" : "索取樣品"}

    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>

  <span
    className={`mt-1 block h-px bg-[#2d241c] transition-all duration-500 ${
      sampleItems.length === 0 ? "w-0" : "w-0 group-hover:w-full"
    }`}
  />
</button>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setOpen(false);
                }}
                className="group block w-full text-left text-sm tracking-[0.08em] text-[#8a7965] transition hover:text-black"
              >
                <span>{lang === "en" ? "↑ Back to Top" : "↑ 回到頂部"}</span>

                <span className="mt-1 block h-px w-0 bg-[#2d241c] transition-all duration-500 group-hover:w-full" />
              </button>
            </div>
          </div>
        )}

        {/* FLOATING PILL */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/40 bg-[#f4efe7]/60 px-4 text-[11px] uppercase tracking-[0.12em] text-[#2d241c] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-white/70 hover:bg-[#f4efe7]/80"
        >
          <Grid3X3
            size={14}
            strokeWidth={1.5}
            className="flex-shrink-0 opacity-70"
          />

          <span className="min-w-[78px] text-center">
            {lang === "en" ? "Collections" : "瀏覽系列"}
          </span>

          {sampleItems.length > 0 && (
  <span
    className="
      ml-2
      flex
      h-4
      min-w-4
      items-center
      justify-center
      rounded-full
      bg-[#8a7965]
      px-1
      text-[9px]
      font-medium
      leading-none
      text-white
    "
  >
    {sampleItems.length}
  </span>
)}

          <ChevronDown
            size={14}
            strokeWidth={1.6}
            className={`flex-shrink-0 opacity-70 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}