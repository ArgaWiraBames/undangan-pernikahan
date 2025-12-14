import { Suspense } from 'react';
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";

// Import Semua Komponen
import WelcomeOverlay from "@/components/WelcomeOverlay";
import QuranSection from "@/components/QuranSection";
import CoupleSection from "@/components/CoupleSection";
import LoveStorySection from "@/components/LoveStorySection";
import InitialsSection from "@/components/InitialsSection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import GiftSection from "@/components/GiftSection";
import GuestbookSection from "@/components/GuestbookSection";
import Reveal from "@/components/Reveal"; 
import { FloralCorner } from "@/components/Icons"; // Masih di-import untuk divider

export const revalidate = 0; 

async function getData() {
  const query = `{
    "mempelai": *[_type == "mempelai"][0],
    "ucapan": *[_type == "ucapan"] | order(waktu desc)
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const { mempelai, ucapan } = await getData();
  
  if (!mempelai) return <div className="text-center p-20">Loading Data...</div>;

  return (
    <main className="min-h-screen bg-wedding-bg text-wedding-primary overflow-x-hidden font-sans">
      
      <Suspense fallback={null}>
        <WelcomeOverlay mempelai={mempelai} />
      </Suspense>

      {/* --- 1. HERO SECTION (REVISI MOBILE) --- */}
<section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-10 px-6 overflow-hidden gap-6 md:gap-8">
  
  {/* Judul Atas (Jarak didekatkan) */}
  <div className="z-10 animate-fade-up delay-100 mt-10 md:mt-0">
      <p className="tracking-[0.3em] text-[15px] uppercase text-wedding-primary/80">The Wedding Of</p>
  </div>

  {/* Konten Tengah (Foto & Nama) */}
  <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-2xl">
    <div className="relative animate-fade-up delay-300">
      {/* Bingkai CSS Tipis */}
      <div className="absolute -inset-2 md:-inset-3 rounded-t-full rounded-b-[10rem] border border-wedding-secondary/50 z-0"></div>
      
      {/* Wadah Foto */}
      <div className="relative w-48 h-64 md:w-72 md:h-[28rem] rounded-t-full rounded-b-[9rem] overflow-hidden shadow-xl z-10 bg-white/40 flex items-center justify-center">
          {mempelai.fotoSampul && (
            <Image 
              src={urlFor(mempelai.fotoSampul).width(600).url()} 
              alt="Cover" fill className="object-cover" priority
            />
          )}
      </div>
    </div>

    {/* Nama Pengantin */}
    <div className="flex flex-col items-center animate-fade-up delay-500 w-full text-center mt-3 md:mt-4">
            <h1 className="text-4xl md:text-6xl font-script text-wedding-primary">{mempelai.namaPria}</h1>
            <span className="font-serif text-lg italic text-wedding-secondary py-1">&</span>
            <h1 className="text-4xl md:text-6xl font-script text-wedding-primary">{mempelai.namaWanita}</h1>
          </div>
  </div>

  {/* Scroll Down (Ditempelkan lebih dekat ke nama) */}
  <div className="z-20 flex justify-center animate-fade-up delay-1000 mt-2 md:mt-4">
      <div className="animate-bounce flex flex-col items-center gap-1">
        <span className="text-[9px] tracking-[0.2em] uppercase text-wedding-primary/80 font-bold">Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-wedding-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
  </div>
</section>

      {/* --- 2. QURAN SECTION --- */}
      <Reveal>
        <QuranSection data={mempelai} />
      </Reveal>

      {/* --- 3. COUPLE SECTION --- */}
      <Reveal>
        <CoupleSection data={mempelai} />
      </Reveal>

      {/* --- 4. LOVE STORY SECTION --- */}
      <Reveal>
        <LoveStorySection story={mempelai.loveStory} />
      </Reveal>

      {/* --- 5. INITIALS PHOTO SECTION --- */}
      <Reveal>
        <InitialsSection data={mempelai} />
      </Reveal>

      {/* --- 6. EVENT SECTION --- */}
      <Reveal>
         <EventSection data={mempelai} />
      </Reveal>

      {/* --- 7. GALLERY --- */}
      <Reveal>
         <GallerySection images={mempelai.galeri} />
      </Reveal>

      {/* --- 8. GIFT SECTION --- */}
      <Reveal>
         <GiftSection data={mempelai} />
      </Reveal>

      {/* --- 9. GUESTBOOK --- */}
      <Reveal>
         <GuestbookSection ucapan={ucapan} />
      </Reveal>

      {/* Footer */}
      <footer className="py-20 text-center bg-wedding-bg border-t border-wedding-secondary/20 mt-10">
        <p className="font-script text-3xl mb-4 text-wedding-primary">Terima Kasih</p>
        <p className="font-sans text-xs tracking-[0.2em] opacity-80 uppercase text-wedding-primary">
          {mempelai.namaPria} & {mempelai.namaWanita}
        </p>
      </footer>
    </main>
  );
}