import type { ReactNode } from "react";
import { useRef } from "react";

type TextureLensProps = {
  image: string;
  children: ReactNode;
};

export default function TextureLens({ image, children }: TextureLensProps) {
  const frameRef = useRef<number | null>(null);

  return (
    <div
      className="group/lens relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#f4efe7]"
      onMouseMove={(e) => {
        if (frameRef.current !== null) return;

        const target = e.currentTarget;
        const clientX = e.clientX;
        const clientY = e.clientY;

        frameRef.current = requestAnimationFrame(() => {
          const rect = target.getBoundingClientRect();

          target.style.setProperty(
            "--lens-x",
            `${((clientX - rect.left) / rect.width) * 100}%`
          );

          target.style.setProperty(
            "--lens-y",
            `${((clientY - rect.top) / rect.height) * 100}%`
          );

          frameRef.current = null;
        });
      }}
      onMouseLeave={() => {
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      }}
    >
      {children}

      <div
        className="
pointer-events-none
absolute
right-5
top-5
z-20
h-40
w-40
overflow-hidden
rounded-md
border
border-white/80
bg-white/75
shadow-2xl
backdrop-blur-sm
opacity-0
scale-95
transition-all
duration-200
ease-out
group-hover/lens:opacity-100
group-hover/lens:scale-100
"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "550%",
          backgroundPosition: "var(--lens-x, 50%) var(--lens-y, 50%)",
          backgroundRepeat: "no-repeat",
        }}
      >
        
      </div>
    </div>
  );
}