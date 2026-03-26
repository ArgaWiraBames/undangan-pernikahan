'use client'; 

import Link from 'next/link';
import { MapPinIcon, ClockIcon } from "@/components/Icons"; 
import Reveal from "@/components/Reveal"; 
import Countdown from "@/components/Countdown";
import Image from "next/image";

const createCalendarLink = (title: string, date: string, location: string, details: string) => {
  const eventDate = new Date(date);
  const start = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, ""); 
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
};

// --- COMPONENT EVENT CARD (Ditambahkan properti endDate) ---
function EventCard({ title, date, endDate, location, address, mapsUrl }: any) {
  const eventDate = new Date(date);
  
  // Format waktu mulai
  const startTimeStr = eventDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
  
  // LOGIKA CERDAS: Cek apakah ada data waktu selesai dari Sanity
  let endTimeStr = "Selesai"; // Default jika tidak diisi
  if (endDate) {
    const endObj = new Date(endDate);
    endTimeStr = endObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-t-full rounded-b-[3rem] border border-wedding-secondary/20 shadow-lg flex flex-col items-center text-center gap-5 relative overflow-hidden group">
      
      {/* HIASAN BUNGA KUBAH */}
      <div className="absolute top-0 left-0 w-24 md:w-32 opacity-60 pointer-events-none">
        <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={200} height={200} />
      </div>
      <div className="absolute bottom-0 right-0 w-24 md:w-32 opacity-60 pointer-events-none">
        <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={200} height={200} />
      </div>

      <h3 className="text-3xl font-serif text-wedding-primary tracking-wide mt-6 z-10">
        {title}
      </h3>
      
      <div className="border-y border-wedding-secondary/20 py-4 w-full z-10">
        <p className="font-serif text-4xl text-wedding-primary">
          {eventDate.getDate()} {eventDate.toLocaleDateString("id-ID", { month: 'long' })}
        </p>
        <p className="font-sans text-sm tracking-[0.2em] uppercase mt-1 text-wedding-primary/60">
          {eventDate.getFullYear()}
        </p>
      </div>

      {/* TAMPILAN WAKTU DINAMIS */}
      <div className="flex items-center gap-2 text-wedding-primary font-medium bg-[#faeee0]/68 px-5 py-2 rounded-full z-10">
        <ClockIcon className="w-5 h-5 text-wedding-secondary" />
        <span>{startTimeStr} - {endTimeStr} WIB</span>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2 z-10">
        <div className="flex items-center gap-2 text-wedding-primary font-bold text-lg">
           <MapPinIcon className="w-6 h-6 text-wedding-secondary" />
           <span>{location}</span>
        </div>
        <p className="text-sm text-gray-500 max-w-[220px] mx-auto leading-relaxed">
          {address}
        </p>
      </div>

      {mapsUrl && (
        <div className="flex flex-col gap-3 mt-4 w-full px-4 z-10">
          <Link href={mapsUrl} target="_blank" className="px-8 py-3 bg-wedding-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-wedding-secondary transition-colors shadow-md">Google Maps</Link>
          <Link href={createCalendarLink(title, date, location, `Pernikahan di ${location}`)} target="_blank" className="px-8 py-3 border border-wedding-primary text-wedding-primary rounded-full text-xs uppercase tracking-widest hover:bg-[#faeee0]/68 transition-colors">Add to Calendar</Link>
        </div>
      )}
    </div>
  );
}

export default function EventSection({ data }: { data: any }) {
  const targetDate = data.waktuAkad; 
  const mainCalendarLink = createCalendarLink(`The Wedding of ${data.namaPria} & ${data.namaWanita}`, data.waktuAkad, data.lokasiAkad, "Mohon doa restu.");

  return (
    <section className="py-24 px-4 bg-[#faeee0]/68 overflow-hidden relative">
      
      {/* --- CSS UNTUK ANIMASI KELOPAK BUNGA --- */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) scale(0.6); opacity: 0; }
          10% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg) scale(1); opacity: 0; }
        }
        .petal {
          position: absolute;
          background-color: #fca5a5;
          border-radius: 15px 0 15px 0;
          width: 15px;
          height: 15px;
          box-shadow: 0 0 8px rgba(255,182,193,0.5);
          animation: fall linear infinite;
          z-index: 1;
          opacity: 0;
        }
      `}</style>

      {/* --- GENERATE 15 KELOPAK BUNGA --- */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="petal" 
          style={{
            left: `${(i * 7.5) % 100}%`,
            animationDuration: `${12 + (i % 5) * 3}s`,
            animationDelay: `${(i % 7) * 2}s`
          }}
        ></div>
      ))}

      {/* --- WATERMARK RAKSASA --- */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] md:w-[600px] opacity-[0.08] pointer-events-none z-0">
        <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Watermark" width={600} height={600} />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[400px] md:w-[600px] opacity-[0.08] pointer-events-none z-0">
        <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Watermark" width={600} height={600} />
      </div>

      <Reveal>
        <div className="flex flex-col items-center mb-16 relative z-20">
           <h2 className="text-center text-3xl md:text-5xl font-script text-wedding-primary mb-6 drop-shadow-sm">
             Save The Date
           </h2>

           {targetDate && <Countdown targetDate={targetDate} />}

           <Link href={mainCalendarLink} target="_blank" className="mt-8 flex items-center gap-2 px-8 py-3 bg-wedding-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-wedding-secondary hover:scale-105 transition-all shadow-lg animate-fade-up">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
             Ingatkan Saya
           </Link>
        </div>
      </Reveal>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-12 px-4 relative z-20">
        
        {/* KARTU 1: AKAD (Ditambahkan data.waktuSelesaiAkad) */}
        <div className="flex-1 w-full max-w-md">
          <Reveal delay="delay-100">
            <EventCard title="Akad Nikah" date={data.waktuAkad} endDate={data.waktuSelesaiAkad} location={data.lokasiAkad} address={data.alamatAkad} mapsUrl={data.mapsAkad} />
          </Reveal>
        </div>

        {/* --- DIVIDER PEMBATAS --- */}
        <Reveal delay="delay-200">
          <div className="w-full md:w-auto flex justify-center items-center py-2 md:py-0">
             <Image 
                src="/decor/bunga-tengah.png" 
                alt="Divider" 
                width={150} 
                height={150} 
                className="w-20 md:w-28 opacity-60 md:-rotate-90 drop-shadow-sm" 
             />
          </div>
        </Reveal>

        {/* KARTU 2: RESEPSI (Ditambahkan data.waktuSelesaiResepsi) */}
        <div className="flex-1 w-full max-w-md">
          <Reveal delay="delay-300">
            <EventCard title="Resepsi" date={data.waktuResepsi} endDate={data.waktuSelesaiResepsi} location={data.lokasiResepsi} address={data.alamatResepsi} mapsUrl={data.mapsResepsi} />
          </Reveal>
        </div>

      </div>
    </section>
  );
}