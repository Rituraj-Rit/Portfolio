import { useEffect, useRef } from 'react'
import { services } from '../constants/content'

export default function Services() {
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
    <section id="services" className="section-block reveal" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>Crafting premium digital products across strategy, design, and development.</h2>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card glass-panel reveal">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
