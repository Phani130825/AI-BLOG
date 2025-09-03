/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    appDir: false, // Using pages directory
  },
}

module.exports = nextConfig
