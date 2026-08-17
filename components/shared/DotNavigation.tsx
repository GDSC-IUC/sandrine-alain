"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "accueil",        label: "Accueil" },
  { id: "notre-histoire", label: "Notre Histoire" },
  { id: "galerie",        label: "Galerie" },
  { id: "programme",      label: "Programme" },
  { id: "lieux",          label: "Lieux" },
  { id: "dress-code",     label: "Tenue" },
  { id: "rsvp",           label: "RSVP" },
  { id: "livre-dor",      label: "Livre d'Or" },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState("accueil");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[400] flex flex-col items-center gap-3"
      aria-label="Navigation par sections"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative flex items-center justify-end group">
            {/* Tooltip label */}
            <motion.span
              animate={{
                opacity: hoveredDot === id ? 1 : 0,
                x: hoveredDot === id ? 0 : 6,
              }}
              transition={{ duration: 0.2 }}
              className="absolute right-7 whitespace-nowrap font-sans text-xs font-medium px-2 py-1 rounded-md pointer-events-none"
              style={{
                background: "rgba(134, 67, 126, 0.85)",
                color: "white",
                backdropFilter: "blur(6px)",
              }}
            >
              {label}
            </motion.span>

            {/* Dot */}
            <a
              href={`#${id}`}
              aria-label={label}
              onMouseEnter={() => setHoveredDot(id)}
              onMouseLeave={() => setHoveredDot(null)}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1 : 1,
                  backgroundColor: isActive
                    ? "#86437E"
                    : "transparent",
                  borderColor: isActive
                    ? "#86437E"
                    : "rgba(134, 67, 126, 0.5)",
                }}
                whileHover={{
                  scale: 1.3,
                  borderColor: "#86437E",
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full border"
                style={{
                  borderWidth: "1.5px",
                }}
              />
            </a>
          </div>
        );
      })}
    </nav>
  );
}
