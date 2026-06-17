import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type MaterialsProps = {
  materialsLabel: string;
  materialsTitle: string;
  materialsText: string;
  materialsButton: string;
};

export default function Materials({
  materialsLabel,
  materialsTitle,
  materialsText,
  materialsButton,
}: MaterialsProps) {
  return (
    <motion.section
      id="materials"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2"
    >
      <div className="bg-stone-950 px-8 py-36 text-white lg:px-20">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
          {materialsLabel}
        </p>

        <h2 className="font-serif text-5xl leading-tight">
          {materialsTitle}
        </h2>

        <div className="my-8 h-px w-20 bg-white/20" />

        <p className="max-w-lg text-lg leading-8 text-white/70">
          {materialsText}
        </p>

        <button className="mt-10 flex items-center gap-3 border border-white/30 px-7 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
          {materialsButton}
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="min-h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80"
          alt="Natural texture"
          className="h-full w-full object-cover"
        />
      </div>
    </motion.section>
  );
}