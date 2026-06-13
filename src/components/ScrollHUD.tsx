import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'motion/react';

interface ScrollHUDProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const SECTIONS = [
  { id: 'home', label: '01', fullname: 'HOME' },
  { id: 'services', label: '02', fullname: 'SERVICES' },
  { id: 'portfolio', label: '03', fullname: 'PORTFOLIO' },
  { id: 'about', label: '04', fullname: 'ABOUT' },
  { id: 'testimonials', label: '05', fullname: 'FEEDBACK' },
  { id: 'contact', label: '06', fullname: 'CONTACT' },
];

function ScrollHUD({ activeSection, onNavigate }: ScrollHUDProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Read scroll percentage to align the physical glowing scrollbar handle
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percentage = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, percentage)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 
        A. Fixed Scroll Progress Header (Horizontal line tracker mirroring high-end studio projects)
      */}
      <div 
        id="scroll-tracker-strip"
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.05] z-[100] pointer-events-none"
      >
        <div 
          className="h-full bg-gradient-to-r from-white/20 via-white to-white/25 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 
        B. Desktop/Tablet Vertical HUD (Placed precisely on the right margin matching 3% lines)
      */}
      <div 
        id="vertical-hud-scroll-bar"
        className="fixed right-[3%] top-[25%] bottom-[25%] w-10 hidden md:flex flex-col items-center justify-between z-[90] pointer-events-none select-none"
      >
        {/* Top percentage coordinate */}
        <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
          Y / {Math.round(scrollProgress).toString().padStart(3, '0')}
        </div>

        {/* The Scroll Rail Track with Active Indicator Handle */}
        <div className="relative flex-1 w-[1px] my-6 bg-white/[0.08] flex items-center justify-center">
          {/* Glowing sliding handle */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center pointer-events-auto cursor-ns-resize"
            style={{ top: `${scrollProgress}%`, transform: 'translate(-50%, -50%)' }}
            title={`Scroll progress: ${Math.round(scrollProgress)}%`}
          >
            {/* Center light core */}
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
            {/* Holographic bracket rings */}
            <div className="absolute inset-0 border border-white/40 rounded-full scale-110" />
          </div>

          {/* Markers for each section */}
          {SECTIONS.map((sec, idx) => {
            const isSelected = activeSection === sec.id;
            const positionPct = (idx / (SECTIONS.length - 1)) * 100;

            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className="absolute left-1/2 -translate-x-1/2 pointer-events-auto flex items-center group/hud"
                style={{ top: `${positionPct}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Visual Anchor Dot */}
                <span className={`w-1.5 h-1.5 rounded-full border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white border-white scale-125 shadow-[0_0_6px_rgba(255,255,255,0.8)]' 
                    : 'bg-black border-white/20 group-hover/hud:border-white/60 group-hover/hud:scale-110'
                }`} />

                {/* Left Hover Tag */}
                <div className="absolute right-6 opacity-0 group-hover/hud:opacity-100 transition-all duration-300 translate-x-2 group-hover/hud:translate-x-0 pointer-events-none flex items-center gap-2">
                  <span className="font-mono text-[9px] text-white/45">{sec.label}</span>
                  <span className="font-sans text-[9px] text-white tracking-widest font-bold uppercase whitespace-nowrap bg-black/85 px-2 py-0.5 border border-white/10 rounded backdrop-blur-md">
                    {sec.fullname}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom index status indicator */}
        <div className="font-mono text-[9px] text-white/35 group-hover:text-white/70 transition-colors duration-300">
          SYS // R-03
        </div>
      </div>
    </>
  );
}

export default memo(ScrollHUD);
