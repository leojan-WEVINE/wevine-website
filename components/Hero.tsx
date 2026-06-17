import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type HeroProps = {
  heroTop: string;
  heroTitle: string;
  heroText: string;
  explore: string;
  request: string;
  mousePosition: {
    x: number;
    y: number;
  };
};

export default function Hero({
  heroTop,
  heroTitle,
  heroText,
  explore,
  request,
  mousePosition,
}: HeroProps) {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
        style={{
          background: `radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(255,255,255,0.08),
            transparent 40%
          )`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/45" />

      <div className="relative z-10 flex min-h-screen items-center px-8 pt-32 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/75">
            {heroTop}
          </p>

          <h1 className="font-serif text-6xl leading-[0.95] tracking-[-0.04em] lg:text-8xl">
            {heroTitle}
          </h1>

          <div className="my-8 h-px w-20 bg-white/40" />

          <p className="max-w-md text-lg leading-8 text-white/80">
            {heroText}
          </p>

          <div className="mt-28 flex flex-wrap gap-4">
            <a
              href="#collections"
              className="flex items-center gap-3 border border-white/40 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-70"
            >
              {explore}
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-3 border border-white/25 bg-white/10 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white backdrop-blur transition-opacity duration-300 hover:opacity-70"
            >
              {request}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}