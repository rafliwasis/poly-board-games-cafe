import { useEffect } from 'react'

export default function Reservation() {
  useEffect(() => {
    window.location.replace('/reservation.html')
  }, [])

  return null
}
