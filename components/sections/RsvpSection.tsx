"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SectionWrapper from "@/components/shared/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import CalendarWidget from "@/components/ui/CalendarWidget";

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().min(8, "Numéro requis"),
  attending: z.enum(["true", "false"]),
});

type FormData = z.infer<typeof FormSchema>;

interface RsvpResult {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  tableNumber: number | null;
  qrCode: string;
}

// ── Confetti animation ──────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: ["#DB779B", "#D9A1D4", "#A5A05A", "#FFF8F8", "#86437E"][i % 5],
          }}
          animate={{
            y: ["0%", "110%"],
            x: [(Math.random() - 0.5) * 200],
            rotate: [0, 720],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: Math.random() * 0.5,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function RsvpSection() {
  const [result, setResult] = useState<RsvpResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [guestType, setGuestType] = useState<"single" | "couple" | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const attending = watch("attending");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      let finalFirstName = "";
      let finalLastName = "";

      if (guestType === "couple") {
        finalFirstName = "M. & Mme.";
        finalLastName = (data as any).coupleFamilyName || "";
        if (!finalLastName) {
          throw new Error("Veuillez renseigner le nom de famille.");
        }
      } else {
        finalFirstName = data.firstName || "";
        finalLastName = data.lastName || "";
        if (!finalFirstName && !finalLastName) {
          throw new Error("Veuillez renseigner votre prénom et nom.");
        }
      }


      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            firstName: finalFirstName, 
            lastName: finalLastName,
            email: data.email || "no-email@rsvp.local",
            phone: data.phone,
            attending: data.attending === "true",
            guestCount: 1,
            dietaryReq: "Aucun"
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur");
      setResult(json.guest);
      if (json.guest.attending) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="rsvp" gradient="blush">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-sans text-label-sm text-primary uppercase tracking-[0.3em] mb-3">Confirmez votre présence</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-plum mb-4">RSVP</h2>
        <div className="floral-divider"><span className="text-rose text-xl">❀</span></div>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-xl mx-auto">
          Votre réponse nous aidera à préparer chaque détail pour vous accueillir dans les meilleures conditions.
        </p>
      </div>

      <div className="mb-16">
         <CalendarWidget />
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <GlassCard className="p-8 md:p-10" floral>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Guest Type Selector */}
                  <div>
                    <p className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider mb-4 text-center">
                      Vous participerez :
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button" 
                        onClick={() => setGuestType('single')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 cursor-pointer ${guestType === 'single' ? 'bg-rose/10 border-rose text-plum shadow-inner' : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-rose/50'}`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span className="font-sans font-semibold text-sm">Seul(e)</span>
                      </button>
                      <button 
                         type="button" 
                         onClick={() => setGuestType('couple')}
                         className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 cursor-pointer ${guestType === 'couple' ? 'bg-rose/10 border-rose text-plum shadow-inner' : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-rose/50'}`}
                      >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                         <span className="font-sans font-semibold text-sm">En Couple</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {guestType && (
                      <motion.div
                        key="form-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-8 overflow-hidden"
                      >
                          {/* Name row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            {guestType === 'single' ? (
                                <>
                                  <FormField label="Prénom">
                                    <input {...register("firstName")} className="wedding-input" placeholder="Sandrine" />
                                  </FormField>
                                  <FormField label="Nom">
                                    <input {...register("lastName")} className="wedding-input" placeholder="Duclot" />
                                  </FormField>
                                </>
                            ) : (
                                <div className="md:col-span-2">
                                  <FormField label="Nom du couple">
                                    <div className="relative flex items-center">
                                      <span className="absolute left-4 text-on-surface-variant font-sans text-sm pointer-events-none font-semibold">M. & Mme.</span>
                                      <input {...register("coupleFamilyName" as never)} className="wedding-input pl-[90px] w-full" placeholder="Tchoungo" />
                                    </div>
                                  </FormField>
                                </div>
                            )}
                          </div>

                          {/* Email / Phone */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Téléphone" error={errors.phone?.message}>
                              <input {...register("phone")} className="wedding-input" placeholder="+237 6XX XXX XXX" />
                            </FormField>
                            <FormField label="Email (Optionnel)">
                              <input {...register("email")} type="email" className="wedding-input" placeholder="vous@mail.com" />
                            </FormField>
                          </div>

                          {/* Attending */}
                          <div>
                            <p className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
                              Serez-vous présent(e)(s) ?
                            </p>
                            <div className="flex gap-4">
                              <label className={`
                                flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border transition-all duration-200 font-sans text-sm
                                ${attending === 'true'
                                  ? "border-rose bg-rose/10 text-plum font-semibold"
                                  : "border-outline-variant bg-transparent text-on-surface-variant hover:border-rose/50"}
                              `}>
                                <input {...register("attending")} type="radio" value="true" className="sr-only" />
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={attending === 'true' ? "text-rose" : "text-on-surface-variant"}><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Oui, avec joie !
                              </label>

                              <label className={`
                                flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border transition-all duration-200 font-sans text-sm
                                ${attending === 'false'
                                  ? "border-rose bg-rose/10 text-plum font-semibold"
                                  : "border-outline-variant bg-transparent text-on-surface-variant hover:border-rose/50"}
                              `}>
                                <input {...register("attending")} type="radio" value="false" className="sr-only" />
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={attending === 'false' ? "text-rose" : "text-on-surface-variant"}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                Ce sera sans {guestType === 'single' ? "moi" : "nous"}
                              </label>
                            </div>
                            {errors.attending && <p className="text-error text-xs mt-1">{errors.attending.message}</p>}
                          </div>



                          {/* Error */}
                          {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="p-4 rounded-xl bg-error/10 border border-error/20 text-error font-sans text-sm">
                              ⚠️ {error}
                            </motion.div>
                          )}

                          {/* Submit */}
                          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 mt-6">
                            {loading ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                            ) : (
                                <>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                  </svg>
                                  Envoyer ma réponse
                                </>
                            )}
                          </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="pass"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <Confetti active={showConfetti} />
              <DigitalPass guest={result} flipped={cardFlipped} onFlip={() => setCardFlipped(!cardFlipped)} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center font-sans text-sm text-on-surface-variant mt-4"
              >
                ✨ Cliquez sur la carte pour voir votre QR code
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <label className="wedding-input-label font-sans text-label-sm text-on-surface-variant uppercase tracking-wider text-xs">
        {label}
      </label>
      {children}
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}

function DigitalPass({ guest, flipped, onFlip }: { guest: RsvpResult; flipped: boolean; onFlip: () => void }) {
  return (
    <div className="pass-card w-full max-w-sm mx-auto h-72 cursor-pointer" onClick={onFlip}>
      <div className={`pass-card-inner ${flipped ? "flipped" : ""} h-full`}>
        {/* FRONT */}
        <div className="pass-card-front h-full">
          <div
            className="h-full rounded-2xl overflow-hidden p-8 flex flex-col justify-between relative"
            style={{
              background: "linear-gradient(135deg, rgba(255,248,248,0.9) 0%, rgba(250,234,237,0.9) 50%, rgba(253,194,247,0.7) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 25px 80px rgba(134,67,126,0.2)",
            }}
          >
            {/* Top decoration */}
            <div>
              <p className="font-sans text-label-sm text-primary uppercase tracking-widest">Invitation Officielle</p>
              <h3 className="font-display text-2xl font-bold text-gradient-plum mt-1 line-clamp-2 leading-tight">
                {guest.firstName} {guest.lastName}
              </h3>
            </div>

            <div className="text-center my-2">
              <p className="font-display text-rose text-base italic">"Les Gardiens d'une Promesse"</p>
              <p className="font-sans text-xs text-plum mt-1">Sandrine & Alain Duclot</p>
              <p className="font-sans text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">23 Janvier 2027 · Bafoussam</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">Table</p>
                <p className="font-display text-xl font-bold text-plum">
                  {guest.tableNumber ?? "À confirmer"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">Accès</p>
                <p className="font-sans text-xs font-semibold" style={{ color: guest.attending ? "#A5A05A" : "#ba1a1a" }}>
                  {guest.attending ? "✓ Confirmé" : "Absent(e)"}
                </p>
              </div>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
              style={{ background: "linear-gradient(90deg, #DB779B, #D9A1D4, #86437E)" }} />
          </div>
        </div>

        {/* BACK — QR Code */}
        <div className="pass-card-back h-full">
          <div
            className="h-full rounded-2xl overflow-hidden p-8 flex flex-col items-center justify-center gap-4 relative"
            style={{
              background: "linear-gradient(135deg, #86437E 0%, #984063 50%, #DB779B 100%)",
              boxShadow: "0 25px 80px rgba(134,67,126,0.3)",
            }}
          >
            <p className="font-sans text-label-sm text-white/70 uppercase tracking-widest">Votre Passe d'Accès</p>
            {guest.qrCode && (
              <div className="p-3 bg-white rounded-xl shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={guest.qrCode} alt="QR Code" className="w-40 h-40 rounded-lg" />
              </div>
            )}
            <p className="font-sans text-white/60 text-xs text-center">
              Présentez ce QR code à l'entrée
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[4px] rounded-b-2xl"
              style={{ background: "linear-gradient(90deg, #FFF8F8, rgba(255,248,248,0.4), #FFF8F8)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
