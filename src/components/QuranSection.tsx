import { FloralCorner } from "@/components/Icons"; // Opsional, untuk hiasan sudut samar

export default function QuranSection({ data }: { data: any }) {
  return (
    // UBAH: bg-wedding-primary (Warna Merah Bata Full) & text-white
    <section className="relative py-20 px-6 bg-wedding-primary text-white text-center flex flex-col items-center justify-center overflow-hidden">
      
      {/* Hiasan Bunga Samar (Opacity rendah agar tidak mengganggu) */}
      <div className="absolute top-0 left-0 opacity-10">
         <FloralCorner className="w-32 h-32 -translate-x-10 -translate-y-10 rotate-180" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-10">
         <FloralCorner className="w-32 h-32 translate-x-10 translate-y-10" />
      </div>

      <div className="max-w-2xl z-10 space-y-6">
        
        {/* Bismillah */}
        <p className="font-script text-4xl md:text-5xl opacity-90">
          Bismillahirrahmanirrahim
        </p>

        {/* Garis Pemisah Kecil */}
        <div className="w-20 h-[1px] bg-white/40 mx-auto"></div>

        {/* Label Surat */}
        <p className="font-serif text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
          QS. Ar-Rum : 21
        </p>
        
        {/* Ayat Arab */}
        <p className="font-serif text-2xl md:text-3xl leading-loose py-2" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
        </p>

        {/* Terjemahan */}
        <p className="text-white/80 text-xs md:text-sm leading-relaxed italic px-4 font-light">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
      </div>
    </section>
  )
}