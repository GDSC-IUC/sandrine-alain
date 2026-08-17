"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleEnvelopeOpened = () => {
      if (audioRef.current && !hasStarted) {
        audioRef.current.volume = 0.5; // Volume modéré (50%)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasStarted(true);
            })
            .catch((err) => {
              console.warn("La lecture automatique audio a été bloquée par le navigateur.", err);
              // Fallback au cas où le navigateur bloque tout de même
              setHasStarted(true);
              setIsPlaying(false);
            });
        }
      }
    };

    window.addEventListener("envelope-opened", handleEnvelopeOpened);
    return () => window.removeEventListener("envelope-opened", handleEnvelopeOpened);
  }, [hasStarted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!isClient) return null;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        // Fichier hébergé localement pour contourner les protections CORS et de lecture
        src="/music/Ed_Sheeran_-_Photograph_ScaryBeatz.com.mp3"
      />

      {createPortal(
        <AnimatePresence>
          {hasStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={togglePlay}
              className="fixed bottom-[96px] right-6 z-[990] w-12 h-12 md:w-14 md:h-14 rounded-full bg-plum border border-rose/30 flex items-center justify-center shadow-glass cursor-pointer overflow-hidden group hover:scale-105 transition-transform"
              aria-label={isPlaying ? "Mettre en pause la musique" : "Reprendre la musique"}
              style={{ boxShadow: "0 8px 32px rgba(134, 67, 126, 0.4)" }}
            >
              <div className="flex items-end justify-center gap-[3px] w-5 h-5 md:w-6 md:h-6">
                {[1, 2, 3, 4].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-[3px] md:w-1 bg-[#FFF8F8] rounded-t-sm"
                    initial={{ height: "20%" }}
                    animate={
                      isPlaying
                        ? {
                            height: ["20%", "90%", "40%", "100%", "30%"],
                          }
                        : { height: "20%" }
                    }
                    transition={
                      isPlaying
                        ? {
                            duration: 0.8 + bar * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: bar * 0.1,
                          }
                        : { duration: 0.3 }
                    }
                  />
                ))}
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
