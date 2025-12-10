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
    defineField({
      name: 'waktu',
      title: 'Waktu Kirim',
      type: 'datetime',
      initialValue: () => new Date().toISOString(), // Otomatis isi waktu sekarang
    }),
  ],
})