import type { Metadata } from "next";
// 1. GANTI IMPORT: Panggil Alex_Brush
import { Inter, Playfair_Display, Alex_Brush } from "next/font/google"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

// 2. INISIALISASI ALEX BRUSH
const alexBrush = Alex_Brush({ 
  weight: "400", 
  subsets: ["latin"], 
  // Tetap gunakan nama variable '--font-script' agar CSS lain tidak perlu diubah
  variable: "--font-script" 
});

export const metadata: Metadata = {
  title: "The Wedding of Arga & Hana",
  description: "Official Wedding Invitation",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* 3. MASUKKAN VARIABLE ALEX BRUSH KE BODY */}
      <body className={`${inter.variable} ${playfair.variable} ${alexBrush.variable} antialiased custom-scrollbar`}>
        {children}
      </body>
    </html>
  );
}