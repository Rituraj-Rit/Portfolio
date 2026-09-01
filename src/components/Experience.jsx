import { useEffect, useRef } from 'react'
import { experiences } from '../constants/content'

export default function Experience() {
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
    <section id="experience" className="section-block reveal" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Progress shaped by curiosity, craft, and consistency.</h2>
      </div>
      <div className="timeline">
        {experiences.map((item, index) => (
          <div key={item.title} className={`timeline-card glass-panel reveal ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot" />
            <div>
              <p className="timeline-period">{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
