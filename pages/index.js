import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Redirect to the static index.html served from /public
    window.location.replace('/index.html')
  }, [])
  return null
}
