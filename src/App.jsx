import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll/dist/locomotive-scroll.mjs'
import 'locomotive-scroll/dist/locomotive-scroll.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Services from './components/Services'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashCursor from './components/Cursor/SplashCursor'
import LightfallBackground from './components/Background/LightfallBackground'
import Loader from './components/Loader'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    if (!scrollRef.current) return undefined

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    })

    const handleResize = () => scroll.update()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      scroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} className="app-shell" data-scroll-container>
      {loading ? <Loader onComplete={() => setLoading(false)} /> : null}
      <LightfallBackground />
      <SplashCursor />
      <Navbar />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8" data-scroll-section>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Experience />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
