import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal"; 

export default function CoupleSection({ data }: { data: any }) {
  return (
    // UBAH: pt-2 (Hampir tidak ada jarak atas, hanya sedikit nafas)
        <section className="pt-20 pb-20 px-6 bg-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        
        {/* JUDUL / SALAM */}
        <Reveal>
          <div className="space-y-2 mt-2"> {/* Tambah mt-2 sedikit agar tidak terlalu nempel */}
            <h3 className="font-script text-2xl md:text-4xl text-wedding-primary">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </h3>
            <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed max-w-lg mx-auto px-4">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
            </p>
          </div>
        </Reveal>

        {/* Bagian Foto Pasangan (Tidak Berubah) */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
          
          {/* PRIA */}
          <Reveal delay="delay-200">
            <div className="flex flex-col items-center gap-3">
              {data.fotoPria && (
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-[4px] border-wedding-bg shadow-lg">
                  <Image src={urlFor(data.fotoPria).width(400).url()} alt="Pria" fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-script text-2xl md:text-4xl text-wedding-primary mb-1">{data.namaLengkapPria}</h3>
                <p className="text-[9px] font-bold tracking-widest uppercase text-wedding-secondary mb-1">Mempelai Pria</p>
                <p className="text-gray-400 text-[10px]">Putra kedua dari Bpk. {data.namaAyahPria} <br/> & Ibu {data.namaIbuPria}</p>
              </div>
            </div>
          </Reveal>

          {/* SIMBOL & */}
          <Reveal delay="delay-300">
            <div className="font-script text-4xl md:text-5xl text-wedding-secondary opacity-40">&</div>
          </Reveal>

          {/* WANITA */}
          <Reveal delay="delay-500">
            <div className="flex flex-col items-center gap-3">
              {data.fotoWanita && (
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-[4px] border-wedding-bg shadow-lg">
                  <Image src={urlFor(data.fotoWanita).width(400).url()} alt="Wanita" fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-script text-2xl md:text-4xl text-wedding-primary mb-1">{data.namaLengkapWanita}</h3>
                <p className="text-[9px] font-bold tracking-widest uppercase text-wedding-secondary mb-1">Mempelai Wanita</p>
                <p className="text-gray-400 text-[10px]">Putri kedua dari Bpk. {data.namaAyahWanita} <br/> & Ibu {data.namaIbuWanita}</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}