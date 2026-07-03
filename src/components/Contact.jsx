import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiSend, FiTwitter } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Rituraj-Rit' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rituraj-kumar-verma-785b3b19a/' },
  // { icon: <FiTwitter />, label: 'Twitter', href: 'https://twitter.com/' },
  // { icon: <FiInstagram />, label: 'Instagram', href: 'https://instagram.com/' },
  { icon: <FiMail />, label: 'Email', href: 'riturajverma340@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
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
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="section-block" ref={sectionRef}>
      <div className="contact-card glass-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build something extraordinary.</h2>
          <p>Available for ambitious brands, founders, and ambitious teams that want bold digital experiences.</p>
        </div>
        <form className="contact-form">
          <input placeholder="Name" />
          <input placeholder="Email" type="email" />
          <textarea placeholder="Message" rows="4" />
          <button type="submit" className="button primary">Send Message <FiSend /></button>
        </form>
        <div className="social-row">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
