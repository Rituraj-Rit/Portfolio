import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const name = 'RITURAJ'.split('')

  useEffect(() => {
    const timeline = gsap.timeline({ onComplete })
    const interval = setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : value + 8))
    }, 120)

    timeline.to('.loader-word span', {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
    })

    timeline.to('.loader-bar', {
      width: '100%',
      duration: 1.4,
      ease: 'power2.inOut',
    }, '-=0.3')

    timeline.to('.loader-screen', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.style.overflow = 'auto'
      },
    })

    return () => {
      clearInterval(interval)
      timeline.kill()
    }
  }, [onComplete])

  return (
    <div className="loader-screen">
      <div className="loader-card">
        <div className="loader-word" aria-label="Rituraj Verma">
          {name.map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
        <div className="loader-progress">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <p>{progress}%</p>
      </div>
    </div>
  )
}
