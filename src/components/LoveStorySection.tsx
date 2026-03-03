'use client'
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Fungsi untuk memilih ilustrasi berdasarkan Kata Kunci di Judul
const getIllustration = (title: string) => {
  if (!title) return '/ilustrasi/default.png';
  const t = title.toLowerCase();
  
  if (t.includes('meet') || t.includes('temu') || t.includes('awal') || t.includes('kenal')) {
    return '/ilustrasi/meet.png';
  }
  if (t.includes('engagement') || t.includes('lamaran') || t.includes('tunangan')) {
    return '/ilustrasi/ring.png';
  }
  if (t.includes('wedding') || t.includes('akad') || t.includes('nikah') || t.includes('resepsi')) {
    return '/ilustrasi/wedding.png';
  }
  
  return '/ilustrasi/default.png'; 
};

export default function LoveStorySection({ story }: { story: any[] }) {
  const [index, setIndex] = useState(-1);
  if (!story || story.length === 0) return null;

  const slides = story
    .filter(item => item.foto)
    .map(item => ({ src: urlFor(item.foto).width(1200).url() }));

  const handleOpenLightbox = (fotoSource: any) => {
     if(!fotoSource) return;
     const clickIndex = slides.findIndex(s => s.src === urlFor(fotoSource).width(1200).url());
     if(clickIndex >= 0) setIndex(clickIndex);
  };

  return (
    <section className="relative py-16 md:py-24 px-6 bg-[#faeee0]/68 overflow-hidden">
      
      {/* --- CSS UNTUK ANIMASI KELOPAK BUNGA JATUH --- */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) scale(0.6); opacity: 0; }
          10% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg) scale(1); opacity: 0; }
        }
        .petal {
          position: absolute;
          background-color: #fca5a5; /* Warna pink pastel */
          border-radius: 15px 0 15px 0; /* Bentuk kelopak */
          width: 12px;
          height: 12px;
          box-shadow: 0 0 5px rgba(255,182,193,0.3);
          animation: fall linear infinite;
          z-index: 1;
          opacity: 0;
          pointer-events: none; /* Agar tidak mengganggu klik tamu */
        }
      `}</style>

      {/* GENERATE 10 KELOPAK BUNGA --- */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="petal" 
          style={{
            left: `${(i * 11) % 100}%`, // Menyebar dari kiri ke kanan
            top: `-${(i * 5) % 10}vh`, // Mulai dari atas layar yang berbeda-beda
            animationDuration: `${15 + (i % 5) * 3}s`, // Kecepatan jatuh bervariasi
            animationDelay: `${(i % 7) * 2}s` // Waktu mulai bervariasi
          }}
        ></div>
      ))}

      {/* Hiasan Bunga Atas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-60 z-0">
        <Image src="/decor/bunga-tengah.png" alt="Flower" width={200} height={100} className="w-40 md:w-56 h-auto" />
      </div>

      <Reveal>
        <div className="relative z-10 text-center mb-12 md:mb-16 mt-10">
          <h2 className="font-script text-4xl md:text-5xl text-wedding-primary mb-3">Love Story</h2>
          <p className="text-xs tracking-[0.3em] uppercase text-wedding-secondary">Perjalanan Cinta Kami</p>
        </div>
      </Reveal>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* GARIS VERTIKAL UTAMA */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-0 w-[2px] bg-wedding-secondary/30 md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-12">
          {story.map((item, i) => {
             const ilustrasiImg = getIllustration(item.judul || "");
             
             return (
              <Reveal key={i} delay={i % 2 === 0 ? "delay-100" : "delay-200"}>
                <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} relative`}>
                  
                  {/* TITIK DOT TENGAH */}
                  <div className="absolute left-[10px] md:left-1/2 top-0 md:top-1/2 w-4 h-4 bg-wedding-primary rounded-full border-4 border-wedding-bg z-20 md:-translate-x-1/2 md:-translate-y-1/2 shadow-sm"></div>

                  {/* BAGIAN GAMBAR / ILUSTRASI */}
                  <div className="flex-1 w-full flex justify-center group md:mt-0">
                    {item.foto ? (
                      <div onClick={() => handleOpenLightbox(item.foto)} className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-1 group-hover:rotate-0 transition-transform duration-500 cursor-pointer bg-white">
                          <Image src={urlFor(item.foto).width(500).url()} alt={item.judul} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-fade-up">
                          <Image 
                            src={ilustrasiImg} 
                            alt="Ilustrasi Story" 
                            width={300} 
                            height={300} 
                            className="object-contain drop-shadow-md hover:scale-110 transition-transform duration-500"
                          />
                      </div>
                    )}
                  </div>

                  {/* BAGIAN TEKS CERITA */}
                  <div className="flex-1 text-left bg-white p-6 md:p-8 rounded-xl shadow-sm border border-wedding-secondary/10 w-full relative">
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 ${i % 2 === 0 ? '-left-2' : '-right-2'} border-l border-b border-wedding-secondary/10`}></div>
                    
                    <span className="inline-block px-3 py-1 bg-wedding-bg text-wedding-primary text-[10px] md:text-xs font-bold rounded-full mb-3 border border-wedding-secondary/20">
                      {item.tahun}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-wedding-primary mb-2 md:mb-3">{item.judul}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.cerita}</p>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides} />
    </section>
  );
}