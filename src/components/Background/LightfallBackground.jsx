import { useEffect, useRef } from 'react'

export default function LightfallBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let frame = 0

    const draw = () => {
      const { width, height } = canvas
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(width * 0.2, height * 0.2, 0, width * 0.2, height * 0.2, width * 0.9)
      gradient.addColorStop(0, 'rgba(166, 200, 255, 0.3)')
      gradient.addColorStop(0.5, 'rgba(82, 39, 255, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 159, 252, 0.08)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath()
        ctx.moveTo(-100, height * (0.25 + i * 0.2))
        ctx.quadraticCurveTo(width * 0.5, height * (0.1 + i * 0.16) - Math.sin(frame / 150 + i) * 80, width + 100, height * (0.3 + i * 0.2))
        ctx.strokeStyle = ['rgba(166,200,255,0.22)', 'rgba(82,39,255,0.2)', 'rgba(255,159,252,0.14)'][i]
        ctx.lineWidth = 1.2 + i * 0.4
        ctx.stroke()
      }
      ctx.restore()

      frame += 1
      window.requestAnimationFrame(draw)
    }

    draw()
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="lightfall-background" aria-hidden="true" />
}
