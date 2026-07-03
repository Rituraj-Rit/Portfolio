import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { navigation } from '../constants/content'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.45 },
    )

    navigation.forEach((item) => {
      const target = document.getElementById(item.id)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="navbar-shell">
      <nav className="navbar glass-panel">
        <a href="#home" className="brand">RKV</a>
        <button type="button" className="menu-toggle" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${active === item.id ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
