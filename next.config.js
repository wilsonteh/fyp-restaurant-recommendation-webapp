/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      }, 
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      }, 
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }, 
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }, 
    ]
  }, 
  experimental: {
    
  },
}

module.exports = nextConfig
