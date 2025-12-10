import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mempelai',
  title: 'Data Pernikahan',
  type: 'document',
  fields: [
    // --- 1. DATA MEMPELAI ---
    defineField({ name: 'namaPria', title: 'Nama Pria', type: 'string' }),
    defineField({ name: 'namaWanita', title: 'Nama Wanita', type: 'string' }),
    defineField({ name: 'fotoSampul', title: 'Foto Utama', type: 'image', options: { hotspot: true } }),

    // --- 2. DATA AKAD ---
    defineField({ name: 'waktuAkad', title: 'Waktu Akad', type: 'datetime' }),
    defineField({ name: 'lokasiAkad', title: 'Nama Tempat Akad', type: 'string' }),
    defineField({ name: 'alamatAkad', title: 'Alamat Akad', type: 'text' }),
    defineField({ name: 'mapsAkad', title: 'Link Maps Akad', type: 'url' }),

    // --- 3. DATA RESEPSI ---
    defineField({ name: 'waktuResepsi', title: 'Waktu Resepsi', type: 'datetime' }),
    defineField({ name: 'lokasiResepsi', title: 'Nama Tempat Resepsi', type: 'string' }),
    defineField({ name: 'alamatResepsi', title: 'Alamat Resepsi', type: 'text' }),
    defineField({ name: 'mapsResepsi', title: 'Link Maps Resepsi', type: 'url' }),

    // --- 4. BARU: GALERI FOTO (Array of Images) ---
    defineField({
      name: 'galeri',
      title: 'Galeri Foto Prewedding',
      type: 'array', // Tipe array artinya bisa menampung banyak item
      of: [
        { 
          type: 'image',
          options: { hotspot: true } 
        }
      ],
      options: {
        layout: 'grid' // Tampilan di admin nanti bentuknya grid
      }
    }),
  ],
})