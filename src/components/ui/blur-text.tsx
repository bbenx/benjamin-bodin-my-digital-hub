import { useState, useLayoutEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  /** Affiche le texte tout de suite (hero, above-the-fold). */
  immediate?: boolean;
}

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  immediate = false,
}) => {
  const [inView, setInView] = useState(immediate);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useLayoutEffect(() => {
    if (immediate || reduceMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (isElementInViewport(el)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, reduceMotion]);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  if (reduceMotion) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      className={cn(
        "inline-flex",
        animateBy === "letters" ? "flex-nowrap" : "flex-wrap",
        className,
      )}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export { BlurText };
export type { BlurTextProps };
