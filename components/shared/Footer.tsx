"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-background overflow-hidden border-t border-outline-variant/30 flex flex-col items-center w-full">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-t-full opacity-20 blur-3xl float-anim"
          style={{ background: "radial-gradient(ellipse at bottom, #9b5185, transparent)" }}
        />
      </div>

      <div 
        className="w-full relative z-10 px-5 pt-20 pb-12 flex flex-col items-center text-center mx-auto"
        style={{ maxWidth: "1120px" }}
      >
        {/* Logo / Initials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-28 h-28 rounded-full glass flex items-center justify-center mb-6 shadow-glass"
          style={{ background: "linear-gradient(135deg, rgba(239,223,225,0.5), rgba(250,234,237,0.8))" }}
        >
          <span className="font-display font-bold text-5xl text-gradient-rose">S&A</span>
        </motion.div>

        <h2 className="font-display text-2xl md:text-3xl text-plum mb-3">
          Nous vous attendons avec impatience.
        </h2>
        
        <p className="font-sans text-on-surface-variant mb-10 max-w-md">
          Merci de partager avec nous la joie de ce nouvel engagement. Votre présence est notre plus beau cadeau.
        </p>

        <div className="floral-divider w-full max-w-xs mb-10">
          <span className="text-rose text-sm">❀ ❀ ❀</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-sans text-xs text-on-surface-variant uppercase tracking-widest text-center">
          <p>© 2026 Sandrine & Alain</p>
          <span className="hidden md:block w-1 h-1 rounded-full bg-outline-variant" />
          <p>Les Gardiens d'une Promesse</p>
          <span className="hidden md:block w-1 h-1 rounded-full bg-outline-variant" />
          <p>Bafoussam, Cameroun</p>
        </div>
      </div>
    </footer>
  );
}
