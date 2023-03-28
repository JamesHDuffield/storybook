/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiUrl: process.env.API_URL, // Propogate from build to client side
  }
}

module.exports = nextConfig
