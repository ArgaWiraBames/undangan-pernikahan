import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ucapan',
  title: 'Ucapan & Doa',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Pengirim',
      type: 'string',
    }),
    defineField({
      name: 'pesan',
      title: 'Pesan / Doa',
      type: 'text',
    }),
    // --- FIELD BARU: KONFIRMASI KEHADIRAN ---
    defineField({
      name: 'konfirmasi',
      title: 'Konfirmasi Kehadiran',
      type: 'string',
      options: {
        list: [
          { title: 'Hadir', value: 'Hadir' },
          { title: 'Tidak Hadir', value: 'Tidak Hadir' },
        ],
        layout: 'radio' // Menampilkan pilihan dalam bentuk radio button di Studio
      }
    }),
    defineField({
      name: 'waktu',
      title: 'Waktu Kirim',
      type: 'datetime',
      initialValue: () => new Date().toISOString(), // Otomatis isi waktu sekarang
    }),
  ],
})