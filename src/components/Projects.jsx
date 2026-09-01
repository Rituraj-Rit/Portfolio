import { useEffect, useRef } from 'react'
import { projects } from '../constants/content'

export default function Projects() {
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
    <section id="projects" className="section-block reveal" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Projects that blend intelligence, motion, and product focus.</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card glass-panel reveal">
            <img src={project.image} alt={project.title} />
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="badge-row">
                {project.stack.map((item) => (
                  <span key={item} className="badge">{item}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
