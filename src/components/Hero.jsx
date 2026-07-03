import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import profile from '../img/My image.jpeg'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline.fromTo(
      '.hero-copy > *',
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
    )
    timeline.fromTo(
      '.hero-visual',
      { opacity: 0, scale: 0.92, rotate: -6 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.2 },
      '-=0.7',
    )

    const move = (event) => {
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()
      const x = ((event.clientX - left) / width - 0.5) * 12
      const y = ((event.clientY - top) / height - 0.5) * 12
      gsap.to('.hero-visual', { rotateY: x, rotateX: -y, duration: 0.6, ease: 'power3.out' })
    }

    heroRef.current?.addEventListener('pointermove', move)
    return () => heroRef.current?.removeEventListener('pointermove', move)
  }, [])

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="hero-copy">
        <p className="eyebrow">FULL STACK DEVELOPER • AI ENGINEER</p>
        <h1 ref={titleRef}>Rituraj Kumar Verma</h1>
        <div className="typed-row" ref={subRef}>
          <span>React </span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>GSAP</span>
          <span>AI</span>
        </div>
        <p className="hero-description">
         I build modern, high-performance web applications that combine clean design, smooth interactions, and scalable architecture to deliver exceptional user experiences. 
        </p>
        <div className="hero-actions">
          <a href="#contact" className="button primary">Hire Me <FiArrowRight /></a>
          <a href="/resume.pdf" download className="button secondary">Download Resume <FiDownload /></a>
          <a href="#projects" className="button ghost">See Projects</a>
        </div>
      </div>
      <div className="hero-visual">
        <img src={profile} alt="Rituraj Kumar Verma" />
      </div>
    </section>
  )
}
