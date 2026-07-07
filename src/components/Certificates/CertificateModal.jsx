import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiX } from 'react-icons/fi'

export default function CertificateModal({ certificate, isOpen, onClose }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 })
      .fromTo(contentRef.current, { opacity: 0, scale: 0.96, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [isOpen, onClose])

  if (!isOpen || !certificate) return null

  return (
    <div className="certificate-modal-backdrop" ref={modalRef} onClick={onClose}>
      <div className="certificate-modal" ref={contentRef} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={certificate.company}>
        <button type="button" className="certificate-modal-close" onClick={onClose} aria-label="Close certificate preview">
          <FiX />
        </button>

        <div className="certificate-modal-media">
          <img src={certificate.image} alt={certificate.company} loading="eager" />
        </div>

        <div className="certificate-modal-details">
          <p className="eyebrow">Certificate Preview</p>
          <h3>{certificate.company}</h3>
          <p className="certificate-date">{certificate.startDate} – {certificate.endDate}</p>
          <p className="certificate-location">{certificate.location}</p>
          <div className="certificate-chip-group">
            {certificate.technologies.map((tech) => (
              <span key={tech} className="certificate-chip">{tech}</span>
            ))}
          </div>
          <div className="certificate-chip-group">
            {certificate.skills.map((skill) => (
              <span key={skill} className="certificate-chip secondary">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
