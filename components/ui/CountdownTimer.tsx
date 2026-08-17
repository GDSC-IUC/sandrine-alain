"use client";

import { useEffect, useState, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2027-01-23T10:00:00");

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flip-card ${flipping ? "flipping" : ""}`}>
        <div className="glass rounded-lg flex items-center justify-center w-[70px] h-[80px] md:w-[90px] md:h-[100px]">
          <span className="font-display font-bold text-3xl md:text-4xl text-gradient-rose">
            {display}
          </span>
        </div>
      </div>
      <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-4 md:gap-6 justify-center">
      <FlipUnit value={timeLeft.days} label="Jours" />
      <Separator />
      <FlipUnit value={timeLeft.hours} label="Heures" />
      <Separator />
      <FlipUnit value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <FlipUnit value={timeLeft.seconds} label="Secondes" />
    </div>
  );
}

function Separator() {
  return (
    <span className="font-display text-3xl mb-8 text-primary-container opacity-60 leading-none select-none">
      :
    </span>
  );
}
