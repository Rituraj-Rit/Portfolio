import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillList } from '../constants/content'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
      gsap.from('.skill-chip', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="section-block" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2 className="skills-title">A toolkit for crafting modern digital products.</h2>
      </div>
      <div className="skills-grid">
        {skillList.map((skill) => (
          <div key={skill} className="skill-chip">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}
