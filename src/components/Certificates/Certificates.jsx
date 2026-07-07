import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import certificatesData from '../../constants/certificates'
import CertificateCard from './CertificateCard'
import CertificateModal from './CertificateModal'

gsap.registerPlugin(ScrollTrigger)

export default function Certificates() {
  const sectionRef = useRef(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.cert-heading', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.certificate-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleOpen = (certificate) => {
    setSelectedCertificate(certificate)
  }

  return (
    <section id="certificates" className="section-block" ref={sectionRef}>
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
