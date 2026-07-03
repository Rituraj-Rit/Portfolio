import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../constants/content'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.15,
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
    <section id="projects" className="section-block" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Projects that blend intelligence, motion, and product focus.</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card glass-panel">
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
