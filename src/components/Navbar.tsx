import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Menu, X, ArrowUpRight, Search } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onSearchClick: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'About', id: 'about' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

function Navbar({ activeSection, onNavigate, onSearchClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] glass-glow-white'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <button
          id="navbar-brand-logo"
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/20 overflow-hidden text-white transition-all duration-500 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]">
            {/* Gloss reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Camera className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <span className="font-display font-bold text-base tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-glow">
            VASHU STUDIO
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full text-xs uppercase tracking-widest font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-4 py-1.5 font-sans text-[11px] tracking-widest font-bold uppercase rounded-full cursor-pointer transition-colors duration-300 focus:outline-none ${
                  isActive ? 'text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    id={`nav-active-bubble-${item.id}`}
                    className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 transition-colors duration-300">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Button: Start Project with Glass Spotlight Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-search-button-trigger"
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 hover:text-white hover:border-white/30 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none select-none hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
            title="Search and Navigation (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="font-sans text-[10px] tracking-normal opacity-50 bg-white/10 px-1 py-0.5 rounded">⌘K</kbd>
          </button>

          <button
            id="nav-cta-button"
            onClick={() => handleItemClick('contact')}
            className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer focus:outline-none"
          >
            <span>Start Project</span>
          </button>
        </div>

        {/* Mobile controls duo: Search + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="mobile-search-button-trigger"
            onClick={onSearchClick}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Open search index"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Refractive Glassmorphism Panel) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden absolute top-[100%] left-0 right-0 bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full py-2.5 text-left font-display text-base tracking-widest font-semibold uppercase transition-colors cursor-pointer ${
                      isActive ? 'text-white border-l-2 border-white pl-3 text-glow' : 'text-white/50 hover:text-white pl-0'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                id="mobile-nav-cta"
                onClick={() => handleItemClick('contact')}
                className="w-full mt-4 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white text-black font-semibold uppercase tracking-wider text-xs shadow-lg shadow-white/10"
              >
                <span>Start Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default memo(Navbar);
