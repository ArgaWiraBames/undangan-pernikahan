import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal"; 

export default function CoupleSection({ data }: { data: any }) {
  return (
    <section 
      className="relative w-full py-16 md:py-24 px-4 bg-[url('/background-mempelai-baru.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      
      {/* Konten Utama */}
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* --- 1. TEKS PEMBUKA (SALAM) --- */}
        <Reveal>
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h3 className="font-script text-3xl md:text-5xl text-wedding-primary">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-4 font-serif">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
              Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
            </p>
          </div>
        </Reveal>

        {/* --- 2. FOTO & NAMA MEMPELAI --- */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
          
          {/* --- MEMPELAI WANITA (KIRI) --- */}
          <Reveal delay="delay-400">
            <div className="flex flex-col items-center text-center md:px-10">
              {data.fotoWanita && (
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl mb-6 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={urlFor(data.fotoWanita).width(500).url()} 
                    alt={data.namaWanita} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              
              <h1 className="font-script text-4xl md:text-5xl text-wedding-primary mb-2">
                {data.namaLengkapWanita || data.namaWanita}
              </h1>
              
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-wedding-secondary">
                  Mempelai Wanita
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs font-serif italic">
                  Putri kedua dari Bpk. {data.namaAyahWanita} <br/> & Ibu {data.namaIbuWanita}
                </p>
              </div>
            </div>
          </Reveal>

          {/* --- SIMBOL & (TENGAH) --- */}
          <Reveal delay="delay-300">
             <div className="px-4 md:px-8">
                <span className="font-script text-5xl md:text-7xl text-wedding-secondary/40">
                  &
                </span>
             </div>
          </Reveal>

          {/* --- MEMPELAI PRIA (KANAN) --- */}
          <Reveal delay="delay-200">
            <div className="flex flex-col items-center text-center md:px-10">
              {data.fotoPria && (
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl mb-6 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={urlFor(data.fotoPria).width(500).url()} 
                    alt={data.namaPria} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              
              <h1 className="font-script text-4xl md:text-5xl text-wedding-primary mb-2">
                {/* Menggunakan nama panggilan atau lengkap sesuai selera */}
                {data.namaLengkapPria || data.namaPria}
              </h1>
              
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-wedding-secondary">
                  Mempelai Pria
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs font-serif italic">
                  Putra kedua dari Bpk. {data.namaAyahPria} <br/> & Ibu {data.namaIbuPria}
                </p>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}