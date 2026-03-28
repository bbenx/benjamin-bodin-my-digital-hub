import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/lib/profile-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const keyStats = [
  { label: "Taille", value: "176", unit: "cm" },
  { label: "Âge", value: "25–35", unit: "ans" },
  { label: "Yeux", value: profile.eyes },
  { label: "Cheveux", value: profile.hair },
];

const measurements = [
  ["Poitrine", profile.measurements["Poitrine"]],
  ["Tour de taille", profile.measurements["Tour de taille"]],
  ["Hanches", profile.measurements["Hanches"]],
  ["Entrejambe", profile.measurements["Entrejambe"]],
  ["Cou", profile.measurements["Cou"]],
  ["Tour de tête", profile.measurements["Tour de tête"]],
  ["Veste", profile.measurements["Veste"]],
  ["Pantalon", profile.measurements["Pantalon"]],
  ["Chaussures", profile.measurements["Chaussures"]],
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="mensurations"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      {/* Decorative vertical line — left gutter */}
      <motion.div
        className="absolute left-[8%] md:left-[12%] top-0 bottom-0 w-px bg-primary/10 origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-20 md:mb-28">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground/90"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            Mensurations
          </motion.h2>

          <motion.div
            className="h-px bg-primary/40 mt-8 origin-left"
            style={{ maxWidth: "4rem" }}
            variants={lineReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </div>

        {/* Key stats — large editorial numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 md:gap-y-0 mb-24 md:mb-32">
          {keyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i + 1}
            >
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60 mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground/90 leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs tracking-widest uppercase text-primary/50">
                    {stat.unit}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Measurements — refined two-column list */}
        <div className="grid md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-0 mb-24 md:mb-32">
          {/* Left column */}
          <div className="md:pr-12 space-y-0">
            {measurements.slice(0, 5).map(([label, value], i) => (
              <motion.div
                key={label}
                className="flex items-center justify-between py-3.5 border-b border-border/15"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={i + 5}
              >
                <span
                  className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground/50"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm text-foreground/80 font-light"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Center divider */}
          <motion.div
            className="hidden md:block bg-border/20 origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
          />

          {/* Right column */}
          <div className="md:pl-12 space-y-0">
            {measurements.slice(5).map(([label, value], i) => (
              <motion.div
                key={label}
                className="flex items-center justify-between py-3.5 border-b border-border/15"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={i + 10}
              >
                <span
                  className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground/50"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm text-foreground/80 font-light"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages + Skills — bottom row */}
        <div className="flex flex-col md:flex-row md:items-start gap-16 md:gap-24">
          {/* Languages */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={14}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60 mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Langues
            </p>
            <p
              className="text-lg font-light text-foreground/80 tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {profile.languages.join(" · ")}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={15}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60 mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Compétences
            </p>
            <div className="flex flex-wrap gap-2.5">
              {profile.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-[11px] tracking-[0.15em] font-light px-4 py-1.5 border-primary/20 text-foreground/60 hover:border-primary/40 hover:text-primary transition-colors duration-500"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { StatsSection };
