'use client'

import { kirimUcapan } from "@/app/actions" // Import fungsi server tadi
import { useRef, useState } from "react"

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
    <section className="py-20 px-4 bg-wedding-bg">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-script text-wedding-secondary text-center mb-10">
          Wishes & Prayers
        </h2>

        {/* --- FORMULIR --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-12">
          <form 
            ref={formRef}
            action={handleAction} 
            className="flex flex-col gap-4"
          >
            <input 
              name="nama"
              type="text" 
              placeholder="Nama Anda" 
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-primary"
              required
            />
            <textarea 
              name="pesan"
              placeholder="Tulis ucapan & doa..." 
              rows={3}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-primary"
              required
            ></textarea>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-wedding-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 transition"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
            </button>

            {status && (
              <p className="text-center text-sm font-semibold text-wedding-secondary mt-2 animate-pulse">
                {status}
              </p>
            )}
          </form>
        </div>

        {/* --- DAFTAR UCAPAN --- */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {ucapan.length === 0 && (
            <p className="text-center text-gray-500 italic">Belum ada ucapan. Jadilah yang pertama mengirim!</p>
          )}

          {ucapan.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-wedding-secondary">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">{item.nama}</h4>
                <span className="text-xs text-gray-400">
                  {new Date(item.waktu).toLocaleDateString('id-ID')}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.pesan}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}