import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mempelai',
  title: 'Data Pernikahan',
  type: 'document',
  fields: [
    // --- 1. COVER DEPAN ---
    defineField({ name: 'namaPria', title: 'Nama Panggilan Pria', type: 'string' }),
    defineField({ name: 'namaWanita', title: 'Nama Panggilan Wanita', type: 'string' }),
    defineField({ name: 'tanggal', title: 'Tanggal Acara', type: 'date', options: { dateFormat: 'DD-MM-YYYY' } }),
    defineField({ 
      name: 'videoDesktop', 
      title: 'Video Cover (Desktop/Laptop - Landscape)', 
      type: 'file', 
      options: { accept: 'video/mp4' } 
    }),
    defineField({ 
      name: 'videoMobile', 
      title: 'Video Cover (HP - Portrait)', 
      type: 'file', 
      options: { accept: 'video/mp4' } 
    }),
    defineField({ 
      name: 'audio', 
      title: 'Lagu Latar (Backsound)', 
      type: 'file', 
      options: { accept: 'audio/*' } 
    }),
    defineField({ name: 'fotoSampul', title: 'Foto Cover Utama', type: 'image', options: { hotspot: true } }),

    defineField({ 
      name: 'fotoSampulMobile', 
      title: 'Foto Cover Mobile (HP/Portrait)', 
      type: 'image', 
      description: 'Khusus untuk tampilan HP agar foto tidak terpotong.',
      options: { hotspot: true } 
    }),

    // --- 2. QURAN & INISIAL (BARU!) ---
    defineField({ 
      name: 'fotoInisial', 
      title: 'Foto Section Inisial', 
      type: 'image', 
      description: 'Foto romantis untuk divider (pemisah) antar section',
      options: { hotspot: true } 
    }),

    // --- 3. PROFIL MEMPELAI ---
    defineField({ name: 'namaLengkapPria', title: 'Nama Lengkap Pria', type: 'string' }),
    defineField({ name: 'fotoPria', title: 'Foto Profil Pria', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'namaAyahPria', title: 'Nama Ayah Pria', type: 'string' }),
    defineField({ name: 'namaIbuPria', title: 'Nama Ibu Pria', type: 'string' }),

    defineField({ name: 'namaLengkapWanita', title: 'Nama Lengkap Wanita', type: 'string' }),
    defineField({ name: 'fotoWanita', title: 'Foto Profil Wanita', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'namaAyahWanita', title: 'Nama Ayah Wanita', type: 'string' }),
    defineField({ name: 'namaIbuWanita', title: 'Nama Ibu Wanita', type: 'string' }),

    // --- 4. LOVE STORY (BARU!) ---
    defineField({
      name: 'loveStory',
      title: 'Kisah Cinta (Love Story)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tahun', title: 'Tahun / Tanggal', type: 'string' }),
            defineField({ name: 'judul', title: 'Judul Momen (Contoh: First Meet)', type: 'string' }),
            defineField({ name: 'cerita', title: 'Cerita Singkat', type: 'text' }),
            defineField({ name: 'foto', title: 'Foto Momen', type: 'image' })
          ]
        }
      ]
    }),

    // --- 5. DATA ACARA ---
    defineField({ name: 'waktuAkad', title: 'Waktu Akad', type: 'datetime' }),
    defineField({ name: 'lokasiAkad', title: 'Lokasi Akad', type: 'string' }),
    defineField({ name: 'alamatAkad', title: 'Alamat Akad', type: 'text' }),
    defineField({ name: 'mapsAkad', title: 'Link Maps Akad', type: 'url' }),

    defineField({ name: 'waktuResepsi', title: 'Waktu Resepsi', type: 'datetime' }),
    defineField({ name: 'lokasiResepsi', title: 'Lokasi Resepsi', type: 'string' }),
    defineField({ name: 'alamatResepsi', title: 'Alamat Resepsi', type: 'text' }),
    defineField({ name: 'mapsResepsi', title: 'Link Maps Resepsi', type: 'url' }),

    // --- 6. AMPLOP & GALERI ---
    defineField({ name: 'bank1', title: 'Nama Bank 1', type: 'string' }),
    defineField({ name: 'norek1', title: 'No Rekening 1', type: 'string' }),
    defineField({ name: 'atasnama1', title: 'Atas Nama 1', type: 'string' }),
    defineField({ name: 'bank2', title: 'Nama Bank 2', type: 'string' }),
    defineField({ name: 'norek2', title: 'No Rekening 2', type: 'string' }),
    defineField({ name: 'atasnama2', title: 'Atas Nama 2', type: 'string' }),
    defineField({ name: 'alamatKado', title: 'Alamat Kado', type: 'text' }),
    
    defineField({
      name: 'galeri',
      title: 'Galeri Foto',
      type: 'array',
      options: {
        layout: 'grid', // Membuat tampilannya rapi berbentuk grid di Sanity
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'ukuran',
              title: 'Ukuran Bingkai (Grid)',
              type: 'string',
              description: 'Pilih ukuran foto ini saat ditampilkan di website.',
              options: {
                list: [
                  { title: 'Standar (1 Kotak)', value: 'standar' },
                  { title: 'Lebar (Makan 2 Kolom)', value: 'lebar' },
                  { title: 'Tinggi (Makan 2 Baris)', value: 'tinggi' },
                ],
                layout: 'radio',
              },
              initialValue: 'standar', // Default ukuran
            }
          ]
        }
      ]
    }),

    // --- 7. FOOTER / PENUTUP ---
    defineField({
      name: 'fotoPenutup',
      title: 'Foto Penutup (Footer)',
      type: 'image',
      description: 'Foto yang akan tampil di bagian paling bawah undangan (Terima Kasih).',
      options: {
        hotspot: true,
      },
    }),
  ],
})