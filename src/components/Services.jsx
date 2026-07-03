import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../constants/content'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="section-block" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>Crafting premium digital products across strategy, design, and development.</h2>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card glass-panel">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
