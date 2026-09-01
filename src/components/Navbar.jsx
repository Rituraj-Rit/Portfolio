import { useEffect, useState } from 'react'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { navigation } from '../constants/content'

export default function Navbar({ theme, onToggleTheme }) {
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
      <nav className="navbar glass-panel" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Go to home section">RKV</a>

        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="primary-navigation">
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

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  )
}
