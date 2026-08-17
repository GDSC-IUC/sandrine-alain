import type { Metadata } from "next";
import "./globals.css";
import "../components/sections/envelope.css";
import PetalCanvas from "@/components/ui/PetalCanvas";

export const metadata: Metadata = {
  title: "Sandrine & Alain Duclot — Mariage le 23 Janvier 2027",
  description:
    "Rejoignez-nous pour célébrer l'union sacrée de Sandrine et Alain Duclot à Bafoussam, Cameroun. Invitation digitale interactive pour notre mariage religieux le 23 janvier 2027.",
  keywords: ["mariage", "Sandrine", "Alain", "Duclot", "Bafoussam", "Cameroun", "invitation"],
  openGraph: {
    title: "Les Gardiens d'une Promesse — Sandrine & Alain",
    description: "Invitation au mariage de Sandrine & Alain Duclot · 23 Janvier 2027 · Bafoussam, Cameroun",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <PetalCanvas />
        {children}
      </body>
    </html>
  );
}
