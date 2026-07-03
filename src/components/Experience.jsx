import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '../constants/content'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.timeline-card', {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -40 : 40),
        duration: 0.9,
        stagger: 0.16,
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
    <section id="experience" className="section-block" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Progress shaped by curiosity, craft, and consistency.</h2>
      </div>
      <div className="timeline">
        {experiences.map((item, index) => (
          <div key={item.title} className={`timeline-card glass-panel ${index % 2 === 0 ? 'left' : 'right'}`}>
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
