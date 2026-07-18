import TextureLens from "./TextureLens";
import { productLanguage } from "@/lib/design-language/product-language";

type ProductGalleryProps = {
  products: string[];
  titleEn: string;
  titleZh: string;
  lang: "en" | "zh";
  collectionCode: string;
  onSelectProduct: (index: number) => void;
};

export default function ProductGallery({
  products,
  titleEn,
  titleZh,
  lang,
  collectionCode,
  onSelectProduct,
}: ProductGalleryProps) {
  return (
    <section id="product-gallery" className="bg-[#f4efe7] px-8 py-20 lg:px-20">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-500">
            {lang === "en" ? "Design Selection" : "精選款式"}
          </p>

          <h2 className="text-[2.5rem] font-light leading-tight text-[#2d241c] lg:text-[3.5rem]">
            {lang === "en" ? `Explore ${titleEn}` : `探索${titleZh}`}
          </h2>
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((image, index) => {
          const productCode = `${collectionCode}-${String(index + 1).padStart(
            2,
            "0"
          )}`;

          const language =
            productLanguage[
              productCode as keyof typeof productLanguage
            ];

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => onSelectProduct(index)}
              className="group block w-full text-left"
            >
              <TextureLens image={image}>
                <img
                  src={image}
                  alt={`${productCode} ${titleEn} natural woven wallcovering by WEVINE`}
                  className="h-[84%] w-[84%] object-cover transition-all duration-[900ms] ease-out group-hover/lens:scale-[1.1] group-hover/lens:brightness-[1.06]"
                />
              </TextureLens>

              <div className="mt-3">
                <div className="relative mb-4 h-px w-full bg-stone-300/50">
                  <div className="h-px w-0 bg-[#2d241c] transition-all duration-500 ease-out group-hover:w-full" />
                </div>

                <div className="flex min-h-[46px] items-start justify-between gap-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-700 transition-colors duration-500 group-hover:text-[#2d241c]">
                    {productCode}
                  </p>

                  <div className="translate-y-2 text-right opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-medium tracking-[0.12em] text-[#2d241c]">
                      {lang === "en"
                        ? language?.patternEn
                        : language?.patternZh}
                    </p>

                    <p className="mt-2 text-[11px] tracking-[0.16em] text-[#8a7965] transition-all delay-100 duration-500 ease-out">
                      {lang === "en"
                        ? language?.atmosphereEn
                        : language?.atmosphereZh}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}