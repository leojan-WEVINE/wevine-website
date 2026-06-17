"use client";

import Link from "next/link";

type CollectionItem = {
  en: string;
  zh: string;
  descEn: string;
  descZh: string;
  slug: string;
  image: string;
};

type CollectionsProps = {
  lang: "en" | "zh";
  collectionsLabel: string;
  collectionsText: string;
  collections: CollectionItem[];
};

export default function Collections({
  lang,
  collectionsLabel,
  collectionsText,
  collections,
}: CollectionsProps) {
  const scrollCollections = (direction: "left" | "right") => {
    const container = document.getElementById("collections-slider");

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -460 : 460,
      behavior: "smooth",
    });
  };

  return (
    <section id="collections" className="bg-[#f4efe8] px-8 py-28 lg:px-20">
      <div className="mb-8 flex items-end justify-between gap-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-500">
            {collectionsLabel}
          </p>

          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            {collectionsText}
          </p>
        </div>

        <div className="hidden gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollCollections("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-xl transition hover:border-stone-900"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollCollections("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-xl transition hover:border-stone-900"
          >
            →
          </button>
        </div>
      </div>

      <div
        id="collections-slider"
        className="flex gap-8 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((item) => (
          <Link
            key={item.slug}
            href={`/collections/${item.slug}`}
            className="group block min-w-[420px] max-w-[420px] overflow-hidden bg-white"
          >
            <div className="overflow-hidden bg-[#f4efe8]">
              <img
                src={item.image}
                alt={item.en}
                className="h-auto w-full transition duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-7">
              <h3 className="font-serif text-3xl text-stone-900">
                {lang === "en" ? item.en : item.zh}
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {lang === "en" ? item.descEn : item.descZh}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}