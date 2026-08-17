"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    period: "Été 2019",
    title: "La première rencontre",
    desc: "Un après-midi ordinaire qui allait changer nos vies à jamais. Un regard croisé, un sourire timide, et le monde s'est arrêté de tourner autour de nous.",
  },
  {
    period: "Automne 2019",
    title: "Le premier rendez-vous",
    desc: "Un café qui a duré quatre heures. Les mots coulaient naturellement, comme si nos âmes se reconnaissaient depuis toujours. Nous savions déjà.",
  },
  {
    period: "Été 2021",
    title: "Le voyage qui a tout scellé",
    desc: "Sous le ciel étoilé de la Toscane, nous avons murmuré nos promesses. Ce voyage n'était pas une simple escapade — c'était le début de notre engagement.",
  },
  {
    period: "Décembre 2025",
    title: "La demande en mariage",
    desc: "Au pied d'un arbre centenaire, dans le jardin de nos premiers pas ensemble, Alain a posé la question. Sandrine a dit oui avant même qu'il ne finisse sa phrase.",
  },
  {
    period: "23 Janvier 2027",
    title: "Le grand jour",
    desc: "Nous devenons les gardiens d'une promesse. Entourés de ceux que nous aimons, nous scellerons notre amour pour l'éternité.",
  },
];

export default function OurStorySection() {
  return (
    <section id="notre-histoire" className="py-20 sm:py-28 px-4 flex flex-col items-center w-full" style={{ backgroundColor: "#faeaed" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Conteneur principal de la timeline */
        .timeline-custom {
            position: relative;
            padding-left: 2rem;
        }

        /* Ligne verticale */
        .timeline-custom::before {
            content: '';
            position: absolute;
            left: 7px;
            top: 8px;
            bottom: 8px;
            width: 2px;
            background: linear-gradient(
                180deg,
                #DB779B, /* wp = rose */
                #86437E, /* wp = plum */
                #A5A05A  /* wo = olive */
            );
            border-radius: 2px;
        }

        /* Chaque élément de l'histoire */
        .timeline-item-custom {
            position: relative;
            margin-bottom: 2.5rem;
        }

        /* Les points sur la ligne */
        .timeline-dot-custom {
            position: absolute;
            left: -2rem;
            top: 6px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid #86437E; /* primary plum */
            background: white;
            z-index: 1;
            transition: background 0.3s, transform 0.3s;
        }

        /* Animation au survol */
        .timeline-item-custom:hover .timeline-dot-custom {
            background: #86437E;
            transform: scale(1.3);
        }

        /* Réduction de la ligne de séparation florale */
        .floral-divider-custom {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        .floral-divider-custom .line {
            height: 1px;
            width: 80px; 
            background: linear-gradient(90deg, transparent, rgba(217, 161, 212, 0.6), transparent);
        }
      `}} />

      <div className="w-full" style={{ maxWidth: "768px" }}>

        {/* TITRE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3 text-[#A5A05A]">
            Comment tout a commencé
          </p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#86437E]">
            Notre Histoire
          </h2>

          <div className="floral-divider-custom">
            <span className="line"></span>
            <span className="text-[#DB779B] text-xl">♥</span>
            <span className="line"></span>
          </div>
        </motion.div>

        {/* TIMELINE */}
        <div className="timeline-custom">
          {MILESTONES.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="timeline-item-custom"
            >
              <div className="timeline-dot-custom"></div>

              <p className="font-sans text-xs tracking-[0.2em] uppercase mb-1 text-[#A5A05A]">
                {milestone.period}
              </p>

              <h3 className="font-display text-xl font-semibold mb-2 text-[#86437E]">
                {milestone.title}
              </h3>

              <p className="font-sans text-sm leading-relaxed" style={{ color: "#7A5D75" }}>
                {milestone.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
