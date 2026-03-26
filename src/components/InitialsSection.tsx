'use client'
import Image from "next/image";

export default function InitialsSection() {
  return (
    <section className="relative py-28 px-6 bg-[#faeee0] overflow-hidden flex flex-col items-center justify-center text-wedding-primary">
      
      {/* --- EFEK ANIMASI CUSTOM --- */}
      <style jsx>{`
        /* 1. Animasi Kilauan Bintang (Tetap) */
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .sparkle {
          position: absolute;
          background-color: #d1bfae; 
          border-radius: 50%;
          box-shadow: 0 0 8px 1px rgba(209, 191, 174, 0.4);
          animation: twinkle infinite ease-in-out;
          z-index: 0;
          pointer-events: none;
        }

        /* 2. Animasi Bunga Merayap Masuk dari Sudut (Baru) */
        @keyframes flowerSlideTL {
          0% { opacity: 0; transform: translate(-30px, -30px) scale(0.8) rotate(-15deg); }
          100% { opacity: 0.6; transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes flowerSlideBR {
          0% { opacity: 0; transform: translate(30px, 30px) scale(0.8) rotate(15deg); }
          100% { opacity: 0.6; transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        
        .flower-tl {
          /* Animasi untuk bunga Kiri Atas */
          animation: flowerSlideTL 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .flower-br {
          /* Animasi untuk bunga Kanan Bawah, diberi sedikit delay agar bergantian */
          opacity: 0; 
          animation: flowerSlideBR 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
        }
      `}</style>

      {/* GENERATE KILAUAN BINTANG */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="sparkle" 
          style={{
            top: `${(i * 15) % 100}%`,
            left: `${(i * 20) % 100}%`,
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            animationDuration: `${3 + (i % 4)}s`,
            animationDelay: `${i % 5}s`
          }}
        ></div>
      ))}

      {/* --- DEKORASI BUNGA SUDUT (Dengan Animasi) --- */}
      <div className="absolute -top-12 -left-12 w-56 md:w-72 mix-blend-multiply pointer-events-none z-0 flower-tl">
         <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={300} height={300} />
      </div>
      <div className="absolute -bottom-12 -right-12 w-56 md:w-72 mix-blend-multiply pointer-events-none z-0 flower-br">
         <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={300} height={300} />
      </div>

      {/* --- KONTEN INISIAL / MONOGRAM (Dengan Animasi Berurutan) --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Teks Atas (Muncul Pertama) */}
        <p className="tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold text-wedding-secondary drop-shadow-sm animate-fade-up">
          We Are Getting Married
        </p>
        
        {/* GAMBAR MONOGRAM (Muncul Kedua dengan delay) */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700 animate-fade-up delay-100">
           <Image 
             src="/decor/monogram.png" 
             alt="Monogram Pasangan" 
             fill 
             className="object-cover"
           />
        </div>

        {/* Teks Tanggal Bawah (Muncul Ketiga dengan delay) */}
        <div className="flex items-center gap-4 mt-6 opacity-90 animate-fade-up delay-200">
           <div className="w-12 md:w-20 h-[1px] bg-wedding-secondary/50"></div>
           <p className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase text-wedding-primary drop-shadow-sm">
             26 April 2026
           </p>
           <div className="w-12 md:w-20 h-[1px] bg-wedding-secondary/50"></div>
        </div>

      </div>
    </section>
  );
}