/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'cakto-marketing.com'],
  },
  env: {
    CUSTOM_KEY: 'value',
  },
}

module.exports = nextConfig