'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function WelcomeOverlay({ mempelai, onOpen }: { mempelai: any, onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleOpen = () => {
    setIsOpen(true)
    if (onOpen) onOpen();
    setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-wedding-bg text-wedding-primary transition-transform duration-1000 ease-in-out ${isOpen ? '-translate-y-full' : 'translate-y-0'} px-6`}
    >
        {/* CONTAINER UTAMA */}
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto gap-6 md:gap-8">

            {/* 1. FOTO BULAT */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[4px] border-white shadow-xl animate-fade-up">
              {mempelai.fotoSampul && (
                <Image 
                  src={urlFor(mempelai.fotoSampul).width(400).url()} 
                  alt="Cover" fill className="object-cover"
                />
              )}
            </div>

            {/* 2. NAMA MEMPELAI (Revisi Layout Vertikal) */}
            <div className="flex flex-col items-center text-center animate-fade-up delay-100 px-2 gap-1">
              {/* Nama Pria Lengkap */}
              <h1 className="font-script text-3xl md:text-5xl leading-tight">
                {mempelai.namaLengkapPria || mempelai.namaPria}
              </h1>
              
              {/* Simbol & */}
              <span className="font-serif text-lg italic text-wedding-secondary my-1">
                &
              </span>
              
              {/* Nama Wanita Lengkap */}
              <h1 className="font-script text-3xl md:text-5xl leading-tight">
                {mempelai.namaLengkapWanita || mempelai.namaWanita}
              </h1>

              <p className="font-serif text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-70 mt-3">
                The Wedding Celebration
              </p>
            </div>
            
            {/* 3. KOTAK TAMU */}
            <div className="w-full animate-fade-up delay-200">
              <div className="bg-white/60 backdrop-blur-sm border border-wedding-secondary/30 rounded-xl p-5 text-center shadow-sm mx-6">
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 opacity-80">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <h3 className="font-serif text-lg md:text-xl text-wedding-primary font-bold">
                  Tamu Undangan
                </h3>
              </div>
            </div>

            {/* 4. TOMBOL BUKA */}
            <button 
              onClick={handleOpen}
              className="mt-2 px-8 py-3 bg-wedding-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg animate-fade-up delay-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
              Buka Undangan
            </button>

        </div>
    </div>
  )
}