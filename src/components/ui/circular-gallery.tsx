import React, { useEffect, useRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  /** Sensibilité du glisser horizontal (degrés par pixel). */
  dragSensitivity?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      dragSensitivity = 0.45,
      ...props
    },
    ref,
  ) => {
    const [rotation, setRotation] = React.useState(0);
    const draggingRef = useRef(false);
    const lastXRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const isMobile = useIsMobile();

    /** Mobile : cartes un peu plus étroites + rayon minimal pour éviter le chevauchement (10 panneaux ≈ 36°). */
    const compact = isMobile;
    const cardW = compact ? 190 : 300;
    const cardH = compact ? 265 : 400;
    const halfW = cardW / 2;
    const halfH = cardH / 2;
    const n = items.length;
    const angleStepRad = n <= 1 ? Math.PI / 2 : (2 * Math.PI) / n;
    /** Distance Z minimale pour que les largeurs de panneaux ne se croisent pas sur le cercle. */
    const minTranslateZ =
      n <= 1 ? halfW + 120 : halfW / Math.sin(angleStepRad / 2) + 16;
    const effectiveRadius = compact ? Math.max(Math.ceil(minTranslateZ), Math.round(radius * 0.72)) : radius;
    /** Réduit visuellement l’anneau (grand translateZ nécessaire) pour rester dans le viewport. */
    const ringScale = compact ? 0.74 : 1;
    const sensitivity = compact ? 0.52 : dragSensitivity;
    const perspectivePx = compact ? 1500 : 2000;

    useEffect(() => {
      const tick = () => {
        if (!draggingRef.current) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      animationFrameRef.current = requestAnimationFrame(tick);
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      lastXRef.current = e.clientX;
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      setRotation((r) => r + dx * sensitivity);
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* capture déjà relâchée */
      }
    };

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Galerie"
        className={cn(
          "relative flex h-full w-full touch-pan-y items-center justify-center md:cursor-grab md:active:cursor-grabbing",
          className,
        )}
        style={{ perspective: `${perspectivePx}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        {...props}
      >
        <div
          className="relative h-full w-full select-none"
          style={{
            transform: `rotateY(${rotation}deg) scale3d(${ringScale}, ${ringScale}, ${ringScale})`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute overflow-hidden rounded-lg"
                style={{
                  width: cardW,
                  height: cardH,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: -halfW,
                  marginTop: -halfH,
                  opacity,
                  transition: "opacity 0.3s linear",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-lg border border-border bg-card/70 shadow-2xl backdrop-blur-lg dark:bg-card/30">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic opacity-80">{item.binomial}</em>
                    <p className="mt-2 text-xs opacity-70">Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
