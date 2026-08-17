"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "@/components/shared/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

// ─── Types ────────────────────────────────────────────────────
interface Entry {
  id?: string;
  _id?: string;
  authorName: string;
  message: string;
  createdAt: string;
}

const FormSchema = z.object({
  authorName: z.string().min(2, "Nom requis"),
  message: z.string().min(5, "Message trop court").max(500, "Max 500 caractères"),
});
type FormData = z.infer<typeof FormSchema>;

// ─── SVG Icons ────────────────────────────────────────────────
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const IconGift = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconPen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>
  </svg>
);

const IconLoader = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconNoteEmpty = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant opacity-40">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconWallet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconHeart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── Gift items ────────────────────────────────────────────────
const GIFT_ITEMS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "Nid d'amour",
    desc: "Participez à l'aménagement de leur nouveau foyer.",
    amount: "50 000 FCFA",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    title: "Lune de miel",
    desc: "Contribuez à leur voyage de noces de rêve.",
    amount: "100 000 FCFA",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    title: "Dîner romantique",
    desc: "Offrez-leur un dîner inoubliable à deux.",
    amount: "25 000 FCFA",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    title: "Souvenirs éternels",
    desc: "Un album photo professionnel de leur mariage.",
    amount: "30 000 FCFA",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Jardin paradisiaque",
    desc: "Aidez-les à créer leur espace de verdure.",
    amount: "15 000 FCFA",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    title: "Surprise des mariés",
    desc: "Laissez-les vous surprendre avec votre don libre.",
    amount: "Libre",
  },
];

const MOBILE_MONEY = [
  { operator: "MTN Mobile Money", number: "+237 6XX XXX XXX", color: "#FFCC00", textColor: "#22191C" },
  { operator: "Orange Money", number: "+237 6XX XXX XXX", color: "#FF6600", textColor: "white" },
];

