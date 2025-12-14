import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function InitialsSection({ data }: { data: any }) {
  if (!data.fotoInisial) return null;

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Foto (Parallax Effect sederhana dengan fixed) */}
      <div className="absolute inset-0 bg-fixed">
        <Image 
          src={urlFor(data.fotoInisial).width(1200).url()} 
          alt="Couple Moment" 
          fill 
          className="object-cover object-center"
        />
        {/* Overlay Gelap agar inisial terbaca */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Teks Inisial */}
      <div className="relative z-10 text-center text-white space-y-2">
        <p className="tracking-[0.5em] text-xs uppercase opacity-80">We Are Getting Married</p>
        <h2 className="font-script text-8xl md:text-9xl drop-shadow-lg">
          {data.namaPria.charAt(0)} <span className="text-4xl align-middle font-serif">&</span> {data.namaWanita.charAt(0)}
        </h2>
        <p className="font-serif text-xl tracking-widest mt-4">
          {new Date(data.tanggal).toLocaleDateString("id-ID", { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </section>
  );
}