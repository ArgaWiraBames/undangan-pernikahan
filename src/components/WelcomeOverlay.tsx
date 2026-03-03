'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { useSearchParams } from 'next/navigation' 

export default function WelcomeOverlay({ mempelai, onOpen }: { mempelai: any, onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const searchParams = useSearchParams()
  const guestName = searchParams.get('to') || "Tamu Undangan"

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-transform duration-1000 ease-in-out ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
    >
        {/* --- CSS UNTUK EFEK CINEMATIC ZOOM --- */}
        <style jsx>{`
          @keyframes cinematicZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
          .animate-ken-burns {
            animation: cinematicZoom 20s ease-out forwards;
          }
        `}</style>

        {/* --- 1. BACKGROUND IMAGE FULL SCREEN --- */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[#faeee0]">
          
          {/* FOTO DESKTOP (Juga jadi fallback jika foto mobile tidak ada) */}
          {mempelai?.fotoSampul && (
             <Image 
                src={urlFor(mempelai.fotoSampul).url()} 
                alt="Background Cover Desktop" 
                fill 
                // Jika ada foto mobile, sembunyikan foto ini di layar kecil (hidden md:block)
                className={`object-cover object-center opacity-80 animate-ken-burns ${mempelai.fotoSampulMobile ? 'hidden md:block' : ''}`} 
                priority
              />
          )}

          {/* FOTO MOBILE (Hanya muncul di layar HP) */}
          {mempelai?.fotoSampulMobile && (
             <Image 
                src={urlFor(mempelai.fotoSampulMobile).url()} 
                alt="Background Cover Mobile" 
                fill 
                className="object-cover object-center opacity-80 animate-ken-burns block md:hidden" 
                priority
              />
          )}

          {/* Fallback jika tidak ada foto sama sekali */}
          {!mempelai?.fotoSampul && !mempelai?.fotoSampulMobile && (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white/20 text-xs">
              No Cover Image
            </div>
          )}

          {/* Overlay Gelap dengan gradasi supaya tulisan terbaca sempurna */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* ORNAMEN BUNGA SUDAH DIHAPUS SESUAI PERMINTAAN */}

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto gap-8 px-6">

            {/* --- 2. JUDUL --- */}
            <div className="flex flex-col items-center text-center animate-fade-up delay-100 mt-10 md:mt-0">
              <p className="font-serif text-xs md:text-sm tracking-[0.4em] uppercase text-white/90 mb-4 drop-shadow-lg">
                The Wedding of
              </p>
              
              <h1 className="font-script text-6xl md:text-7xl leading-none text-white drop-shadow-xl">
                Hana <span className="text-4xl align-middle font-serif text-white/80 mx-2">&</span> Arga
              </h1>
            </div>
            
            {/* --- 3. KOTAK TAMU (ACRYLIC GLASSMORPHISM) --- */}
            <div className="w-full animate-fade-up delay-200 mt-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/40 rounded-2xl p-6 md:p-8 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] mx-2 relative overflow-hidden group">
                
                {/* Efek kilauan halus pada pinggiran kartu */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 pointer-events-none"></div>

                <p className="font-serif text-[10px] md:text-xs tracking-[0.2em] uppercase mb-3 text-white/90 drop-shadow-sm">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <div className="border-y border-white/30 py-3 my-2">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-bold capitalize drop-shadow-md">
                    {guestName}
                  </h3>
                </div>
                <p className="font-serif text-[10px] md:text-xs tracking-widest mt-3 text-white/80">
                  Di Tempat
                </p>
              </div>
            </div>

            {/* --- 4. TOMBOL BUKA --- */}
            <button 
              onClick={handleOpen}
              className="mt-4 px-10 py-4 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#faeee0] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-fade-up delay-300 flex items-center gap-3 group"
            >
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
              Open Invitation
            </button>

        </div>
    </div>
  )
}