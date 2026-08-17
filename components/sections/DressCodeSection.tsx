"use client";

import { motion } from "framer-motion";
import React from "react";

export default function DressCodeSection() {
  return (
    <section id="dresscode" className="relative w-full overflow-hidden flex flex-col items-center">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --rose: #DB779B;
            --lavender: #D9A1D4;
            --plum: #86437E;
            --olive: #A5A05A;
            --cream: #FFF9F5;
        }

        #dresscode {
            padding: 96px 16px;
            background: linear-gradient(
                180deg,
                var(--cream) 0%,
                #f5e0e3 50%,
                var(--cream) 100%
            );
        }

        .dresscode-container {
            max-width: 768px;
            margin: auto;
            position: relative;
            z-index: 10;
            text-align: center;
            width: 100%;
        }

        .palette-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            justify-content: center;
            gap: 56px;
        }

        .palette-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .swatch {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.12);
            transition: transform 0.3s ease;
            cursor: pointer;
        }

        .swatch:hover {
            transform: scale(1.15);
        }

        .swatch::after {
            content: '';
            position: absolute;
            inset: -5px;
            border-radius: 50%;
            border: 1.5px dashed rgba(134,67,126,0.2);
        }

        .palette-rose {
            background: linear-gradient(135deg, #DB779B, #e895b0);
            box-shadow: 0 4px 20px rgba(219,119,155,0.3);
        }

        .palette-lavender {
            background: linear-gradient(135deg, #D9A1D4, #e6bee2);
            box-shadow: 0 4px 20px rgba(217,161,212,0.3);
        }

        .palette-plum {
            background: linear-gradient(135deg, #86437E, #a85d9e);
            box-shadow: 0 4px 20px rgba(134,67,126,0.3);
        }

        .palette-olive {
            background: linear-gradient(135deg, #A5A05A, #c8c48a);
            box-shadow: 0 4px 20px rgba(165,160,90,0.3);
        }

        .palette-name {
            color: rgba(134, 67, 126, 0.6);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
        }

        .palette-code {
            color: rgba(134, 67, 126, 0.3);
            font-size: 11px;
            font-family: monospace;
        }

        @keyframes floatSway {
            0%, 100% { transform: translateY(0) rotate(var(--rot-start)); }
            50% { transform: translateY(-18px) rotate(var(--rot-end)); }
        }

        .float-flower {
            position: absolute;
            pointer-events: none;
            animation: floatSway var(--dur) ease-in-out infinite;
            animation-delay: var(--delay);
            opacity: var(--op, 0.25);
        }

        @media (max-width: 640px) {
            #dresscode {
                padding: 70px 16px;
            }
            .dresscode-header {
                margin-bottom: 40px;
            }
            .dresscode-header h2 {
                font-size: 28px;
            }
            .palette-list {
                gap: 35px;
            }
            .swatch {
                width: 60px;
                height: 60px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .float-flower {
                animation: none !important;
            }
            .swatch {
                transition: none;
            }
        }
      `}} />

      {/* Decorative Flower 1 */}
      <svg
        className="float-flower"
        style={{
          top: "10%",
          left: "3%",
          width: "100px",
          height: "100px",
          "--dur": "10s",
          "--delay": "1s",
          "--rot-start": "-5deg",
          "--rot-end": "5deg",
          "--op": "0.16",
        } as React.CSSProperties}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M0 200 C30 160 60 120 95 85" stroke="#A5A05A" strokeWidth="1" opacity="0.4" />
        <ellipse cx="95" cy="85" rx="8" ry="13" fill="#DB779B" opacity="0.35" transform="rotate(-15,95,85)" />
        <ellipse cx="105" cy="80" rx="7" ry="12" fill="#D9A1D4" opacity="0.3" transform="rotate(35,105,80)" />
        <circle cx="95" cy="85" r="5" fill="#D9A1D4" opacity="0.4" />
      </svg>

      {/* Decorative Flower 2 */}
      <svg
        className="float-flower"
        style={{
          bottom: "10%",
          right: "3%",
          width: "100px",
          height: "100px",
          "--dur": "11s",
          "--delay": "3s",
          "--rot-start": "5deg",
          "--rot-end": "-5deg",
          "--op": "0.16",
          transform: "scaleX(-1)",
        } as React.CSSProperties}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M0 200 C30 160 60 120 95 85" stroke="#A5A05A" strokeWidth="1" opacity="0.4" />
        <ellipse cx="95" cy="85" rx="8" ry="13" fill="#D9A1D4" opacity="0.35" transform="rotate(10,95,85)" />
        <ellipse cx="85" cy="90" rx="7" ry="12" fill="#DB779B" opacity="0.3" transform="rotate(-50,85,90)" />
        <circle cx="95" cy="85" r="5" fill="#DB779B" opacity="0.4" />
      </svg>

      {/* Content Container */}
      <div className="dresscode-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="font-sans text-label-sm text-primary uppercase tracking-[0.3em] mb-3">Tenue de Cérémonie</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-plum mb-4">
            Code Vestimentaire
          </h2>
          <div className="floral-divider">
            <span className="text-rose text-xl">❀</span>
          </div>
        </motion.div>

        {/* Content & Palettes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto text-center mb-14">
            Pour honorer la beauté de ce moment, nous vous invitons à adopter notre palette florale.
            Tenues de cérémonie requises — laissez-nous vous guider dans vos choix.
          </p>

          <div className="palette-list">
            <div className="palette-item">
              <div className="swatch palette-rose"></div>
              <span className="palette-name">Rose Poudré</span>
              <code className="palette-code">#DB779B</code>
            </div>

            <div className="palette-item">
              <div className="swatch palette-lavender"></div>
              <span className="palette-name">Lavande</span>
              <code className="palette-code">#D9A1D4</code>
            </div>

            <div className="palette-item">
              <div className="swatch palette-plum"></div>
              <span className="palette-name">Prune Profond</span>
              <code className="palette-code">#86437E</code>
            </div>

            <div className="palette-item">
              <div className="swatch palette-olive"></div>
              <span className="palette-name">Olive Sauvage</span>
              <code className="palette-code">#A5A05A</code>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
