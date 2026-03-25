'use client'
import Image from "next/image";

export default function InitialsSection() {
  return (
    // Background diubah menjadi krem penuh #faeee0 tanpa menurunkan opacity
    <section className="relative py-28 px-6 bg-[#faeee0] overflow-hidden flex flex-col items-center justify-center text-wedding-primary">
      
      {/* --- EFEK ANIMASI KILAUAN HALUS --- */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .sparkle {
          position: absolute;
          background-color: #d1bfae; /* Warna krem agak gelap untuk kilauan */
          border-radius: 50%;
          box-shadow: 0 0 8px 1px rgba(209, 191, 174, 0.4);
          animation: twinkle infinite ease-in-out;
          z-index: 0;
          pointer-events: none;
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

      {/* --- DEKORASI BUNGA SUDUT (Menyatu dengan background) --- */}
      {/* mix-blend-multiply menghilangkan kesan "stiker" dan membuatnya seperti lukisan */}
      {/* Gunakan opacity yang lebih tinggi untuk bunga pojok yang dikirim pengguna agar lebih terlihat */}
      <div className="absolute -top-12 -left-12 w-56 md:w-72 opacity-60 mix-blend-multiply pointer-events-none z-0">
         <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={300} height={300} />
      </div>
      <div className="absolute -bottom-12 -right-12 w-56 md:w-72 opacity-60 mix-blend-multiply pointer-events-none z-0">
         <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={300} height={300} />
      </div>

      {/* --- KONTEN INISIAL / MONOGRAM --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 animate-fade-up">
        
        {/* Teks Atas - Warna disesuaikan agar kontras di latar terang */}
        <p className="tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold text-wedding-secondary drop-shadow-sm">
          We Are Getting Married
          </p>
        
        {/* GAMBAR MONOGRAM (Lengkap dengan Lingkaran Putih dan Bingkai Emas dari gambar pengguna) */}
        {/* Pertahankan tampilan menonjol dengan bayangan halus */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
           <Image 
             src="/decor/monogram.png" 
             alt="Monogram Pasangan" 
             fill 
             className="object-cover"
           />
        </div>

        {/* Teks Tanggal Bawah - Warna disesuaikan agar kontras */}
        <div className="flex items-center gap-4 mt-6 opacity-90">
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