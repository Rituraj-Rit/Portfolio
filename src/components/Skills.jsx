import { useEffect, useRef } from 'react'
import { skillList } from '../constants/content'

export default function Skills() {
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
    <section id="skills" className="section-block reveal" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2 className="skills-title">A toolkit for crafting modern digital products.</h2>
      </div>
      <div className="skills-grid">
        {skillList.map((skill) => (
          <div key={skill} className="skill-chip reveal">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}
