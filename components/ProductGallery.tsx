import TextureLens from "./TextureLens";
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
    <section
      id="product-gallery"
      className="bg-[#f4efe7] px-8 py-20 lg:px-20"
    >
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

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onSelectProduct(index)}
            className="group block w-full text-left"
          >
<TextureLens image={image}>
  <img
    src={image}
    alt={`${titleEn} sample ${index + 1}`}
    className="h-[84%] w-[84%] object-contain transition-all duration-[900ms] ease-out group-hover:scale-[1.1] group-hover:brightness-[1.06]"
  />
</TextureLens>

            <div className="mt-1 border-b border-stone-300/50 pb-3 transition-colors duration-500 group-hover:border-[#2d241c]">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-700 transition-colors duration-500 group-hover:text-[#2d241c]">
                {`${collectionCode}-${String(index + 1).padStart(2, "0")}`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}