import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Services from './components/Services'
import Stats from './components/Stats'
import Certificates from './components/Certificates/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashCursor from './components/Cursor/SplashCursor'
import LightfallBackground from './components/Background/LightfallBackground'
import Loader from './components/Loader'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  const savedTheme = window.localStorage.getItem('portfolio-theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'dark'
}

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <div className="app-shell">
      {loading ? <Loader onComplete={() => setLoading(false)} /> : null}
      <LightfallBackground />
      <SplashCursor />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
      />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Certificates />
        <Experience />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
