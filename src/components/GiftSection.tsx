'use client'
import { useState } from "react";
import Image from "next/image";

// Komponen Kartu Bank (Cashless)
function BankCard({ bank, number, name, delayClass }: { bank: string, number: string, name: string, delayClass: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!number) return null;

  return (
    <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-white flex flex-col items-center gap-3 w-full max-w-sm relative overflow-hidden group z-10 ${delayClass}`}>
      
      {/* ORNAMEN PITA (RIBBON) */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none z-20">
         <div className="absolute top-4 -right-6 w-32 bg-wedding-secondary/30 text-wedding-primary text-[9px] font-bold py-1 text-center rotate-45 shadow-sm tracking-widest uppercase border-y border-wedding-secondary/40">
           Gift
         </div>
      </div>

      {/* Ornamen transparan di dalam kartu */}
      <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={120} height={120} />
      </div>

      <p className="font-bold text-2xl text-wedding-primary uppercase tracking-widest z-10 mt-2">{bank}</p>
      
      <div className="text-center z-10 my-2">
        <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">No. Rekening</p>
        <p className="font-sans text-xl md:text-2xl font-bold text-gray-800 tracking-wider mb-1">{number}</p>
        <p className="text-sm text-gray-600 font-serif italic">a.n {name}</p>
      </div>

      <button 
        onClick={handleCopy}
        className="mt-2 text-xs bg-[#faeee0] text-wedding-primary px-6 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-wedding-primary hover:text-white transition-colors z-10 shadow-sm"
      >
        {copied ? "✓ Berhasil Disalin" : "Salin No. Rek"}
      </button>
    </div>
  );
}

export default function GiftSection({ data }: { data: any }) {
  const mapsLink = data.mapsKado || `https://maps.google.com/?q=${encodeURIComponent(data.alamatKado)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.alamatKado);
    alert("Alamat kado berhasil disalin!");
  };

  return (
    <section className="relative py-24 px-6 bg-[#faeee0]/68 text-center overflow-hidden">
      
      {/* --- CSS UNTUK ANIMASI GABUNGAN (FLOATING + PETALS) --- */}
      <style jsx>{`
        /* 1. Animasi Kartu Melayang (Floating) - TETAP */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite 2s;
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

      {/* GENERATE 10 KELOPAK BUNGA JATUH --- */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="petal" 
          style={{
            left: `${(i * 11) % 100}%`,
            top: `-${(i * 5) % 10}vh`,
            animationDuration: `${15 + (i % 5) * 3}s`,
            animationDelay: `${(i % 7) * 2}s`
          }}
        ></div>
      ))}

      {/* HIASAN BUNGA TENGAH ATAS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-60 w-40 md:w-56 pointer-events-none z-0">
         <Image src="/decor/bunga-tengah.png" alt="Decor" width={250} height={100} />
      </div>

      <div className="relative z-10 mt-8 mb-12 animate-fade-up">
        <h2 className="font-script text-4xl md:text-5xl text-wedding-primary mb-4 drop-shadow-sm">
          Wedding Gift
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto font-serif leading-relaxed px-4">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless maupun mengirimkannya secara langsung.
        </p>
      </div>
     
      {/* BAGIAN REKENING CASHLESS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 relative z-10 animate-fade-up delay-100 mb-8">
        <BankCard bank={data.bank1} number={data.norek1} name={data.atasnama1} delayClass="animate-float" />
        <BankCard bank={data.bank2} number={data.norek2} name={data.atasnama2} delayClass="animate-float-delayed" />
      </div>

      {/* BAGIAN ALAMAT KADO FISIK */}
      {data.alamatKado && (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-white max-w-2xl mx-auto relative z-10 animate-fade-up delay-300 overflow-hidden">
          
          {/* Pita Ribbon Kado Fisik */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none z-20">
             <div className="absolute top-4 -right-6 w-32 bg-wedding-secondary/30 text-wedding-primary text-[9px] font-bold py-1 text-center rotate-45 shadow-sm tracking-widest uppercase border-y border-wedding-secondary/40">
               Package
             </div>
          </div>

          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-[#faeee0] rounded-full flex items-center justify-center mb-4 text-wedding-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 11-4 0 2 2 0 014 0zM19 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             </div>

             <p className="font-serif text-2xl text-wedding-primary mb-3">Kirim Kado Fisik</p>
             <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 px-4 font-serif">
               {data.alamatKado}
             </p>
            
             <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
               <button 
                 onClick={handleCopyAddress}
                 className="px-8 py-3 border-2 border-wedding-primary text-wedding-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#faeee0] transition-colors shadow-sm"
               >
                 Salin Alamat
               </button>
               <a 
                 href={mapsLink}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="px-8 py-3 bg-wedding-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-wedding-secondary transition-colors shadow-md flex items-center justify-center gap-2"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 Buka Google Maps
               </a>
             </div>
          </div>
        </div>
      )}
    </section>
  );
}