"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";

const GALLERY_IMAGES = [
  { src: "/img-couple/couple-at-traditionnal-wedding.jpg", alt: "Mariage traditionnel", h: "h-80" },
  { src: "/img-couple/best-couple-at-ceremony.jpg", alt: "Cérémonie", h: "h-44" },
  { src: "/img-couple/beautiful-couple-in-blue.jpg", alt: "Sandrine & Alain élégants", h: "h-64" },
  { src: "/img-couple/couple-in-garden.jpeg", alt: "Dans le jardin", h: "h-52" },
  { src: "/img-couple/elegant-couple.jpg", alt: "Couple élégant", h: "h-72" },
  { src: "/img-couple/garden-photo-couple.jpeg", alt: "Photo dans le parc", h: "h-48" },
  { src: "/img-couple/image-of-couple.jpeg", alt: "Portrait", h: "h-64" },
  { src: "/img-couple/in-love-couple-ceremony.jpg", alt: "Amoureux lors de la cérémonie", h: "h-48" },
  { src: "/img-couple/love-couple.jpg", alt: "L'amour", h: "h-56" },
  { src: "/img-couple/smile-couple.jpeg", alt: "Sourire complice", h: "h-40" },
  { src: "/img-couple/valentine-day-couple.jpg", alt: "Jour spécial", h: "h-60" },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SectionWrapper id="galerie" gradient="rose">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-sans text-label-sm text-primary uppercase tracking-[0.3em] mb-3">Galerie</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-plum mb-4">
          Nos plus beaux instants
        </h2>
        <div className="floral-divider">
          <span className="text-rose text-xl">❀</span>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="masonry-grid">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div
            key={idx}
            className="masonry-item cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelected(idx)}
          >
            <div className={`relative ${img.h} w-full overflow-hidden rounded-xl`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(134,67,126,0.3)", backdropFilter: "blur(2px)" }}
              >
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{ background: "linear-gradient(135deg, rgba(219,119,155,0.3), transparent)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            style={{ background: "rgba(34,25,28,0.9)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative max-w-3xl w-full h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].alt}
                fill
                className="object-contain"
              />

              {/* Nav arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 glass text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }}
              >←</button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 glass text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % GALLERY_IMAGES.length); }}
              >→</button>

              <button
                className="absolute top-4 right-4 glass text-white w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer"
                onClick={() => setSelected(null)}
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
