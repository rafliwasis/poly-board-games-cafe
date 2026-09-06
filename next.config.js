/**
 * Rewrites so the clean path `/menu` serves the static `/menu.html` in `public/`.
 */
module.exports = {
  async rewrites() {
    return [
      { source: '/menu', destination: '/menu.html' }
    ]
  }
}
