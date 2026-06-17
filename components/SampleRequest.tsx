import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type SampleRequestProps = {
  lang: "en" | "zh";
  email: string;
  setEmail: (value: string) => void;
  formError: string;
  setFormError: (value: string) => void;
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
};

export default function SampleRequest({
  lang,
  email,
  setEmail,
  formError,
  setFormError,
  submitted,
  setSubmitted,
}: SampleRequestProps) {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-[#f4efe7] px-8 py-36 lg:px-20"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-stone-500">
            {lang === "en" ? "Sample Request" : "樣品申請"}
          </p>

          <h2 className="font-serif text-5xl leading-tight">
            {lang === "en"
              ? "Experience the Texture in Person"
              : "親手感受材質的真實紋理"}
          </h2>

          <p className="mt-8 max-w-md text-lg leading-8 text-stone-600">
            {lang === "en"
              ? "Samples are available for interior designers, architects, and project-based inquiries."
              : "我們提供樣品申請服務，適合室內設計師、建築師與專案型空間需求。"}
          </p>
        </div>

        <div className="grid gap-4">
          <input
            placeholder={lang === "en" ? "Name" : "姓名"}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <input
            placeholder={lang === "en" ? "Company" : "公司名稱"}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormError("");
            }}
            placeholder={lang === "en" ? "Email" : "電子郵件"}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <input
            placeholder={lang === "en" ? "Country / Region" : "國家 / 地區"}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <input
            placeholder={lang === "en" ? "Project Type" : "專案類型"}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <textarea
            placeholder={lang === "en" ? "Message" : "備註訊息"}
            rows={5}
            className="border border-stone-300 bg-transparent px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />

          <button
            onClick={() => {
              if (!email) {
                setFormError(
                  lang === "en" ? "Please enter your email." : "請輸入電子郵件。"
                );
                return;
              }

              setSubmitted(true);
            }}
            className="mt-4 flex w-fit items-center gap-3 bg-stone-950 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-stone-700"
          >
            {lang === "en" ? "Submit Request" : "送出申請"}
            <ArrowRight size={18} />
          </button>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          {submitted && (
            <p className="text-sm text-stone-600">
              {lang === "en"
                ? "Thank you. Your sample request has been received."
                : "謝謝您，我們已收到您的樣品申請。"}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}