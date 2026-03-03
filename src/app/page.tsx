import { Suspense } from 'react';
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image"; 
import Image from "next/image";

// Import Komponen Baru
import HeroWithVideo from "@/components/HeroWithVideo";

// Import Komponen Lainnya
import QuranSection from "@/components/QuranSection";
import CoupleSection from "@/components/CoupleSection";
import LoveStorySection from "@/components/LoveStorySection";
import InitialsSection from "@/components/InitialsSection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import GiftSection from "@/components/GiftSection";
import GuestbookSection from "@/components/GuestbookSection";
import Reveal from "@/components/Reveal"; 
import SectionDivider from '@/components/SectionDivider';

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
    "mempelai": *[_type == "mempelai"][0],{
    fotoSampulMobile,
    }
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
          audioUrl={audioUrl} 
        />
      </Suspense>

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

      {/* --- PEMBATAS HALAMAN BARU --- */}
      <SectionDivider />

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

      {/* --- 10. CLOSING SECTION (PENUTUP REVISI GRAND FINALE) --- */}
      <footer className="relative py-24 px-6 bg-[#faeee0]/68 text-center overflow-hidden flex flex-col items-center">

        {/* --- OPSI DEKORASI BINTANG KILAU --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
          <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse"></div>
          <div className="absolute top-[50%] right-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-700"></div>
          <div className="absolute bottom-[20%] left-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-300"></div>
        </div>

        <Reveal>
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">

            {/* --- FOTO PENUTUP DENGAN BINGKAI BUNGA --- */}
            <div className="relative mb-12 group animate-fade-up">
               {/* Dekorasi Bunga Kiri Atas */}
               <div className="absolute -top-10 -left-12 w-32 md:w-40 z-20 pointer-events-none drop-shadow-md group-hover:-rotate-3 transition-transform duration-500">
                  <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor" width={200} height={200} className="object-contain" />
               </div>
               
               {/* Dekorasi Bunga Kanan Bawah */}
               <div className="absolute -bottom-8 -right-12 w-32 md:w-40 z-20 pointer-events-none drop-shadow-md group-hover:rotate-3 transition-transform duration-500">
                  <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={200} height={200} className="object-contain" />
               </div>

               {/* Bingkai Foto */}
               <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-t-full rounded-b-3xl overflow-hidden border-[8px] border-white shadow-2xl bg-gray-100">
                  {/* LOGIKA CERDAS: Prioritaskan fotoPenutup, jika tidak ada pakai fotoSampul */}
                  {(mempelai.fotoPenutup || mempelai.fotoSampul) && (
                    <Image 
                      src={urlFor(mempelai.fotoPenutup || mempelai.fotoSampul).width(600).url()} 
                      alt="Closing Photo" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-wedding-primary/40 via-transparent to-transparent"></div>
               </div>
            </div>

            {/* --- UCAPAN TERIMA KASIH --- */}
            <div className="space-y-6 px-4 mb-10 animate-fade-up delay-100">
              <h2 className="font-script text-5xl md:text-7xl text-wedding-primary drop-shadow-sm">
                Terima Kasih
              </h2>
              
              <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4 font-serif italic max-w-lg mx-auto">
                <p>
                  "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
                </p>
                <p>
                  Atas kehadiran dan doa restu yang telah diberikan, kami ucapkan terima kasih yang sebesar-besarnya. Semoga Allah SWT membalas segala kebaikan Bapak/Ibu/Saudara/i.
                </p>
              </div>
            </div>

            {/* --- PEMISAH ELEGAN --- */}
            <div className="w-24 h-[1px] bg-wedding-secondary/50 mx-auto mb-10"></div>

            {/* --- SALAM PENUTUP & NAMA MEMPELAI --- */}
            <div className="flex flex-col items-center space-y-4 animate-fade-up delay-200">
               <p className="font-bold text-wedding-primary uppercase tracking-widest text-[10px] md:text-xs text-center px-4">
                 Wassalamu’alaikum Warahmatullahi Wabarakatuh
               </p>
               
               <p className="font-serif text-sm md:text-base text-gray-500">
                 Kami yang berbahagia,
               </p>
               
               {/* Nama Mempelai Bersanding */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-2">
                 <h3 className="font-script text-4xl md:text-5xl text-wedding-primary">
                   {mempelai.namaWanita}
                 </h3>
                 <span className="font-serif text-2xl md:text-3xl italic text-wedding-secondary/60">
                   &
                 </span>
                 <h3 className="font-script text-4xl md:text-5xl text-wedding-primary">
                   {mempelai.namaPria}
                 </h3>
               </div>
               
               <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-400 mt-4">
                  Beserta Keluarga Besar
               </p>
            </div>

          </div>
        </Reveal>
        
      </footer>
    </main>
  );
}