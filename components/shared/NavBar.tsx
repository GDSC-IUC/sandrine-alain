"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#notre-histoire", label: "Notre Histoire" },
  { href: "#galerie", label: "Galerie" },
  { href: "#programme", label: "Programme" },
  { href: "#lieux", label: "Lieux" },
  { href: "#dress-code", label: "Tenue" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#livre-dor", label: "Livre d'Or" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-[500] transition-all duration-300
        ${scrolled ? "glass shadow-glass py-3" : "py-5 bg-transparent"}
      `}
    >
      <div className="container-max flex items-center justify-between px-5">
        {/* Logo */}
        <a href="#accueil" className="font-display font-bold text-lg text-gradient-rose flex items-center gap-2">
          <span className="text-rose">S</span>
          <span className="text-on-surface-variant text-sm font-sans">&</span>
          <span className="text-plum">A</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="
                  font-sans text-xs font-medium uppercase tracking-wider px-3 py-2 rounded-full cursor-pointer
                  text-on-surface-variant hover:text-plum hover:bg-rose/10 transition-all duration-200
                "
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a href="#rsvp" className="btn-primary text-xs px-5 py-2">
              💌 RSVP
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <motion.div animate={mobileOpen ? "open" : "closed"} className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
              variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
              className="h-0.5 w-full bg-plum rounded-full block"
            />
            <motion.span
              variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
              className="h-0.5 w-full bg-plum rounded-full block"
            />
            <motion.span
              variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
              className="h-0.5 w-full bg-plum rounded-full block"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-outline-variant/30"
          >
            <ul className="flex flex-col py-4 px-5 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-sans text-sm text-on-surface-variant hover:text-plum py-2 px-3 rounded-lg hover:bg-rose/10 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href="#rsvp" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center text-sm py-3">
                  💌 Confirmer ma présence
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
