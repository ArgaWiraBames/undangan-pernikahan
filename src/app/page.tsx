import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import GuestbookSection from "@/components/GuestbookSection";
import { Suspense } from 'react';
import WelcomeOverlay from '@/components/WelcomeOverlay';
 // <--- Import baru

// Revalidate data setiap 0 detik (selalu fresh) agar ucapan baru langsung muncul
export const revalidate = 0; 

async function getData() {
  // Query GROQ: Ambil data mempelai DAN data ucapan sekaligus
  // 'order(waktu desc)' artinya urutkan dari yang paling baru
  const query = `{
    "mempelai": *[_type == "mempelai"][0],
    "ucapan": *[_type == "ucapan"] | order(waktu desc)
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const { mempelai, ucapan } = await getData();

  if (!mempelai) return <div className="text-center p-10">Data belum ada.</div>;

  return (
    <main className="min-h-screen bg-wedding-bg">

      {/* 1. WELCOME OVERLAY (COVER DEPAN) */}
      {/* Dibungkus Suspense agar fitur baca URL aman */}
      <Suspense fallback={null}>
        <WelcomeOverlay mempelai={mempelai} />
      </Suspense>
      
      {/* 1. HERO SECTION */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {mempelai.fotoSampul && (
          <div className="mb-8 relative w-64 h-64 rounded-full overflow-hidden border-4 border-wedding-secondary shadow-xl">
            <Image 
              src={urlFor(mempelai.fotoSampul).width(500).url()} 
              alt="Foto Prewedding"
              fill
              className="object-cover"
            />
          </div>
        )}
        <h3 className="text-xl uppercase tracking-[0.2em] text-gray-500 mb-4">The Wedding Of</h3>
        <h1 className="text-5xl md:text-7xl font-serif text-wedding-primary mb-2">{mempelai.namaPria}</h1>
        <span className="text-4xl font-script text-wedding-secondary my-2 block">&</span>
        <h1 className="text-5xl md:text-7xl font-serif text-wedding-primary mb-8">{mempelai.namaWanita}</h1>
      </div>

      {/* 2. EVENT SECTION */}
      <EventSection data={mempelai} />

      {/* 3. GALLERY SECTION */}
      <GallerySection images={mempelai.galeri} />

      {/* 4. GUESTBOOK SECTION (Baru!) */}
      <GuestbookSection ucapan={ucapan} />

      {/* Footer Manis */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        <p>Made with ❤️ by Arga</p>
      </footer>

    </main>
  );
}