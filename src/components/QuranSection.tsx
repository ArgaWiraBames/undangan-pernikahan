import { FloralCorner } from "@/components/Icons";

export default function QuranSection() {
  return (
    <section className="relative py-20 px-6 bg-white text-center flex flex-col items-center justify-center overflow-hidden">
      {/* Ornamen Bunga Pudar */}
      <FloralCorner className="absolute top-0 left-0 w-32 h-32 text-wedding-bg opacity-50 rotate-180" />
      <FloralCorner className="absolute bottom-0 right-0 w-32 h-32 text-wedding-bg opacity-50" />

      <div className="max-w-3xl z-10 space-y-6">
        <p className="font-serif text-wedding-primary text-lg tracking-widest uppercase mb-4">QS. Ar-Rum : 21</p>
        
        {/* Teks Arab (Bisa diganti image kaligrafi jika mau lebih bagus) */}
        <p className="font-serif text-2xl md:text-3xl text-wedding-primary leading-loose" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
        </p>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed italic px-4">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
      </div>
    </section>
  )
}