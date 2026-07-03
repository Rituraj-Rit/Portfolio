import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SplashCursor() {
  const pointerRef = useRef(null)

  useEffect(() => {
    const pointer = pointerRef.current
    if (!pointer) return undefined

    const onMove = (event) => {
      gsap.to(pointer, {
        x: event.clientX - 16,
        y: event.clientY - 16,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={pointerRef} className="splash-cursor" aria-hidden="true" />
}
