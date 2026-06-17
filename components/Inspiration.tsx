import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type InspirationItem = {
  en: string;
  zh: string;
};

type InspirationProps = {
  lang: "en" | "zh";
  inspirationLabel: string;
  inspirationTitle: string;
  inspiration: InspirationItem[];
};

export default function Inspiration({
  lang,
  inspirationLabel,
  inspirationTitle,
  inspiration,
}: InspirationProps) {
  return (
    <motion.section
      id="inspiration"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-stone-950 px-8 py-36 text-white lg:px-20"
    >
      <div className="mb-16 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
          {inspirationLabel}
        </p>

        <h2 className="font-serif text-5xl leading-tight">
          {inspirationTitle}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {inspiration.map((item) => (
          <div key={item.en} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
                alt={item.en}
                className="h-full w-full object-cover opacity-70 transition duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/80">
                {lang === "en" ? item.en : item.zh}
              </h3>

              <ArrowRight
                size={16}
                className="opacity-50 transition group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}