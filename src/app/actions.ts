'use server'

import { createClient } from "next-sanity"
import { revalidatePath } from "next/cache"

// Client khusus yang punya izin MENULIS (pakai Token)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // <--- Ini kuncinya!
  apiVersion: "2024-01-01",
  useCdn: false,
})

export async function kirimUcapan(formData: FormData) {
  const nama = formData.get('nama')?.toString()
  const pesan = formData.get('pesan')?.toString()

  if (!nama || !pesan) {
    return { error: "Nama dan pesan wajib diisi ya!" }
  }

  try {
    // Simpan ke Sanity
    await writeClient.create({
      _type: 'ucapan',
      nama: nama,
      pesan: pesan,
      waktu: new Date().toISOString()
    })

    // Refresh halaman agar pesan baru langsung muncul
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error("Gagal kirim ucapan:", error)
    return { error: "Maaf, gagal mengirim ucapan. Coba lagi ya." }
  }
}