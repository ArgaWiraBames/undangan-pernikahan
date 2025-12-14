import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal"; // Import animasi

export default function CoupleSection({ data }: { data: any }) {
  return (
    <section className="py-24 px-6 bg-white text-center overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* JUDUL / SALAM (Muncul Duluan) */}
        <Reveal>
          <div className="space-y-4">
            <p className="font-serif italic text-wedding-primary text-lg">Assalamu’alaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
          
          {/* PASANGAN 1: PRIA (Delay 200ms) */}
          <Reveal delay="delay-200">
            <div className="flex flex-col items-center gap-4">
              {data.fotoPria && (
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-[6px] border-wedding-bg shadow-xl hover:scale-105 transition-transform duration-500">
                  <Image src={urlFor(data.fotoPria).width(400).url()} alt="Pria" fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-script text-4xl text-wedding-primary mb-2">{data.namaLengkapPria}</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-wedding-secondary mb-2">Mempelai Pria</p>
                <p className="text-gray-500 text-sm">Putra dari Bpk. {data.namaAyahPria} <br/> & Ibu {data.namaIbuPria}</p>
              </div>
            </div>
          </Reveal>

          {/* PEMISAH (&) */}
          <Reveal delay="delay-300">
            <div className="font-script text-6xl text-wedding-secondary opacity-50">&</div>
          </Reveal>

          {/* PASANGAN 2: WANITA (Delay 400ms - Muncul Belakangan) */}
          <Reveal delay="delay-500">
            <div className="flex flex-col items-center gap-4">
              {data.fotoWanita && (
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-[6px] border-wedding-bg shadow-xl hover:scale-105 transition-transform duration-500">
                  <Image src={urlFor(data.fotoWanita).width(400).url()} alt="Wanita" fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-script text-4xl text-wedding-primary mb-2">{data.namaLengkapWanita}</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-wedding-secondary mb-2">Mempelai Wanita</p>
                <p className="text-gray-500 text-sm">Putri dari Bpk. {data.namaAyahWanita} <br/> & Ibu {data.namaIbuWanita}</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}