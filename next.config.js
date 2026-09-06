/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/about', destination: '/about.html' },
        { source: '/menu', destination: '/menu.html' },
        { source: '/reservation', destination: '/reservation.html' }
      ],
      afterFiles: [],
      fallback: []
    }
  }
}

module.exports = nextConfig
