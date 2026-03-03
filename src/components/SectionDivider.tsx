import Image from "next/image";

export default function SectionDivider() {
  return (
    <div className="relative w-full h-[60px] md:h-[100px] overflow-hidden">
       {/* 1. ARCH SHAPE (Downward facing white curve) */}
       {/* SVG ini membuat bentuk kubah putih yang memotong warna krem background */}
       <div className="absolute inset-0 z-0">
          <svg 
            viewBox="0 0 1440 320" 
            className="absolute top-0 w-full h-full" 
            preserveAspectRatio="none"
          >
             {/* Bentuk putih yang memotong warna krem */}
             <path 
               fill="#FFFFFF" 
               fillOpacity="1" 
               d="M0,0 C240,160 480,240 720,240 C960,240 1200,160 1440,0 L1440,0 L0,0 Z"
             ></path>
          </svg>
       </div>

       {/* 2. ORNAMEN TENGAH (bunga-tengah) */}
       {/* Memakai bunga yang sama dengan Love Story di tengah-tengah divider */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Image 
            src="/decor/bunga-tengah.png" 
            alt="Separator" 
            width={150} height={75} 
            className="w-16 md:w-24 h-auto opacity-70 drop-shadow-sm"
          />
       </div>
    </div>
  );
}