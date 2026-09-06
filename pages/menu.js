import { useEffect } from 'react'

export default function Menu() {
  useEffect(() => {
    window.location.replace('/menu.html')
  }, [])
  return null
}
