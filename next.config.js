/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [],
    unoptimized: true
  },
  serverExternalPackages: []
}

module.exports = nextConfig 