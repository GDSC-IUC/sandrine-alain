"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

const VENUES = [
  {
    id: "ceremonie",
    label: "Cérémonie & Cocktail",
    name: "Paroisse Sacré-Cœur & Jardin",
    time: "10h00 & 13h00", // Combined time
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6"/><path d="M9 5h6"/><path d="M4 14v8"/><path d="M20 14v8"/><path d="M4 14l8-6 8 6"/><path d="M10 22v-4a2 2 0 0 1 4 0v4"/>
      </svg>
    ),
    address: "Ndiandam, Bafoussam, Cameroun",
    description: "Notre union sacrée sera célébrée à la Paroisse Sacré-Cœur. Le cocktail d'accueil se tiendra ensuite juste à côté, dans les jardins fleuris de l'église.",
    gmapQuery: "Paroisse+Sacre+Coeur+Ndiandam+Bafoussam+Cameroun",
    iconColor: "#984063",
    iframe: "https://maps.google.com/maps?q=5.4766,10.4191&z=16&output=embed", // Defaulting to the church
  },
  {
    id: "soiree",
    label: "Soirée de Gala",
    name: "Salle de Fête St-François",
    time: "18h00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    address: "Place Saint François, Bafoussam, Cameroun",
    description: "La soirée se poursuivra avec un dîner de gala inoubliable dans une ambiance chaleureuse et lumineuse.",
    gmapQuery: "PLACE+SAINT+FRANCOIS+BAFOUSSAM",
    iconColor: "#894681",
    iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13358.709392568237!2d10.4469500217188!3d5.482280306368734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f853f0623c2eb%3A0x3742737c531837e1!2sPLACE%20SAINT%20FRANCOIS%20BAFOUSSAM!5e0!3m2!1sde!2scm!4v1786616726936!5m2!1sde!2scm",
  },
];

export default function VenueSection() {
  const [activeVenue, setActiveVenue] = useState(0);
  const venue = VENUES[activeVenue];

  return (
    <SectionWrapper id="lieux" gradient="rose">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-sans text-label-sm text-primary uppercase tracking-[0.3em] mb-3">Où nous retrouver</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-plum mb-4">
          Les Lieux de Célébration
        </h2>
        <div className="floral-divider">
          <span className="text-rose text-xl">❀</span>
        </div>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-xl mx-auto">
          Deux lieux, une seule journée de bonheur et d'amour à Bafoussam.
        </p>
      </div>

      {/* Venue tabs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        {VENUES.map((v, idx) => (
          <button
            key={v.id}
            onClick={() => setActiveVenue(idx)}
            className={`
              relative px-8 py-3 rounded-full font-sans font-semibold text-sm transition-all duration-300 cursor-pointer
              flex items-center justify-center gap-3
              ${activeVenue === idx
                ? "text-white shadow-glass-lg"
                : "text-on-surface-variant glass hover:shadow-glass"
              }
            `}
            style={activeVenue === idx ? {
              background: `linear-gradient(135deg, ${v.iconColor}cc, ${v.iconColor})`,
            } : {}}
          >
            <span className="flex items-center justify-center">{v.icon}</span>
            <span className="text-base">{v.label}</span>
            {activeVenue === idx && (
              <motion.div
                layoutId="venue-indicator"
                className="absolute inset-0 rounded-full -z-10"
                style={{ background: `linear-gradient(135deg, ${v.iconColor}cc, ${v.iconColor})` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active venue content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVenue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-start">
            {/* Info card */}
            <GlassCard className="p-8 md:p-10" floral>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm"
                style={{ background: `${venue.iconColor}15`, border: `2px solid ${venue.iconColor}30`, color: venue.iconColor }}
              >
                {venue.icon}
              </div>

              <div className="mb-2">
                <span className="font-sans text-label-sm uppercase tracking-widest font-semibold"
                  style={{ color: venue.iconColor }}>
                  {venue.time}
                </span>
              </div>
              <h3 className="font-display text-3xl font-bold text-plum mb-3">{venue.name}</h3>
              <p className="font-sans text-base text-primary flex items-center gap-2 mb-5 font-semibold">
                <span>📍</span> {venue.address}
              </p>
              <p className="font-sans text-body-lg text-on-surface-variant mb-8 leading-relaxed">{venue.description}</p>

              {/* Direction button */}
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.gmapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm px-6 py-3 w-fit"
                >
                  🗺️ Ouvrir dans Google Maps
                </a>
              </div>
            </GlassCard>

            {/* Google Maps embed column */}
            <div className="flex flex-col h-full flex-grow rounded-3xl overflow-hidden glass shadow-glass p-2 bg-white/40">
              <iframe
                src={venue.iframe}
                className="w-full min-h-[400px] h-full rounded-2xl border-0 shadow-inner"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Maps — ${venue.name}`}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick overview all venues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 gap-6 max-w-2xl mx-auto text-center"
      >
        {VENUES.map((v) => (
          <GlassCard key={v.id} className="p-6" hover>
            <div className="flex justify-center mb-3" style={{ color: v.iconColor }}>{v.icon}</div>
            <p className="font-sans font-semibold text-base text-plum mb-1">{v.time}</p>
            <p className="font-sans text-sm text-on-surface-variant font-medium">{v.label}</p>
          </GlassCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
