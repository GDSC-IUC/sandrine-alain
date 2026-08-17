"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [envelopeHidden, setEnvelopeHidden] = useState(false);

  // Bloquer le scroll tant que l'enveloppe est visible
  useEffect(() => {
    if (!envelopeHidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [envelopeHidden]);

  const handleOpenEnvelope = () => {
    if (envelopeOpened) return;
    setEnvelopeOpened(true);

    // D'après le code utilisateur, l'enveloppe disparaît et le scroll est réactivé après 2.4s
    setTimeout(() => {
      setEnvelopeHidden(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("envelope-opened"));
      }
    }, 2400);
  };

  return (
    <>
      {/* ── ENVELOPPE GLOBALE OVERLAY ── */}
      <div
        className={`envelope-overlay ${envelopeHidden ? "hidden" : ""}`}
        id="envelopeOverlay"
        role="dialog"
        aria-label="Invitation"
      >
        <div className={`envelope-wrapper ${envelopeOpened ? "opened" : ""}`} id="envelopeWrapper">
          <div className="envelope-body"></div>
          <div className="envelope-flap"></div>
          <div className="envelope-seal"></div>
          <div className="envelope-card-inner">
            <p
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                color: "#86437E",
                fontSize: "17px",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              Sandrine & Alain Duclot
              <br />
              <span style={{ fontSize: "13px", fontStyle: "normal", opacity: 0.6, fontFamily: "DM Sans, sans-serif" }}>
                vous invitent à leur mariage
              </span>
              <br />
              <span style={{ fontSize: "14px", fontStyle: "normal", opacity: 0.8, fontFamily: "DM Sans, sans-serif", fontWeight: 500, marginTop: "8px", display: "inline-block" }}>
                23 Janvier 2027
              </span>
            </p>
          </div>
        </div>

        <button
          className="open-btn"
          id="openBtn"
          aria-label="Ouvrir l'invitation"
          onClick={handleOpenEnvelope}
          style={{
            opacity: envelopeOpened ? 0 : 1,
            pointerEvents: envelopeOpened ? "none" : "auto",
          }}
        >
          Ouvrir l'invitation
        </button>
      </div>

      {/* ── CONTENU PRINCIPAL (HERO) ── */}
      <section
        id="accueil"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          opacity: envelopeHidden ? 1 : 0,
          transition: "opacity 1.2s ease",
          background: "linear-gradient(180deg, #683c61 0%, #9b5185 45%, #ca7395 100%)",
        }}
      >
        {/* Cercles fins graphiques en background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40" aria-hidden>
          <div className="absolute w-[700px] h-[700px] rounded-full border-[0.5px] border-white/20 -translate-x-[40%]" />
          <div className="absolute w-[700px] h-[700px] rounded-full border-[0.5px] border-white/20 translate-x-[40%]" />
        </div>

        {/* Top floral decoration left (Comme demandé) */}
        <div className="absolute top-0 left-0 pointer-events-none opacity-40">
          <svg className="w-64 h-64" viewBox="0 0 200 200">
            <path d="M-20 -20 Q50 150 150 50" stroke="#FFF8F8" strokeWidth="0.5" fill="none" />
            <ellipse cx="60" cy="50" rx="4" ry="8" fill="#FFF8F8" opacity="0.5" transform="rotate(30 60 50)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center text-white px-5">
          {/* Surtitre */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={envelopeHidden ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 font-medium"
          >
            NOUS NOUS MARIONS
          </motion.p>

          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeHidden ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ marginTop: "40px" }}
            className="flex flex-col items-center leading-none"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-2">
              Les gardiens
            </h1>
            <h2 className="font-display text-5xl md:text-7xl italic font-normal">
              d'une promesse
            </h2>
          </motion.div>

          {/* Séparateur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={envelopeHidden ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ marginTop: "56px", marginBottom: "56px" }}
            className="flex items-center gap-6"
          >
            <div className="h-[1px] w-20 bg-white/20" />
            <div className="w-2.5 h-2.5 rotate-45 border-[0.5px] border-white/60 flex items-center justify-center">
              <div className="w-1 h-1 bg-white/60 rounded-full" />
            </div>
            <div className="h-[1px] w-20 bg-white/20" />
          </motion.div>

          {/* Noms et date */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={envelopeHidden ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h3 className="font-display text-4xl md:text-5xl text-white" style={{ marginBottom: "20px" }}>
              Sandrine & Alain Duclot
            </h3>
            <p className="font-sans text-[13px] md:text-sm uppercase tracking-[0.3em] text-white/90 font-medium">
              23 JANVIER 2027
            </p>
          </motion.div>

          {/* Compte à rebours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeHidden ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            style={{ marginTop: "60px" }}
          >
            <HeroCountdown />
          </motion.div>

        </div>

        {/* Indicateur de scroll — épinglé en bas de la section */}
        <motion.a
          href="#notre-histoire"
          initial={{ opacity: 0 }}
          animate={envelopeHidden ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors z-10"
        >
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </motion.a>
      </section>
    </>
  );
}

// Composant Countdown spécifique au Hero 
function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    jours: 163,
    heures: 18,
    minutes: 38,
    secondes: 11,
  });

  useEffect(() => {
    const target = new Date("2027-01-23T10:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
        return;
      }

      setTimeLeft({
        jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
        heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        secondes: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-8 md:gap-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-20 h-28 md:w-[105px] md:h-[115px] rounded-2xl md:rounded-[20px]"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <span className="font-display font-bold text-4xl md:text-[44px] text-white tracking-wide">
            {value.toString()}
          </span>
          <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/90 mt-1 md:mt-2 font-medium">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