// ─── Main Component ────────────────────────────────────────────
export default function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [boxState, setBoxState] = useState<'idle' | 'bursting' | 'revealed'>('idle');

  const handleOpenBox = () => {
    setBoxState('bursting');
    setTimeout(() => setBoxState('revealed'), 3000);
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    fetchEntries(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEntries = async (all: boolean) => {
    try {
      const res = await fetch(`/api/guestbook?all=${all}`);
      const data = await res.json();
      setEntries(data.entries ?? []);
      setTotal(data.total ?? 0);
    } catch {}
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      const newEntry: Entry = { ...json.entry, id: json.entry.id };
      setEntries((prev) => [newEntry, ...prev]);
      setTotal((prev) => prev + 1);
      reset();
    } catch {}
  };

  const handleShowAll = () => {
    setShowAll(true);
    fetchEntries(true);
  };

  return (
    <>
    <SectionWrapper id="livre-dor" gradient="lavender">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="font-sans text-label-sm text-primary uppercase tracking-[0.3em] mb-3">Partagez votre amour</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-plum mb-4">
          Livre d'Or & Cadeaux
        </h2>
        <div className="floral-divider"><span className="text-rose text-xl">❀</span></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ── GUESTBOOK ── */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-plum mb-2 flex items-center gap-2">
            <span className="text-primary"><IconBook /></span>
            Livre d'Or
          </h3>
          <p className="font-sans text-on-surface-variant text-sm mb-6">
            Laissez un message tendre pour Sandrine & Alain.
          </p>

          {/* Form */}
          <GlassCard className="p-6 mb-6" floral>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <label className="wedding-input-label font-sans text-label-sm text-on-surface-variant uppercase tracking-wider text-xs">
                  Votre nom
                </label>
                <input {...register("authorName")} className="wedding-input" placeholder="Marie Dupont" />
                {errors.authorName && <p className="text-error text-xs mt-1">{errors.authorName.message}</p>}
              </div>

              <div className="relative">
                <label className="wedding-input-label font-sans text-label-sm text-on-surface-variant uppercase tracking-wider text-xs">
                  Votre message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="wedding-input resize-none"
                  placeholder="Félicitations aux mariés ! Que votre amour rayonne pour l'éternité..."
                />
                {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <IconLoader />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <IconPen />
                    Déposer mon vœu
                  </>
                )}
              </button>
            </form>
          </GlassCard>

          {/* Entries list */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {entries.map((entry, idx) => (
                <motion.div
                  key={entry.id ?? entry._id ?? idx}
                  initial={{ opacity: 0, y: -20, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="p-5" hover>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #DB779B, #86437E)" }}
                      >
                        {entry.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-sans font-semibold text-plum text-sm">{entry.authorName}</p>
                          <p className="font-sans text-xs text-on-surface-variant">
                            {new Date(entry.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                        <p className="font-display italic text-on-surface-variant text-sm leading-relaxed">
                          "{entry.message}"
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

            {!showAll && total > entries.length && (
              <motion.div className="text-center pt-2">
                <button
                  onClick={handleShowAll}
                  className="btn-secondary text-sm flex items-center gap-2 mx-auto"
                >
                  <span>Voir tous les vœux</span>
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IconChevronDown />
                  </motion.span>
                  <span className="ml-1 text-xs text-on-surface-variant">({total} vœux)</span>
                </button>
              </motion.div>
            )}

            {entries.length === 0 && (
              <div className="text-center text-on-surface-variant font-sans text-sm py-8 flex flex-col items-center gap-3">
                <IconNoteEmpty />
                <p>Soyez le premier à laisser un message !</p>
              </div>
            )}
          </div>
        </div>

        {/* ── GIFT BOX ── */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-plum mb-2 flex items-center gap-2">
            <span className="text-primary"><IconGift /></span>
            Boîte Cadeau
          </h3>
          <p className="font-sans text-on-surface-variant text-sm mb-6">
            {boxState !== 'idle' ? "Choisissez une idée cadeau et contribuez via Mobile Money." : "Appuyez sur la boîte pour découvrir les idées cadeaux."}
          </p>

          <AnimatePresence mode="wait">
            {boxState === 'idle' && (
              /* ── Floating Gift Box ── */
              <motion.div
                key="gift-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ scale: [1, 1.5, 0], opacity: [1, 1, 0], transition: { duration: 1.2, times: [0, 0.55, 1], ease: "easeIn" } }}
                className="flex flex-col items-center justify-center py-6 cursor-pointer select-none relative"
                onClick={handleOpenBox}
              >
                {/* Confetti burst — renders during bursting, over the box position */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Orbiting mini gifts */}
                  {[
                    { angle: -25, dist: 110, delay: 0, size: 36 },
                    { angle: 30,  dist: 105, delay: 0.4, size: 28 },
                    { angle: 140, dist: 108, delay: 0.8, size: 32 },
                    { angle: 200, dist: 100, delay: 0.2, size: 24 },
                  ].map((orb, i) => {
                    const rad = (orb.angle * Math.PI) / 180;
                    const x = Math.cos(rad) * orb.dist * 0.5;
                    const y = Math.sin(rad) * orb.dist * 0.5;
                    return (
                      <motion.div
                        key={i}
                        className="absolute rounded-lg"
                        style={{
                          width: orb.size,
                          height: orb.size,
                          left: `calc(50% + ${x}px - ${orb.size / 2}px)`,
                          top: `calc(50% + ${y}px - ${orb.size / 2}px)`,
                          background: ["linear-gradient(135deg,#DB779B,#D9A1D4)", "linear-gradient(135deg,#D9A1D4,#86437E)", "linear-gradient(135deg,#A5A05A,#D9A1D4)", "linear-gradient(135deg,#86437E,#DB779B)"][i],
                          boxShadow: "0 4px 12px rgba(134,67,126,0.2)",
                        }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.5 + orb.delay, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
                      >
                        <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-[2px] bg-white/40" />
                        </div>
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                          <div className="h-full w-[2px] bg-white/40" />
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Main gift box */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative z-10 w-36 h-36 flex flex-col items-center justify-end"
                  >
                    {/* Lid */}
                    <div
                      className="absolute top-0 left-0 right-0 h-12 rounded-t-xl z-20"
                      style={{
                        background: "linear-gradient(135deg, #86437E 0%, #984063 100%)",
                        boxShadow: "0 -2px 12px rgba(134,67,126,0.3)",
                      }}
                    >
                      {/* Bow */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                        <div className="w-6 h-4 rounded-full" style={{ background: "#DB779B", transform: "rotate(-30deg)", transformOrigin: "right center" }} />
                        <div className="w-2 h-2 rounded-full z-10" style={{ background: "#DB779B" }} />
                        <div className="w-6 h-4 rounded-full" style={{ background: "#DB779B", transform: "rotate(30deg)", transformOrigin: "left center" }} />
                      </div>
                      <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center">
                        <div className="h-full w-3" style={{ background: "rgba(219,119,155,0.5)" }} />
                      </div>
                    </div>

                    {/* Box body */}
                    <div
                      className="w-full flex-1 mt-10 rounded-b-xl relative overflow-hidden"
                      style={{
                        background: "linear-gradient(160deg, #86437E 0%, #5b0f33 100%)",
                        boxShadow: "0 8px 32px rgba(134,67,126,0.35)",
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #DB779B 8px, transparent 8px), radial-gradient(circle at 70% 70%, #D9A1D4 6px, transparent 6px), radial-gradient(circle at 55% 20%, #DB779B 4px, transparent 4px)" }} />
                      <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center">
                        <div className="h-full w-3" style={{ background: "rgba(219,119,155,0.4)" }} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-sans text-sm text-on-surface-variant mt-2 tracking-wide"
                >
                  Appuyez pour ouvrir
                </motion.p>
              </motion.div>

            )}

            {/* ── Burst confetti overlay ── */}
            {boxState === 'bursting' && (
              <motion.div
                key="burst"
                className="relative flex items-center justify-center py-6"
                style={{ minHeight: 280 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Confetti particles radiating outward */}
                {Array.from({ length: 50 }).map((_, i) => {
                  const angle = (i / 50) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const dist = 100 + (i % 3) * 40;
                  const px = Math.cos(rad) * dist;
                  const py = Math.sin(rad) * dist;
                  const colors = ["#DB779B", "#D9A1D4", "#86437E", "#A5A05A", "#FFF8F8", "#984063"];
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-sm"
                      style={{
                        width: 7 + (i % 5),
                        height: 7 + (i % 4),
                        backgroundColor: colors[i % colors.length],
                        top: "50%",
                        left: "50%",
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.3, rotate: 0 }}
                      animate={{
                        x: px,
                        y: py,
                        opacity: 0,
                        scale: [0.3, 1.8, 0],
                        rotate: angle * 3,
                      }}
                      transition={{ duration: 2.4, ease: "easeOut", delay: 0.1 + i * 0.03 }}
                    />
                  );
                })}
              </motion.div>
            )}

            {boxState === 'revealed' && (
              /* ── Gift list revealed ── */
              <motion.div
                key="gift-list"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {GIFT_ITEMS.map((gift, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.4 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedGift(idx); setShowMoneyModal(true); }}
                      className={`
                        cursor-pointer rounded-xl p-4 transition-all duration-200 border
                        ${selectedGift === idx
                          ? "border-rose bg-rose/10 shadow-rose-glow"
                          : "border-outline-variant glass hover:border-rose/40"}
                      `}
                    >
                      <div className="text-primary mb-2">{gift.icon}</div>
                      <p className="font-sans font-semibold text-plum text-sm leading-tight">{gift.title}</p>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-snug">{gift.desc}</p>
                      <p className="font-sans font-bold text-rose text-sm mt-2">{gift.amount}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setSelectedGift(null); setShowMoneyModal(true); }}
                  className="btn-primary w-full justify-center py-3 flex items-center gap-2"
                >
                  <IconWallet />
                  Contribuer via Mobile Money
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </SectionWrapper>

      {/* ── Mobile Money Modal (portaled to body) ── */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showMoneyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
              style={{ background: "rgba(34,25,28,0.75)", backdropFilter: "blur(10px)" }}
              onClick={() => setShowMoneyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="p-8" floral>
                  {/* Close button */}
                  <button
                    onClick={() => setShowMoneyModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:text-plum hover:bg-surface-container transition-colors cursor-pointer"
                    aria-label="Fermer"
                  >
                    <IconClose />
                  </button>

                  <h4 className="font-display text-2xl font-bold text-plum mb-2 text-center">
                    {selectedGift !== null ? GIFT_ITEMS[selectedGift!].title : "Votre cadeau"}
                  </h4>

                  {selectedGift !== null && (
                    <>
                      <div className="flex justify-center mb-2 text-primary">
                        {GIFT_ITEMS[selectedGift!].icon}
                      </div>
                      <p className="font-sans text-sm text-on-surface-variant text-center mb-2">
                        {GIFT_ITEMS[selectedGift!].desc}
                      </p>
                      <p className="font-display font-bold text-primary text-xl text-center mb-6">
                        {GIFT_ITEMS[selectedGift!].amount}
                      </p>
                    </>
                  )}

                  <p className="font-sans text-sm text-on-surface-variant text-center mb-6">
                    Effectuez votre contribution via l'un des opérateurs ci-dessous :
                  </p>

                  <div className="space-y-3">
                    {MOBILE_MONEY.map((mm, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-xl p-4"
                        style={{ backgroundColor: mm.color, color: mm.textColor }}
                      >
                        <span><IconPhone /></span>
                        <div>
                          <p className="font-sans font-bold text-sm">{mm.operator}</p>
                          <p className="font-sans font-mono text-lg tracking-wider">{mm.number}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="font-sans text-xs text-on-surface-variant text-center mt-4 flex items-center justify-center gap-1">
                    Merci de mentionner votre nom lors du transfert.{" "}
                    <span className="text-rose"><IconHeart /></span>
                  </p>

                  <button onClick={() => setShowMoneyModal(false)} className="btn-secondary w-full justify-center mt-6">
                    Fermer
                  </button>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </>
  );
}
