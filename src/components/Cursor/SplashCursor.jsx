import { useEffect, useRef } from 'react'

export default function SplashCursor() {
  const pointerRef = useRef(null)

  useEffect(() => {
    const pointer = pointerRef.current
    if (!pointer) return undefined

    const mediaQuery = window.matchMedia('(pointer: coarse)')
    if (mediaQuery.matches) {
      pointer.style.display = 'none'
      return undefined
    }

    let frameId = null
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const onMove = (event) => {
      targetX = event.clientX - 16
      targetY = event.clientY - 16
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      pointer.style.transform = `translate(${currentX}px, ${currentY}px)`
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    window.addEventListener('pointermove', onMove)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <div ref={pointerRef} className="splash-cursor" aria-hidden="true" />
}
