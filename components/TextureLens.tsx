import type { ReactNode } from "react";

type TextureLensProps = {
  image: string;
  children: ReactNode;
};

export default function TextureLens({
  image,
  children,
}: TextureLensProps) {
  return (
    <div
      className="group/lens relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#f4efe7]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        e.currentTarget.style.setProperty(
          "--lens-x",
          `${((e.clientX - rect.left) / rect.width) * 100}%`
        );

        e.currentTarget.style.setProperty(
          "--lens-y",
          `${((e.clientY - rect.top) / rect.height) * 100}%`
        );
      }}
    >
      {children}

      <div
        className="pointer-events-none absolute right-5 top-5 z-20 h-36 w-36 overflow-hidden rounded-md border border-white/70 bg-white/75 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/lens:opacity-100"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "550%",
          backgroundPosition: "var(--lens-x) var(--lens-y)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute left-3 top-3 text-[9px] font-medium uppercase tracking-[0.32em] text-black/40">
          DETAIL
        </div>

        <div className="absolute bottom-3 right-3 text-[9px] font-medium uppercase tracking-[0.24em] text-black/40">
          MAGNIFIED
        </div>
      </div>
    </div>
  );
}