"use client";

import { motion } from "framer-motion";

const PROGRAM_DATA = [
  {
    id: "ceremony",
    title: "Cérémonie religieuse",
    time: "15h00 — Église Saint-Jean-Baptiste",
    desc: "Nous vous convions à partager ce moment sacré où nous échangerons nos vœux devant Dieu et nos proches. La cérémonie sera suivie d'un lâcher de pétales sur le parvis de l'église.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6"/><path d="M9 5h6"/><path d="M4 14v8"/><path d="M20 14v8"/><path d="M4 14l8-6 8 6"/><path d="M10 22v-4a2 2 0 0 1 4 0v4"/>
      </svg>
    ),
    headerClass: "ceremony-header",
    iconClass: "ceremony-icon"
  },
  {
    id: "cocktail",
    title: "Cocktail",
    time: "17h00 — Jardins du Domaine de la Roseraie",
    desc: "Après la cérémonie, retrouvons-nous dans les jardins pour un cocktail d'accueil. Des saveurs raffinées, de bons moments partagés et une ambiance chaleureuse pour célébrer cette journée ensemble.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 5 6 5"/><path d="M7 5 7 12 11 16 11 20 8 20"/><path d="M17 5 17 12 13 16 13 20 16 20"/><path d="M11 16 13 16"/>
      </svg>
    ),
    headerClass: "cocktail-header",
    iconClass: "cocktail-icon"
  },
  {
    id: "reception",
    title: "Réception & Soirée",
    time: "19h30 — Salle des Fêtes du Domaine",
    desc: "Le dîner sera servi dans la grande salle, suivi d'une soirée dansante jusqu'au bout de la nuit. Musique, danse, émotions et souvenirs seront au rendez-vous pour terminer cette magnifique journée.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    headerClass: "reception-header",
    iconClass: "reception-icon"
  }
];

export default function ProgramSection() {
  return (
    <section id="program" className="flex flex-col items-center w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --rose: #DB779B;
            --lavender: #D9A1D4;
            --plum: #86437E;
            --olive: #A5A05A;
            --cream: #FFF8F8; /* Harmonisé avec le fond du site */
        }

        #program {
            position: relative;
            padding: 96px 16px;
            overflow: hidden;
            width: 100%;
            background: linear-gradient(
                180deg,
                var(--cream) 0%,
                #faeaed 50%,
                var(--cream) 100%
            );
        }

        .program-container {
            width: 100%;
            max-width: 768px;
            margin-left: auto !important;
            margin-right: auto !important;
            position: relative;
            z-index: 10;
        }

        .program-header {
            text-align: center;
            margin-bottom: 64px;
        }

        .program-header p {
            color: rgba(219, 119, 155, 0.6);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 5px;
            margin-bottom: 16px;
            font-family: 'DM Sans', sans-serif;
        }

        .program-header h2 {
            color: var(--plum);
            font-size: 36px;
            font-weight: 600;
            margin: 0;
            font-family: 'Playfair Display', serif;
        }

        .program-list {
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        .program-card {
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            background: white;
            border: 1px solid rgba(134, 67, 126, 0.05);
            box-shadow: 0 4px 25px rgba(134, 67, 126, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .program-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 48px rgba(134, 67, 126, 0.12);
        }

        .program-card-header {
            padding: 20px 32px;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .ceremony-header {
            background: linear-gradient(135deg, rgba(219, 119, 155, 0.08) 0%, rgba(217, 161, 212, 0.08) 100%);
        }

        .cocktail-header {
            background: linear-gradient(135deg, rgba(217, 161, 212, 0.08) 0%, rgba(219, 119, 155, 0.08) 100%);
        }

        .reception-header {
            background: linear-gradient(135deg, rgba(165, 160, 90, 0.08) 0%, rgba(217, 161, 212, 0.08) 100%);
        }

        .program-icon {
            width: 56px;
            height: 56px;
            min-width: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }

        .ceremony-icon {
            background: linear-gradient(135deg, var(--rose), var(--lavender));
        }

        .cocktail-icon {
            background: linear-gradient(135deg, var(--lavender), var(--rose));
        }

        .reception-icon {
            background: linear-gradient(135deg, var(--olive), #8a8545);
        }

        .program-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .program-info h3 {
            color: var(--plum);
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 5px 0;
            font-family: 'Playfair Display', serif;
        }

        .program-time {
            color: rgba(134, 67, 126, 0.5);
            font-size: 14px;
            margin: 0;
            font-family: 'DM Sans', sans-serif;
        }

        .program-card-content {
            padding: 20px 32px;
        }

        .program-card-content p {
            color: rgba(134, 67, 126, 0.6);
            font-size: 14px;
            line-height: 1.7;
            margin: 0;
            font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 640px) {
            #program {
                padding: 70px 16px;
            }
            .program-header {
                margin-bottom: 45px;
            }
            .program-header h2 {
                font-size: 28px;
            }
            .program-card-header {
                padding: 18px 20px;
                gap: 14px;
            }
            .program-card-content {
                padding: 18px 20px;
            }
            .program-icon {
                width: 50px;
                height: 50px;
                min-width: 50px;
                border-radius: 14px;
            }
            .program-info h3 {
                font-size: 16px;
            }
            .program-time {
                font-size: 13px;
            }
        }
      `}} />

      <div className="program-container">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="program-header"
        >
          <p>Déroulement</p>
          <h2>Programme de la Journée</h2>
        </motion.div>

        <div className="program-list">
          {PROGRAM_DATA.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.15) }}
              className="program-card"
            >
              <div className={`program-card-header ${item.headerClass}`}>
                <div className={`program-icon ${item.iconClass}`}>
                  {item.icon}
                </div>
                <div className="program-info">
                  <h3>{item.title}</h3>
                  <p className="program-time">{item.time}</p>
                </div>
              </div>
              <div className="program-card-content">
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
