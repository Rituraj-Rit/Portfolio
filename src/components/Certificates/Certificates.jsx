import { useEffect, useRef, useState } from 'react'
import certificatesData from '../../constants/certificates'
import CertificateCard from './CertificateCard'
import CertificateModal from './CertificateModal'

export default function Certificates() {
  const sectionRef = useRef(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

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

  const handleOpen = (certificate) => {
    setSelectedCertificate(certificate)
  }

  return (
    <section id="certificates" className="section-block reveal" ref={sectionRef}>
      <div className="glass-panel cert-section-panel">
        <div className="cert-heading">
          <p className="eyebrow">Internships & Certifications</p>
          <h2>Professional growth shaped through hands-on internships and industry-recognized certifications.</h2>
        </div>

        <div className="certificates-grid">
          {certificatesData.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      <CertificateModal certificate={selectedCertificate} isOpen={Boolean(selectedCertificate)} onClose={() => setSelectedCertificate(null)} />
    </section>
  )
}
