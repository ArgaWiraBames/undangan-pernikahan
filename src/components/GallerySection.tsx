import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function GallerySection({ images }: { images: any[] }) {
  // Jika tidak ada foto, jangan tampilkan apa-apa
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-script text-wedding-secondary mb-4">
          Our Moments
        </h2>
        <p className="text-gray-500 mb-10">
          Momen kebahagiaan yang kami abadikan
        </p>

        {/* Grid Layout: 2 kolom di HP, 3 kolom di Laptop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 hover:scale-105 transition-transform duration-500 cursor-pointer"
            >
              <Image
                src={urlFor(img).width(600).height(600).url()}
                alt={`Foto Galeri ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}