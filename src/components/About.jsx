import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import portrait from "../assets/hero.png";
import portrait from "../img/about image.png";


gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".about-copy > *", {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-grid" ref={sectionRef}>
      <div className="section-media glass-panel">
        <img src={portrait} alt="About Rituraj" />
      </div>
      <div className="about-copy">
        <p className="eyebrow">About me</p>
        <h2>
          I build expressive, high-performance products that feel effortless and
          memorable.
        </h2>
        <p>
          I'm a passionate Full-Stack Developer focused on building modern,
          high-performance web applications with React, Node.js, Express,
          MongoDB, and AI integrations. I enjoy creating responsive interfaces,
          smooth animations with GSAP, and scalable backend systems that solve
          real-world problems. I'm constantly learning new technologies and
          turning ideas into products that are fast, user-friendly, and
          impactful.
        </p>
        <br />
        <p>
          My mission is to build applications that combine clean design, powerful functionality, and exceptional user experiences.
        </p>
      </div>
    </section>
  );
}
