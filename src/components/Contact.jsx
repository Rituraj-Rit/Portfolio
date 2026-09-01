import { useEffect, useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import { useContactForm } from '../hooks/useContactForm'

const socials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Rituraj-Rit' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rituraj-kumar-verma-785b3b19a/' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:riturajverma340@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [toast, setToast] = useState(null)
  const { values, errors, isSubmitting, handleChange, submitForm } = useContactForm()

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

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleSubmit = async (event) => {
    const result = await submitForm(event)

    if (result.success) {
      setToast('Message sent successfully.')
    } else if (!result.validationFailed) {
      setToast('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-block reveal" ref={sectionRef}>
      <div className="contact-card glass-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build something extraordinary.</h2>
          <p>Available for ambitious brands, founders, and ambitious teams that want bold digital experiences.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input name="name" placeholder="Name" value={values.name} onChange={handleChange} />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
          <input name="email" placeholder="Email" type="email" value={values.email} onChange={handleChange} />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
          <textarea name="message" placeholder="Message" rows="4" value={values.message} onChange={handleChange} />
          {errors.message ? <span className="field-error">{errors.message}</span> : null}
          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : <>Send Message <FiSend /></>}
          </button>
        </form>
        <div className="social-row">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      {toast ? <div className="contact-toast">{toast}</div> : null}
    </section>
  )
}
