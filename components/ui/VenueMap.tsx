"use client";

import { useEffect, useRef } from "react";

interface VenueMapProps {
  lat: number;
  lng: number;
  label: string;
  zoom?: number;
}

export default function VenueMap({ lat, lng, label, zoom = 16 }: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    // Dynamic import of Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default marker icon issue with webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current).setView([lat, lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom rose marker
      const customIcon = L.divIcon({
        html: `<div style="
          width:36px;height:36px;border-radius:50% 50% 50% 0;
          background:linear-gradient(135deg,#DB779B,#984063);
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 12px rgba(152,64,99,0.4);
          border:2px solid white;
        "><span style="transform:rotate(45deg);font-size:16px">📍</span></div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong style="color:#86437E;font-family:serif">${label}</strong>`)
        .openPopup();

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, label, zoom]);

  return (
    <div
      ref={mapRef}
      className="w-full h-52 rounded-xl overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}
