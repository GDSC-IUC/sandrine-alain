"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const DAYS_OF_WEEK = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

// Pour Janvier 2027: commence un Vendredi (index 4)
const BLANKS_BEFORE = Array(4).fill(null);
const DAYS_IN_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
const ALL_CELLS = [...BLANKS_BEFORE, ...DAYS_IN_MONTH];

export default function CalendarWidget() {
  const WEDDING_DATE = 23;

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sandrine & Alain//Mariage//FR
BEGIN:VEVENT
UID:${new Date().getTime()}@sandrine-alain-mariage
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:20270123T100000Z
DTEND:20270123T180000Z
SUMMARY:Mariage de Sandrine & Alain
DESCRIPTION:Nous sommes très heureux de célébrer avec vous.
LOCATION:Cameroun
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mariage-sandrine-alain.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            
            {/* Horizontal divider below days */}
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

        <div className="w-full flex justify-center mt-6 z-10 relative">
            <button 
                onClick={generateICS}
                className="font-sans text-xs underline underline-offset-4 text-plum font-semibold tracking-wide hover:text-rose transition-colors cursor-pointer"
            >
                Ajouter au calendrier
            </button>
        </div>
      </GlassCard>
    </div>
  );
}
