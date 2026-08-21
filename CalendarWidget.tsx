"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const DAYS_OF_WEEK = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

// Pour Janvier 2027: commence un Vendredi (index 4)
const BLANKS_BEFORE = Array(4).fill(null);
const DAYS_IN_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
const ALL_CELLS = [...BLANKS_BEFORE, ...DAYS_IN_MONTH];

// Event details
const EVENT = {
  title: "Mariage de Sandrine & Alain",
  description: "Nous sommes très heureux de célébrer avec vous.",
  location: "Bafoussam, Cameroun",
  // 23 Jan 2027, 10h–18h UTC+1 → UTC times
  startUTC: "20270123T090000Z",
  endUTC: "20270123T170000Z",
};

function buildGoogleUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.title,
    dates: `${EVENT.startUTC}/${EVENT.endUTC}`,
    details: EVENT.description,
    location: EVENT.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookUrl() {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: EVENT.title,
    startdt: "2027-01-23T10:00:00+01:00",
    enddt: "2027-01-23T18:00:00+01:00",
    body: EVENT.description,
    location: EVENT.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function buildYahooUrl() {
  const params = new URLSearchParams({
    v: "60",
    title: EVENT.title,
    st: "20270123T090000Z",
    et: "20270123T170000Z",
    desc: EVENT.description,
    in_loc: EVENT.location,
  });
  return `https://calendar.yahoo.com/?${params.toString()}`;
}

const CALENDAR_OPTIONS = [
  {
    id: "google",
    label: "Google Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    getUrl: buildGoogleUrl,
  },
  {
    id: "outlook",
    label: "Outlook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect width="24" height="24" rx="3" fill="#0078D4"/>
        <path d="M13 5v14h7V5h-7z" fill="#50E6FF" fillOpacity="0.5"/>
        <path d="M4 7h9v10H4z" fill="white"/>
        <path d="M8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#0078D4"/>
      </svg>
    ),
    getUrl: buildOutlookUrl,
  },
  {
    id: "yahoo",
    label: "Yahoo Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#6001D2">
        <path d="M15.04 2l-3.53 6.78L8.07 2H2l7.47 13.13V22h4.16v-6.87L21 2h-5.96z"/>
      </svg>
    ),
    getUrl: buildYahooUrl,
  },
];

export default function CalendarWidget() {
  const WEDDING_DATE = 23;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <GlassCard className="p-6 md:p-8 !bg-[#FFF8F8] !border-none !shadow-glass relative overflow-hidden">
        {/* Subtle decorative background heart */}
        <div className="absolute -top-6 -right-6 opacity-[0.03] scale-150 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#86437E">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Header Month/Year */}
        <div className="text-center mb-6 relative z-10">
          <h4 className="font-display text-2xl md:text-3xl text-plum italic mb-4">Janvier 2027</h4>

          <div className="w-full h-[1px] bg-outline-variant/50 relative mb-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-plum"></div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider py-1">
                {day}
              </div>
            ))}

            <div className="col-span-7 h-[1px] bg-outline-variant/30 my-2"></div>

            {ALL_CELLS.map((day, idx) => {
              const isWeddingDay = day === WEDDING_DATE;
              return (
                <div key={idx} className="relative aspect-square flex items-center justify-center p-1">
                  {day && (
                    <>
                      {isWeddingDay ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                          className="relative w-full h-full flex items-center justify-center -translate-y-[1px]"
                        >
                          <svg className="absolute w-[120%] h-[120%] text-plum" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span className="relative z-10 text-white font-bold text-xs">{day}</span>
                        </motion.div>
                      ) : (
                        <span className="font-sans text-sm text-on-surface hover:font-bold transition-all cursor-default">
                          {day}
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add to Calendar dropdown */}
        <div className="w-full flex justify-center mt-6 z-10 relative" ref={ref}>
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 font-sans text-xs underline underline-offset-4 text-plum font-semibold tracking-wide hover:text-rose transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="8" y1="14" x2="10" y2="16" strokeWidth="1.5"/>
                <line x1="10" y1="16" x2="14" y2="12" strokeWidth="1.5"/>
              </svg>
              Ajouter au calendrier
              <svg
                viewBox="0 0 24 24"
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 rounded-xl bg-white shadow-[0_8px_30px_rgba(134,67,126,0.15)] border border-plum/10 overflow-hidden z-50"
                >
                  {CALENDAR_OPTIONS.map((opt, i) => (
                    <a
                      key={opt.id}
                      href={opt.getUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-sans font-medium text-on-surface hover:bg-plum/5 hover:text-plum transition-colors ${i !== 0 ? "border-t border-outline-variant/30" : ""}`}
                    >
                      {opt.icon}
                      {opt.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
