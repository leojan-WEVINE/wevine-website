import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type TextureLensProps = {
  image: string;
  children: ReactNode;
};

const DEFAULT_ZOOM = 550;
const MIN_ZOOM = 250;
const MAX_ZOOM = 950;
const ZOOM_STEP = 50;

export default function TextureLens({ image, children }: TextureLensProps) {
  const lensRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    const lens = lensRef.current;
    if (!lens) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setZoom((current) => {
        const direction = event.deltaY < 0 ? 1 : -1;
        const nextZoom = current + direction * ZOOM_STEP;

        return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
      });
    };

    lens.addEventListener("wheel", handleWheel, { passive: false });

    return () => lens.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={lensRef}
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
      title="Scroll to adjust magnification"
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
          backgroundSize: `${zoom}%`,
          backgroundPosition: "var(--lens-x, 50%) var(--lens-y, 50%)",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}