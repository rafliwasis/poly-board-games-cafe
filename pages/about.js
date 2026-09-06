import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    window.location.replace('/about.html')
  }, [])
  return null
}