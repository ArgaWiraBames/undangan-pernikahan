'use server'
import { client } from "@/sanity/client"
import { revalidatePath } from "next/cache" // <-- IMPORT BARU INI

export async function kirimUcapan(nama: string, pesan: string, konfirmasi: string) {
  try {
    await client.create({
      _type: 'ucapan',
      nama,
      pesan,
      konfirmasi,
      waktu: new Date().toISOString(),
    })
    
    // <-- PERINTAH BARU INI: Memaksa Next.js menyegarkan data di halaman utama
    revalidatePath('/') 
    
    return { success: true }
  } catch (error) {
    console.error("Gagal kirim ucapan:", error)
    return { error: "Gagal mengirim pesan." }
  }
}