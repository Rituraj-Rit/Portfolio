import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
   {
    value: "20+",
    label: "Projects Completed",
  },
  {
    value: "500+",
    label: "DSA Problems Solved",
  },
  {
    value: "5+",
    label: "AI Projects",
  },
  {
    value: "3+",
    label: "Years Learning",
  },
]

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats-row" ref={sectionRef}>
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card glass-panel">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
