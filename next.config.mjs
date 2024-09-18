/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:slug',
        destination: '/profile/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
