import React, { useEffect, useRef, useState, HTMLAttributes } from "react";
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
    const [rotation, setRotation] = useState(0);
    const [isDraggingUi, setIsDraggingUi] = useState(false);
    const draggingRef = useRef(false);
    const lastXRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const dragPendingRef = useRef(0);
    const dragRafRef = useRef<number | null>(null);
    const sensitivityRef = useRef(dragSensitivity);
    const isMobile = useIsMobile();

    /** Même comportement partout : tailles adaptées au viewport étroit. */
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

    sensitivityRef.current = sensitivity;

    const flushDragPending = () => {
      const d = dragPendingRef.current;
      dragPendingRef.current = 0;
      if (d !== 0) {
        setRotation((r) => r + d);
      }
    };

    const scheduleDragFrame = () => {
      if (dragRafRef.current !== null) return;
      dragRafRef.current = requestAnimationFrame(() => {
        dragRafRef.current = null;
        flushDragPending();
      });
    };

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
        if (dragRafRef.current !== null) {
          cancelAnimationFrame(dragRafRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      setIsDraggingUi(true);
      lastXRef.current = e.clientX;
      dragPendingRef.current = 0;
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      dragPendingRef.current += dx * sensitivityRef.current;
      scheduleDragFrame();
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDraggingUi(false);
      if (dragRafRef.current !== null) {
        cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
      }
      flushDragPending();
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* capture déjà relâchée */
      }
    };

    const anglePerItem = 360 / items.length;
    const opacityTransition = isDraggingUi ? "none" : "opacity 0.3s linear";

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Galerie"
        className={cn(
          "relative flex h-full w-full touch-pan-y items-center justify-center overscroll-x-none md:cursor-grab md:active:cursor-grabbing",
          className,
        )}
        style={{ perspective: `${perspectivePx}px`, touchAction: "pan-y" }}
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
            willChange: "transform",
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
                  transition: opacityTransition,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-lg border border-border bg-card/70 shadow-2xl backdrop-blur-lg dark:bg-card/30">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
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
