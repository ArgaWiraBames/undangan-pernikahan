import Image from "next/image";

export default function InitialsSection({ data }: { data: any }) {
  // UBAH DI SINI: Kita set manual inisialnya jadi A & H
  const inisialPria = "A";
  const inisialWanita = "H";

  return (
    <section className="relative py-24 px-6 bg-wedding-primary overflow-hidden flex flex-col items-center justify-center text-white">
      
      {/* --- DEKORASI BUNGA (Putih/Transparan) --- */}
      <div className="absolute top-0 left-0 w-40 md:w-56 opacity-80 mix-blend-hard-light">
         <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={300} height={300} />
      </div>
      <div className="absolute bottom-0 right-0 w-40 md:w-56 opacity-80 mix-blend-hard-light">
         <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={300} height={300} />
      </div>

      {/* --- KONTEN INISIAL --- */}
      <div className="relative z-10 text-center space-y-2 border border-white/30 p-10 md:p-16 rounded-full aspect-square flex flex-col items-center justify-center backdrop-blur-sm bg-white/5">
        <p className="tracking-[0.4em] text-[10px] uppercase font-bold text-white/80">
          We Are Getting Married
        </p>
        
        <div className="flex items-center justify-center gap-4 my-2">
            <span className="font-script text-7xl md:text-9xl">{inisialPria}</span>
            <span className="font-serif text-2xl md:text-4xl italic opacity-70">&</span>
            <span className="font-script text-7xl md:text-9xl">{inisialWanita}</span>
        </div>

        {/* UBAH DI SINI: Tanggal menjadi 26 April 2026 */}
        <p className="font-serif text-lg md:text-xl tracking-widest border-t border-white/40 pt-4 mt-2 uppercase">
          26 April 2026
        </p>
      </div>
    </section>
  );
}