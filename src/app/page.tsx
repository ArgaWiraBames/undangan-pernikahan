import { Suspense } from 'react';
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image"; // Masih dipakai untuk prop lain jika perlu
import Image from "next/image";


// Import Komponen Baru
import HeroWithVideo from "@/components/HeroWithVideo";

// Import Komponen Lainnya (TETAP SAMA)
import QuranSection from "@/components/QuranSection";
import CoupleSection from "@/components/CoupleSection";
import LoveStorySection from "@/components/LoveStorySection";
import InitialsSection from "@/components/InitialsSection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import GiftSection from "@/components/GiftSection";
import GuestbookSection from "@/components/GuestbookSection";
import Reveal from "@/components/Reveal"; 
import { FloralCorner } from "@/components/Icons"; 

export const revalidate = 0; 

// Fungsi Helper URL
function getFileUrl(source: any) {
  if (!source || !source.asset || !source.asset._ref) return null;
  const ref = source.asset._ref;
  const [, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${extension}`;
}

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

  const videoDesktopUrl = getFileUrl(mempelai.videoDesktop);
  const videoMobileUrl = getFileUrl(mempelai.videoMobile);
  const audioUrl = getFileUrl(mempelai.audio); // AMBIL URL AUDIO

  return (
    <main className="min-h-screen bg-wedding-bg text-wedding-primary overflow-x-hidden font-sans">
      
      <Suspense fallback={null}>
        <HeroWithVideo 
          mempelai={mempelai} 
          videoDesktopUrl={videoDesktopUrl}
          videoMobileUrl={videoMobileUrl}
          audioUrl={audioUrl} // KIRIM KE COMPONENT
        />
      </Suspense>

      {/* --- SISA SECTION KE BAWAH TETAP SAMA --- */}

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

      {/* --- 10. CLOSING SECTION (PENUTUP REVISI) --- */}
      <footer className="relative py-24 px-6 bg-wedding-bg text-center overflow-hidden flex flex-col items-center">

        {/* Hiasan Bunga */}
        <div className="absolute bottom-0 left-0 w-32 md:w-48 opacity-60 pointer-events-none mix-blend-multiply">
           <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={200} height={200} />
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-48 opacity-60 pointer-events-none mix-blend-multiply rotate-180">
           <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={200} height={200} />
        </div>

        <Reveal>
          <div className="max-w-2xl mx-auto space-y-10 flex flex-col items-center relative z-10">

            {/* Foto Penutup (Arch) */}
            <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-t-full rounded-b-[2rem] overflow-hidden border-[6px] border-white shadow-xl">
               {mempelai.fotoSampul && (
                 <Image 
                   src={urlFor(mempelai.fotoSampul).width(600).url()} 
                   alt="Closing Photo" fill className="object-cover"
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-wedding-primary/20 to-transparent"></div>
            </div>

            {/* Ucapan Terima Kasih */}
            <div className="space-y-6 px-4">
              <h2 className="font-script text-4xl md:text-6xl text-wedding-primary mb-2">
                Terima Kasih
              </h2>
              
              <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4 font-serif italic">
                <p>
                  "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
                </p>
                <p>
                  Atas kehadiran dan doa restu yang telah diberikan, kami ucapkan terima kasih yang sebesar-besarnya. Semoga Allah SWT membalas segala kebaikan Bapak/Ibu/Saudara/i dengan keberkahan yang berlipat ganda.
                </p>
              </div>
            </div>

            {/* Salam Penutup & Tanda Tangan (VERTIKAL) */}
            <div className="pt-6 space-y-3 border-t border-wedding-secondary/30 w-full max-w-md mx-auto flex flex-col items-center">
               <p className="font-bold text-wedding-primary uppercase tracking-widest text-[10px] md:text-xs mb-4">
                 Wassalamu’alaikum Warahmatullahi Wabarakatuh
               </p>
               
               <p className="font-serif text-lg text-gray-500">
                 Kami yang berbahagia,
               </p>
               
               {/* Nama Mempelai Susun Ke Bawah */}
               <div className="flex flex-col items-center py-2 gap-1">
                 <h3 className="font-script text-3xl md:text-5xl text-wedding-primary leading-tight">
                   {mempelai.namaLengkapPria || mempelai.namaPria}
                 </h3>
                 
                 <span className="font-serif text-lg italic text-wedding-secondary my-1">
                   &
                 </span>
                 
                 <h3 className="font-script text-3xl md:text-5xl text-wedding-primary leading-tight">
                   {mempelai.namaLengkapWanita || mempelai.namaWanita}
                 </h3>
               </div>
               
               <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                  Beserta Keluarga Besar
               </p>
            </div>

          </div>
        </Reveal>
        
      </footer>
    </main>
  );
}