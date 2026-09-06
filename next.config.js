/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home-static.html' },
        { source: '/about', destination: '/about-static.html' },
        { source: '/menu', destination: '/menu-static.html' },
        { source: '/reservation', destination: '/reservation-static.html' }
      ],
      afterFiles: [],
      fallback: []
    }
  }
}

module.exports = nextConfig
