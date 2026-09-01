import { useEffect, useRef } from 'react'
import portrait from '../img/about image.png'

export default function About() {
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
    <section id="about" className="section-grid reveal" ref={sectionRef}>
      <div className="section-media glass-panel">
        <img src={portrait} alt="About Rituraj" />
      </div>
      <div className="about-copy">
        <p className="eyebrow">About me</p>
        <h2>
          I build expressive, high-performance products that feel effortless and
          memorable.
        </h2>
        <p>
          I'm a passionate Full-Stack Developer focused on building modern,
          high-performance web applications with React, Node.js, Express,
          MongoDB, and AI integrations. I enjoy creating responsive interfaces,
          smooth animations with GSAP, and scalable backend systems that solve
          real-world problems. I'm constantly learning new technologies and
          turning ideas into products that are fast, user-friendly, and
          impactful.
        </p>
        <br />
        <p>
          My mission is to build applications that combine clean design, powerful functionality, and exceptional user experiences.
        </p>
      </div>
    </section>
  )
}
