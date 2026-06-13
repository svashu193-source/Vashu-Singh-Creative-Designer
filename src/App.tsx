import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LiquidGlow from './components/LiquidGlow';
import ScrollHUD from './components/ScrollHUD';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler targeting specific element indices
  const handleNavigate = useCallback((sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Calculate scroll offset if navbar contracting is active
      const navbarHeight = 72; // Appox py-3 padding height of scrolled navbar
      const rawOffsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: rawOffsetTop - navbarHeight,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  }, []);

  // Setup an IntersectionObserver to dynamically highlight navbar links as user scrolls
  useEffect(() => {
    const sectionIds = ['home', 'services', 'portfolio', 'about', 'testimonials', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // Trigger focus when centered in viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div id="vashu-studio-root" className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Cinematic organic grain background noise */}
      <div className="absolute inset-0 z-1 pointer-events-none glass-noise-overlay opacity-30 select-none mix-blend-overlay" />
      
      {/* 3D Atmospheric Liquid Ambient Backlighting */}
      <LiquidGlow />

      {/* Modern Interactive Scroll HUD with Custom Section Tracker */}
      <ScrollHUD activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Floating Liquid-Glass sticky navigation bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Sequential sections maps */}
      <main id="creative-lab-content" className="relative z-10">
        
        {/* Fullscreen Hero display with Interactive camera */}
        <Hero onNavigate={handleNavigate} />

        {/* Capabilities spec grids */}
        <Services />

        {/* Selected cases and slider compare photo modules */}
        <Portfolio />

        {/* Designer Profile specs and core philosophy */}
        <About />

        {/* Animated quote continuous loop swiper marquee */}
        <Testimonials />

        {/* Project intake submission deck with owner details */}
        <Contact />

      </main>

      {/* Fluid foot bar coordinates and socials */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

