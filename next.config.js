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
      {
        protocol: 'https',
        hostname: 'yummytummyaarthi.com',
      }, 
      {
        protocol: 'https',
        hostname: 'yuhttps.com',
      }, 
    ]
  }, 
  experimental: {
    
  },
}

module.exports = nextConfig
