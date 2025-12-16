'use client'
import { useState, useEffect } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fungsi hitung mundur
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Komponen Kotak Waktu Kecil
  const TimeBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm border border-wedding-primary/20 p-3 rounded-xl min-w-[70px] md:min-w-[80px] shadow-sm">
      <span className="text-2xl md:text-3xl font-serif text-wedding-primary font-bold">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-wedding-primary/70 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center gap-3 md:gap-4 my-8">
      <TimeBox value={timeLeft.days} label="Hari" />
      <TimeBox value={timeLeft.hours} label="Jam" />
      <TimeBox value={timeLeft.minutes} label="Menit" />
      <TimeBox value={timeLeft.seconds} label="Detik" />
    </div>
  );
}