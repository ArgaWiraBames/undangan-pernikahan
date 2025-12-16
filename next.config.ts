import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // PERUBAHAN DI SINI:
  // Tidak perlu lagi dibungkus 'experimental'. 
  // Langsung tulis di root config dengan nama baru 'serverExternalPackages'.
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
};

export default nextConfig;