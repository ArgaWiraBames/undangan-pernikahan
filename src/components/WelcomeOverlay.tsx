'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function WelcomeOverlay({ mempelai }: { mempelai: any }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Ambil parameter "?to=NamaTamu" dari URL
  const searchParams = useSearchParams()
  const namaTamu = searchParams.get('to') || "Tamu Undangan"

  // Kunci scroll saat cover masih terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const bukaUndangan = () => {
    setIsOpen(false)
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      {/* --- 1. OVERLAY FULL SCREEN --- */}
      <div 
        className={`fixed inset-0 z-50 bg-wedding-bg flex flex-col items-center justify-center text-center transition-transform duration-1000 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Background Foto Samar */}
        {mempelai.fotoSampul && (
          <div className="absolute inset-0 opacity-20">
            <Image 
               src={urlFor(mempelai.fotoSampul).width(800).url()} 
               alt="Background"
               fill
               className="object-cover grayscale"
            />
          </div>
        )}

        <div className="relative z-10 px-6">
          <h3 className="text-xl tracking-widest text-gray-600 mb-4">THE WEDDING OF</h3>
          
          <div className="font-serif text-5xl text-wedding-primary mb-8">
            <p>{mempelai.namaPria}</p>
            <span className="font-script text-4xl text-wedding-secondary">&</span>
            <p>{mempelai.namaWanita}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-wedding-secondary/30">
            <p className="text-gray-600 text-sm mb-2">Kepada Yth Bapak/Ibu/Saudara/i:</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
              {namaTamu}
            </h2>
            
            <button 
              onClick={bukaUndangan}
              className="bg-wedding-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Buka Undangan
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. TOMBOL MUSIK MENGAMBANG --- */}
      {!isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-white p-3 rounded-full shadow-xl border border-gray-200 animate-spin-slow"
          style={{ animationDuration: '3s', animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-wedding-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          )}
        </button>
      )}

      {/* Audio Element (Tersembunyi) */}
      <audio ref={audioRef} src="/musik.mp3" loop />
    </>
  )
}