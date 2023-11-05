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
      }
    ]
  }, 
  experimental: {
    
  },
}

module.exports = nextConfig
