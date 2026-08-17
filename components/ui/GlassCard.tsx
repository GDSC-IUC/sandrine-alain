import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  hover?: boolean;
  floral?: boolean;
}

export default function GlassCard({ children, className = "", dark = false, hover = false, floral = false }: GlassCardProps) {
  return (
    <div
      className={`
        relative rounded-xl
        ${dark ? "glass-dark" : "glass"}
        ${hover ? "transition-transform duration-300 hover:-translate-y-2 hover:shadow-glass-lg cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Floral accent corners */}
      {floral && (
        <>
          <FloralCorner className="absolute -top-3 -left-3 opacity-60" />
          <FloralCorner className="absolute -bottom-3 -right-3 opacity-60 rotate-180" />
        </>
      )}
      {children}
    </div>
  );
}

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 35 Q5 5 35 5" stroke="#DB779B" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="8" cy="8" r="3" fill="#D9A1D4" opacity="0.7" />
      <circle cx="8" cy="14" r="1.5" fill="#DB779B" opacity="0.5" />
      <circle cx="14" cy="8" r="1.5" fill="#DB779B" opacity="0.5" />
      <circle cx="20" cy="5" r="2" fill="#A5A05A" opacity="0.6" />
      <circle cx="5" cy="20" r="2" fill="#A5A05A" opacity="0.6" />
      {/* Small petals */}
      <ellipse cx="8" cy="4" rx="1.5" ry="3" fill="#DB779B" opacity="0.5" transform="rotate(-30 8 4)" />
      <ellipse cx="4" cy="8" rx="1.5" ry="3" fill="#D9A1D4" opacity="0.5" transform="rotate(60 4 8)" />
    </svg>
  );
}
