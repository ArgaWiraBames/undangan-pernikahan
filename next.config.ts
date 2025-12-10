/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan konfigurasi ini
  compiler: {
    styledComponents: true,
  },
  // Mengizinkan gambar dari Sanity
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;