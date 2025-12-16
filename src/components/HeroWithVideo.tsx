'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from "@/sanity/image"
import WelcomeOverlay from "@/components/WelcomeOverlay"

interface HeroProps {
  mempelai: any;
  videoDesktopUrl: string | null;
  videoMobileUrl: string | null;
  audioUrl: string | null; // Tambah prop audio
}

export default function HeroWithVideo({ mempelai, videoDesktopUrl, videoMobileUrl, audioUrl }: HeroProps) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false); // Tombol musik muncul setelah buka undangan

  // 1. Fungsi saat tombol "Buka Undangan" diklik
  const handleOpenInvitation = () => {
    // Putar Video
    if (desktopVideoRef.current) desktopVideoRef.current.play();
    if (mobileVideoRef.current) mobileVideoRef.current.play();
    
    // Putar Musik
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Volume 60% agar tidak kaget
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      setIsPlaying(true);
    }

    // Tampilkan tombol musik
    setShowButton(true);
  };

  // 2. Fungsi Toggle Pause/Play Music Manual
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Element Audio Tersembunyi */}
      {audioUrl && (
        <audio ref={audioRef} loop>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}

      {/* Floating Music Button (Muncul setelah dibuka) */}
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
         <button 
           onClick={toggleMusic}
           className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-wedding-primary/20 bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-wedding-primary transition-all ${isPlaying ? 'animate-spin-slow' : ''}`}
           style={{ animationDuration: '3s' }}
         >
           {isPlaying ? (
             // Icon Pause (Sound Wave)
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
           ) : (
             // Icon Play (Muted)
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
           )}
         </button>
      </div>

      {/* Kirim handleOpenInvitation ke Overlay */}
      <WelcomeOverlay mempelai={mempelai} onOpen={handleOpenInvitation} />

      {/* Hero Section (Video Background) */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            {/* Video Mobile */}
            {videoMobileUrl && (
              <video 
                ref={mobileVideoRef}
                className="block md:hidden w-full h-full object-cover"
                loop muted playsInline
                poster={mempelai.fotoSampul ? urlFor(mempelai.fotoSampul).width(600).url() : undefined} 
              >
                <source src={videoMobileUrl} type="video/mp4" />
              </video>
            )}

            {/* Video Desktop */}
            {videoDesktopUrl && (
              <video 
                ref={desktopVideoRef}
                className="hidden md:block w-full h-full object-cover"
                loop muted playsInline
                poster={mempelai.fotoSampul ? urlFor(mempelai.fotoSampul).width(1200).url() : undefined}
              >
                <source src={videoDesktopUrl} type="video/mp4" />
              </video>
            )}

            {/* Fallback Foto */}
            {(!videoMobileUrl && !videoDesktopUrl && mempelai.fotoSampul) && (
               <Image 
                 src={urlFor(mempelai.fotoSampul).width(1200).url()} 
                 alt="Cover" fill className="object-cover" priority
               />
            )}
        </div>
      </section>
    </>
  )
}