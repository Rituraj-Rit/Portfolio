import { useRef } from 'react'
import { gsap } from 'gsap'
import { FiExternalLink } from 'react-icons/fi'

export default function CertificateCard({ certificate, onOpen }) {
  const cardRef = useRef(null)

  const handleHover = (isEntering) => {
    if (!cardRef.current) return

    gsap.to(cardRef.current, {
      y: isEntering ? -6 : 0,
      scale: isEntering ? 1.01 : 1,
      boxShadow: isEntering ? '0 24px 90px rgba(82, 39, 255, 0.22)' : '0 16px 80px rgba(0, 0, 0, 0.32)',
      duration: 0.28,
      ease: 'power2.out',
    })
  }

  return (
    <article
      ref={cardRef}
      className="certificate-card glass-panel"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="certificate-card-media">
        <img src={certificate.image} alt={certificate.company} loading="lazy" decoding="async" />
      </div>

      <div className="certificate-card-content">
        <div className="certificate-card-header">
          <p className="certificate-company">{certificate.company}</p>
          <span className="certificate-location">{certificate.location}</span>
        </div>

        <p className="certificate-date">
          {certificate.startDate} – {certificate.endDate}
        </p>

        <div className="certificate-chips-wrap">
          <span className="certificate-section-label">Technologies</span>
          <div className="certificate-chip-group">
            {certificate.technologies.map((tech) => (
              <span key={tech} className="certificate-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="certificate-chips-wrap">
          <span className="certificate-section-label">Skills Gained</span>
          <div className="certificate-chip-group">
            {certificate.skills.map((skill) => (
              <span key={skill} className="certificate-chip secondary">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button type="button" className="button secondary certificate-view-btn" onClick={() => onOpen(certificate)}>
          <FiExternalLink />
          View Certificate
        </button>
      </div>
    </article>
  )
}
