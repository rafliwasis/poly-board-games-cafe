import { useEffect } from 'react'

export default function StaticPageRedirect({ destination, label }) {
  useEffect(() => {
    window.location.replace(destination)
  }, [destination])

  return (
    <noscript>
      JavaScript is required for this preview. <a href={destination}>Open {label}</a>.
    </noscript>
  )
}
