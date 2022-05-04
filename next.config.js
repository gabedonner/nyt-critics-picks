/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static01.nyt.com', 'reqres.in'],
  },
  env: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
}

module.exports = nextConfig
