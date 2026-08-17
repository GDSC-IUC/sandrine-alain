"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  gradient?: "blush" | "rose" | "lavender" | "none";
}

const gradients = {
  blush: "bg-gradient-to-b from-[#FFF8F8] via-[#faeaed] to-[#FFF8F8]",
  rose: "bg-gradient-to-b from-[#faeaed] via-[#fdc2f7]/20 to-[#faeaed]",
  lavender: "bg-gradient-to-b from-[#FFF8F8] via-[#efdfe1] to-[#FFF8F8]",
  none: "",
};

export default function SectionWrapper({ id, children, className = "", gradient = "none" }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding relative overflow-hidden flex flex-col items-center w-full ${gradients[gradient]} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative z-10 mx-auto"
        style={{ maxWidth: "1120px" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
