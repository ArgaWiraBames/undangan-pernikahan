'use client' // Tambahkan ini
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function LoveStorySection({ story }: { story: any[] }) {
  const [index, setIndex] = useState(-1);

  if (!story || story.length === 0) return null;

  // Filter slide hanya untuk item yang punya foto
  const slides = story
    .filter(item => item.foto)
    .map(item => ({ src: urlFor(item.foto).width(1200).url() }));

  // Fungsi helper untuk mencari index slide yang benar
  // (Karena tidak semua cerita punya foto, indexnya bisa beda)
  const handleOpenLightbox = (fotoSource: any) => {
     const clickIndex = slides.findIndex(s => s.src === urlFor(fotoSource).width(1200).url());
     if(clickIndex >= 0) setIndex(clickIndex);
  };

  return (
    <section className="py-24 px-6 bg-wedding-bg overflow-hidden">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl text-wedding-primary mb-3">Love Story</h2>
          <p className="text-xs tracking-[0.3em] uppercase text-wedding-secondary">Perjalanan Cinta Kami</p>
        </div>
      </Reveal>

      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-wedding-secondary/30 -translate-x-1/2 hidden md:block"></div>

        {story.map((item, i) => (
          <Reveal key={i} delay={i % 2 === 0 ? "delay-100" : "delay-200"}>
            <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* FOTO (Clickable) */}
              <div className="flex-1 w-full flex justify-center group">
                 {item.foto && (
                   <div 
                     onClick={() => handleOpenLightbox(item.foto)}
                     className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-2 group-hover:rotate-0 transition-transform duration-500 cursor-pointer"
                   >
                      <Image src={urlFor(item.foto).width(500).url()} alt={item.judul} fill className="object-cover" />
                      {/* Icon Zoom Kecil */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="text-white text-xs font-bold tracking-widest uppercase">View</span>
                      </div>
                   </div>
                 )}
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-wedding-primary rounded-full border-4 border-wedding-bg z-10 shadow-sm"></div>

              <div className="flex-1 text-center md:text-left bg-white p-8 rounded-xl shadow-sm border border-wedding-secondary/10 w-full relative">
                 <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 ${i % 2 === 0 ? '-left-2' : '-right-2'} border-l border-b border-wedding-secondary/10`}></div>
                 <span className="inline-block px-4 py-1 bg-wedding-bg text-wedding-primary text-xs font-bold rounded-full mb-4 border border-wedding-secondary/20">{item.tahun}</span>
                 <h3 className="font-serif text-2xl text-wedding-primary mb-3">{item.judul}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">{item.cerita}</p>
              </div>

            </div>
          </Reveal>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
      />
    </section>
  );
}