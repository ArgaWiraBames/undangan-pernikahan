'use client' 

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; 

export default function GallerySection({ images }: { images: any[] }) {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(6);

  if (!images || images.length === 0) return null;

  const slides = images.map((img) => ({
    src: urlFor(img).width(1200).url(), 
  }));

  const visibleImages = images.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6); 
  };

  const getRotation = (i: number) => {
    const rotations = ['rotate-3', '-rotate-2', 'rotate-2', '-rotate-3', 'rotate-1', '-rotate-1'];
    return rotations[i % rotations.length];
  };

  return (
    <section className="py-24 px-4 bg-[#faeee0]/68 overflow-hidden relative">
      
      {/* --- CSS UNTUK ANIMASI GABUNGAN (SPARKLES + PETALS) --- */}
      <style jsx>{`
        /* 1. Animasi Kilauan (Sparkles) - TETAP */
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .sparkle {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
          animation: twinkle infinite ease-in-out;
          z-index: 0;
          pointer-events: none;
        }

        /* 2. Animasi Kelopak Jatuh (Petals) - BARU */
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
          pointer-events: none;
        }
      `}</style>

      {/* GENERATE 20 KILAUAN BINTANG (Sparkles) --- */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="sparkle" 
          style={{
            top: `${(i * 13) % 100}%`,
            left: `${(i * 17) % 100}%`,
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            animationDuration: `${3 + (i % 4)}s`,
            animationDelay: `${i % 5}s`
          }}
        ></div>
      ))}

      {/* GENERATE 10 KELOPAK BUNGA JATUH (Petals) --- */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={i + 20} // Key unik
          className="petal" 
          style={{
            left: `${(i * 11) % 100}%`,
            top: `-${(i * 5) % 10}vh`,
            animationDuration: `${15 + (i % 5) * 3}s`,
            animationDelay: `${(i % 7) * 2}s`
          }}
        ></div>
      ))}

      {/* HIASAN BUNGA SUDUT */}
      <div className="absolute top-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none rotate-90 z-0">
         <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={200} height={200} />
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-script text-wedding-primary mb-3 tracking-wide drop-shadow-sm animate-fade-up">
          Our Moments
        </h2>
        <p className="text-gray-600 mb-16 italic font-serif text-sm md:text-base animate-fade-up delay-100">
          "When I saw you I fell in love, and you smiled because you knew."
        </p>

        {/* GRID FOTO */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pb-10 grid-flow-row-dense">
          {visibleImages.map((img, i) => {
            const ukuran = img.ukuran || 'standar';
            const sizeClass = 
              ukuran === 'lebar' ? 'col-span-2 aspect-[3/2]' : 
              ukuran === 'tinggi' ? 'row-span-2 aspect-[3/4]' : 
              'col-span-1 aspect-square md:aspect-[3/4]';

            return (
              <div 
                key={i} 
                onClick={() => setIndex(i)}
                className={`relative overflow-hidden rounded-lg bg-white p-2 md:p-3 shadow-xl border border-gray-100 cursor-pointer group animate-fade-up transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:z-20
                  ${getRotation(i)}
                  ${sizeClass}
                `}
                style={{ animationDelay: `${(i % 3) * 100}ms` }}
              >
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                   <Image
                     src={urlFor(img).width(800).url()}
                     alt={`Foto Galeri ${i + 1}`}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                     sizes="(max-width: 768px) 100vw, 50vw"
                   />
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white drop-shadow-md transform scale-50 group-hover:scale-100 transition-transform duration-300">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                       </svg>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TOMBOL "SHOW MORE" */}
        {visibleCount < images.length && (
           <div className="mt-4 mb-12 animate-fade-up relative z-10">
              <button 
                onClick={handleShowMore}
                className="px-8 py-3 bg-white border-2 border-wedding-primary text-wedding-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-wedding-primary hover:text-white transition-all shadow-md"
              >
                Lihat Lebih Banyak
              </button>
           </div>
        )}

      </div>

      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides} styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }} />
    </section>
  );
}