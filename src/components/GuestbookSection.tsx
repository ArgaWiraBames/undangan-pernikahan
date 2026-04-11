'use client'

import { kirimUcapan } from "@/app/actions"
import { useRef, useState } from "react"
import Image from "next/image";

export default function GuestbookSection({ ucapan }: { ucapan: any[] }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [kehadiran, setKehadiran] = useState<string>('Hadir')

  async function handleAction(formData: FormData) {
    setIsSubmitting(true)
    
    const nama = formData.get('nama')?.toString() || 'Tanpa Nama';
    const pesan = formData.get('pesan')?.toString() || '';

    const result = await kirimUcapan(nama, pesan, kehadiran)
    
    setIsSubmitting(false)

    if (result?.error) {
      setStatus(result.error)
    } else {
      setStatus("Terima kasih! Konfirmasi Anda telah kami terima.")
      formRef.current?.reset() 
      setKehadiran('Hadir') 
    }
    
    setTimeout(() => setStatus(null), 3000)
  }

  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      
      <div className="absolute -bottom-12 -right-12 w-48 md:w-64 opacity-70 mix-blend-multiply pointer-events-none z-0 hover:scale-105 transition-transform duration-700">
         <Image src="/decor/bunga-pojok-kanan-bawah.png" alt="Decor" width={300} height={300} className="object-contain" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="font-script text-5xl md:text-6xl text-wedding-primary mb-4">Wishes & Prayers</h2>
          <div className="flex justify-center opacity-70">
             <Image src="/decor/bunga-tengah.png" alt="Divider" width={120} height={60} className="w-24 md:w-32 object-contain" />
          </div>
        </div>

        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl mb-16 border border-gray-100 animate-fade-up delay-100 relative">
          
          <div className="absolute -top-6 -left-6 w-20 md:w-28 opacity-80 pointer-events-none z-20 drop-shadow-sm">
             <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Decor Form" width={150} height={150} className="object-contain" />
          </div>

          <div className="border-2 border-dashed border-wedding-secondary/40 rounded-xl p-6 md:p-8 bg-[#faeee0]/20">
            <form ref={formRef} action={handleAction} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-wedding-primary ml-1">Nama Anda</label>
                <input name="nama" type="text" placeholder="Tulis nama Anda di sini..." className="border-b-2 border-wedding-secondary/30 bg-transparent p-2 focus:outline-none focus:border-b-wedding-primary transition-colors font-serif" required />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-wedding-primary ml-1">Konfirmasi Kehadiran</label>
                
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setKehadiran('Hadir')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${
                      kehadiran === 'Hadir' 
                        ? 'bg-wedding-primary text-white border-wedding-primary shadow-md' 
                        : 'border-wedding-secondary/30 text-gray-500 hover:border-wedding-primary/50'
                    }`}
                  >
                    <span className="text-sm font-bold">Hadir</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setKehadiran('Tidak Hadir')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${
                      kehadiran === 'Tidak Hadir' 
                        ? 'bg-red-400 text-white border-red-400 shadow-md' 
                        : 'border-wedding-secondary/30 text-gray-500 hover:border-red-400/50'
                    }`}
                  >
                    <span className="text-sm font-bold">Tidak Hadir</span>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-wedding-primary ml-1">Pesan & Doa</label>
                <textarea name="pesan" placeholder="Tuliskan ucapan manis..." rows={3} className="border-2 border-wedding-secondary/30 bg-white/50 p-4 rounded-xl focus:outline-none focus:border-wedding-primary transition-colors font-serif resize-none" required></textarea>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="mt-4 bg-wedding-primary text-white py-3 px-10 rounded-full font-bold uppercase tracking-widest hover:bg-wedding-secondary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md self-center relative z-10">
                {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
              </button>

              {status && <p className="text-center text-sm font-semibold text-wedding-secondary mt-2 animate-fade-up">{status}</p>}
            </form>
          </div>
        </div>

        <div className="relative bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-inner animate-fade-up delay-200 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0 w-[300px] md:w-[400px]">
            <Image src="/decor/bunga-pojok-kiri-atas.png" alt="Watermark" width={400} height={400} className="object-contain" />
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 relative z-10">
            {ucapan.length === 0 && (
              <p className="text-center text-gray-400 font-serif italic py-10">Belum ada ucapan. Jadilah yang pertama mengirim doa untuk mempelai!</p>
            )}

            {ucapan.map((item, i) => (
              <div key={i} className="relative bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="absolute top-2 right-6 opacity-5 text-wedding-primary font-serif text-7xl pointer-events-none group-hover:scale-110 transition-transform duration-500">"</div>

                <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
                  <div>
                    <h4 className="font-bold text-wedding-primary text-lg leading-none mb-1">{item.nama}</h4>
                    {item.konfirmasi === 'Hadir' && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-green-100 text-green-700">Hadir</span>
                    )}
                    {item.konfirmasi === 'Tidak Hadir' && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-red-100 text-red-700">Tidak Hadir</span>
                    )}
                    {(!item.konfirmasi || item.konfirmasi === 'Tanpa Keterangan') && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-gray-100 text-gray-500">Tanpa Keterangan</span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                    {new Date(item.waktu).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-serif italic relative z-10">"{item.pesan}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}