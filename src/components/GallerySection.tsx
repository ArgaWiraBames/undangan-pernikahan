'use client' // Wajib ada karena kita pakai useState (interaksi)

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import CSS bawaan library

export default function GallerySection({ images }: { images: any[] }) {
  // State untuk mengatur Lightbox (index -1 artinya tertutup)
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  // Siapkan data slide untuk Lightbox (ambil URL gambar kualitas tinggi)
  const slides = images.map((img) => ({
    src: urlFor(img).width(1200).url(), // Resolusi tinggi untuk mode full screen
  }));

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-serif text-wedding-primary mb-4 tracking-wide">
          OUR MOMENTS
        </h2>
        <p className="text-gray-500 mb-12 italic font-serif">
          "When I saw you I fell in love, and you smiled because you knew."
        </p>

        {/* Grid Foto */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              // Tambahkan onClick untuk membuka Lightbox
              onClick={() => setIndex(i)}
              className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-xl bg-gray-100 hover:scale-[1.02] transition-transform duration-500 shadow-md border border-gray-100 cursor-pointer group"
            >
              <Image
                src={urlFor(img).width(600).height(800).url()}
                alt={`Foto Galeri ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              
              {/* Ikon Kaca Pembesar (Muncul saat Hover) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Komponen Lightbox (Tersembunyi sampai index >= 0) */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        // Styling tambahan agar tombol navigasi terlihat jelas
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </section>
  );
}