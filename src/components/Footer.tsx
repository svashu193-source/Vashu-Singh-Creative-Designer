import React, { memo } from 'react';
import { Camera, Youtube, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const QUICK_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'About', id: 'about' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

const SOCIAL_LINKS = [
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'X (Twitter)' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

function Footer({ onNavigate }: FooterProps) {
  const currentYear = 2026;

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative bg-black text-white border-t border-white/[0.08]"
    >
      {/* 1. Main Footer links layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Logo brand grid segment */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none mb-6"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/20 text-white transition-all duration-300 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                <Camera className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base tracking-[0.2em] text-white">
                VASHU STUDIO
              </span>
            </button>
            
            <p className="font-sans text-xs text-white/45 max-w-sm leading-relaxed mb-6">
              An elite visual creative laboratory formulating high-retention video stories, stunning commercial retouches, and bespoke typography brand architectures.
            </p>

            {/* Social icons segment */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((soc, idx) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.08] text-white hover:text-white hover:border-white/45 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer"
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick navigation and columns */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col items-start text-left">
            <h5 className="font-mono text-[9px] text-white/35 uppercase tracking-widest block mb-6">ARCHIVAL ARCHITECTURE</h5>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="font-sans text-xs font-medium text-white/55 hover:text-white hover:text-glow transition-all duration-300 uppercase tracking-widest cursor-pointer focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications SLA contact details */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h5 className="font-mono text-[9px] text-white/35 uppercase tracking-widest block mb-6">SUPPORT INQUIRIES</h5>
            <div className="space-y-4 text-xs font-mono text-white/55">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">CREATIVE DIRECTOR:</p>
                <p className="font-sans font-semibold text-white/85 mt-1">Vashu Singh</p>
              </div>
              
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">SUPPORT DIRECT INBOX:</p>
                <p className="font-sans font-semibold text-white/85 mt-1 hover:text-white transition-colors">
                  <a href="mailto:svashu193@gmail.com">svashu193@gmail.com</a>
                </p>
              </div>

              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">AVAILABILITY SLA:</p>
                <p className="font-sans font-semibold text-white/85 mt-1">Open for Select Commissions</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Copyright bottom bar and scroll to top button */}
      <div className="border-t border-white/[0.06] relative z-10 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-mono text-[10px] text-white/35 text-center sm:text-left flex flex-col sm:flex-row gap-2 uppercase tracking-wider">
            <span>Owner: <span className="text-white font-semibold">Vashu Singh</span></span>
            <span className="hidden sm:inline">•</span>
            <span>&copy; 2026 Vashu Studio. All Rights Reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            id="back-to-top-footer"
            className="group flex items-center gap-2 px-4 py-2 font-mono text-[9px] tracking-wider uppercase bg-white/[0.02] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/30 rounded-full cursor-pointer transition-all duration-300 focus:outline-none"
          >
            <span>BACK TO RETICULE</span>
            <ArrowUp className="w-3.5 h-3.5 text-white/45 group-hover:-translate-y-0.5 group-hover:text-white transition-all duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
