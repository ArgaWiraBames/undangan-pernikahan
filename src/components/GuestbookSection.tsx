'use client'

import { kirimUcapan } from "@/app/actions"
import { useRef, useState } from "react"
import Image from "next/image";

export default function GuestbookSection({ ucapan }: { ucapan: any[] }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleAction(formData: FormData) {
    setIsSubmitting(true)
    const result = await kirimUcapan(formData)
    setIsSubmitting(false)

    if (result?.error) {
      setStatus(result.error)
    } else {
      setStatus("Terima kasih! Doa Anda berhasil terkirim.")
      formRef.current?.reset() // Kosongkan form setelah kirim
    }
    
    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => setStatus(null), 3000)
  }

  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      
      {/* --- OPSI 4: CSS CUSTOM SCROLLBAR --- */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb; /* gray-50 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb; /* gray-200 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db; /* gray-300 */
        }
      `}</style>

      {/* HIASAN BUNGA BAWAH KIRI (Bawaan) */}
      <div className="absolute bottom-0 left-0 w-32 md:w-48 opacity-40 pointer-events-none z-0">
         <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={200} height={200} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* --- JUDUL & OPSI 3 (ORNAMEN BAWAH JUDUL) --- */}
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="font-script text-5xl md:text-6xl text-wedding-primary mb-4">Wishes & Prayers</h2>
          <div className="flex justify-center opacity-70">
             <Image src="/decor/bunga-tengah.png" alt="Divider" width={120} height={60} className="w-24 md:w-32 object-contain" />
          </div>
        </div>

        {/* --- OPSI 1: FORMULIR ALA SURAT (ENVELOPE) --- */}
        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl mb-16 border border-gray-100 animate-fade-up delay-100">
          <div className="border-2 border-dashed border-wedding-secondary/40 rounded-xl p-6 md:p-8 bg-[#faeee0]/20">
            <form 
              ref={formRef}
              action={handleAction} 
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-wedding-primary ml-1">Nama Anda</label>
                <input 
                  name="nama"
                  type="text" 
                  placeholder="Tulis nama Anda di sini..." 
                  className="border-b-2 border-wedding-secondary/30 bg-transparent p-2 focus:outline-none focus:border-b-wedding-primary transition-colors font-serif"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-wedding-primary ml-1">Pesan & Doa</label>
                <textarea 
                  name="pesan"
                  placeholder="Tuliskan ucapan manis untuk kedua mempelai..." 
                  rows={3}
                  className="border-2 border-wedding-secondary/30 bg-white/50 p-4 rounded-xl focus:outline-none focus:border-wedding-primary transition-colors font-serif resize-none"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 bg-wedding-primary text-white py-3 px-10 rounded-full font-bold uppercase tracking-widest hover:bg-wedding-secondary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md self-center"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
              </button>

              {status && (
                <p className="text-center text-sm font-semibold text-wedding-secondary mt-2 animate-fade-up">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* --- KOTAK DAFTAR UCAPAN --- */}
        <div className="relative bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-inner animate-fade-up delay-200 overflow-hidden">
          
          {/* --- OPSI 5: WATERMARK TRANSPARAN DI BELAKANG --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0 w-[300px] md:w-[400px]">
            <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Watermark" width={400} height={400} className="object-contain" />
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar relative z-10">
            {ucapan.length === 0 && (
              <p className="text-center text-gray-400 font-serif italic py-10">Belum ada ucapan. Jadilah yang pertama mengirim doa untuk mempelai!</p>
            )}

            {ucapan.map((item, i) => (
              // --- OPSI 2: KARTU KUTIPAN (QUOTE CARDS) ---
              <div key={i} className="relative bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                
                {/* Ikon Tanda Kutip Background */}
                <div className="absolute top-2 right-6 opacity-5 text-wedding-primary font-serif text-7xl pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  "
                </div>

                <div className="flex justify-between items-end mb-3 border-b border-gray-50 pb-2">
                  <h4 className="font-bold text-wedding-primary text-lg">{item.nama}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">
                    {new Date(item.waktu).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-serif italic relative z-10">
                  "{item.pesan}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}