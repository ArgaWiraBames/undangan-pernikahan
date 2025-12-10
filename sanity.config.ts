'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// 1. Import file yang baru kita buat
import mempelai from './src/sanity/schemaTypes/mempelai'
import ucapan from './src/sanity/schemaTypes/ucapan'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  name: 'Undangan_CMS',
  title: 'Admin Undangan',
  projectId,
  dataset,
  plugins: [structureTool()],

  // 2. Masukkan ke dalam daftar schema
  schema: {
    types: [mempelai, ucapan],
  },
})