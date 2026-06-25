type ProductModalProps = {
  selectedProduct: string;
  selectedProductCode: string;
  collectionTitle: string;
  lang: "en" | "zh";
  sampleCart: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAddSample: () => void;
  onRemoveSample: (code: string) => void;
};

export default function ProductModal({
  selectedProduct,
  selectedProductCode,
  collectionTitle,
  lang,
  sampleCart,
  onClose,
  onPrev,
  onNext,
  onAddSample,
  onRemoveSample,
}: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 py-8 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Close product preview"
      />

      <div className="relative z-10 grid max-h-[90vh] w-full max-w-6xl overflow-hidden bg-[#f4efe7] shadow-2xl lg:grid-cols-[68%_32%]">
        <div className="relative flex max-h-[90vh] items-center justify-center bg-[#e8dfd3] px-14 py-10">
          <div className="flex aspect-[4/5] h-[78vh] max-h-[760px] w-full max-w-[620px] items-center justify-center">
            <img
              src={selectedProduct}
              alt={selectedProductCode}
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[60px] font-extralight leading-none text-[#8a7965] transition hover:scale-105 hover:text-[#2d241c]"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[60px] font-extralight leading-none text-[#8a7965] transition hover:scale-105 hover:text-[#2d241c]"
          >
            ›
          </button>
        </div>

        <div className="flex flex-col justify-between p-8 lg:p-10">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-5 text-3xl font-light text-[#6f6254] transition hover:text-[#2d241c]"
              aria-label="Close product preview"
            >
              ×
            </button>

            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#8a7965]">
              {collectionTitle}
            </p>

            <h3 className="text-5xl font-light leading-none text-[#2d241c]">
              {selectedProductCode}
            </h3>

            <p className="mt-8 text-lg leading-8 text-[#6f6254]">
              {lang === "en"
                ? "Explore texture, tone and woven detail before requesting samples for your project."
                : "放大檢視材質、色澤與編織細節，為您的空間專案挑選合適樣品。"}
            </p>
          </div>

          <div className="mt-10">
            {sampleCart.length > 0 && (
              <div className="mb-8 border-y border-[#c7b8a5]/70 py-5">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#8a7965]">
                  {lang === "en"
                    ? `Selected Samples (${sampleCart.length})`
                    : `已選樣品（${sampleCart.length}）`}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {sampleCart.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onRemoveSample(code)}
                      className="group inline-flex items-center gap-2 border border-[#c7b8a5] px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#2d241c] transition hover:border-[#2d241c]"
                    >
                      <span>{code}</span>

                      <span className="text-[11px] font-light opacity-45 transition group-hover:opacity-100">
                        ×
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem(
                      "wevine-sample-cart",
                      JSON.stringify(sampleCart)
                    );

                    const samplesQuery = encodeURIComponent(
                      sampleCart.join(",")
                    );

                    window.location.href = `/?sampleRequest=1&samples=${samplesQuery}#contact-info`;
                  }}
                  className="inline-flex h-12 w-full items-center justify-center border border-[#2d241c] text-xs uppercase tracking-[0.16em] text-[#2d241c] transition hover:bg-[#2d241c] hover:text-[#f6f2ec]"
                >
                  {lang === "en"
                    ? "Continue to Request Form"
                    : "前往樣品申請表"}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onAddSample}
              className="inline-flex h-14 w-full items-center justify-center bg-[#2d241c] text-sm uppercase tracking-[0.16em] text-[#f6f2ec] transition hover:bg-[#6b5744]"
            >
              {sampleCart.includes(selectedProductCode)
                ? lang === "en"
                  ? "Added to Sample Request"
                  : "已加入樣品申請"
                : lang === "en"
                  ? "Add to Sample Request"
                  : "加入樣品申請"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}