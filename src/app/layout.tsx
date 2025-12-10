import type { Metadata } from "next";
// 1. Import Font dari Google
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

// 2. Konfigurasi Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Ini akan masuk ke variabel CSS Tailwind
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

// 3. Metadata (Judul & Deskripsi untuk Link WA)
export const metadata: Metadata = {
  title: "The Wedding of Romeo & Juliet", // Ganti sesuai nama pengantin
  description: "Kami mengundang Anda untuk hadir di momen bahagia kami.",
  icons: {
    icon: "/favicon.ico", // Pastikan ada file icon jika mau
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 4. Masukkan variabel font ke dalam tag HTML
    <html lang="id" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}