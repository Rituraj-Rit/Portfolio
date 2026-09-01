import { useEffect, useRef } from 'react'

const stats = [
   {
    value: "20+",
    label: "Projects Completed",
  },
  {
    value: "100+",
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('is-visible')
            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.14 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-row reveal" ref={sectionRef}>
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card glass-panel reveal">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
