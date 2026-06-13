import React, { useEffect, useState, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

function LiquidGlow() {
  const [isMounted, setIsMounted] = useState(false);
  
  // High-performance spring coordinates to eliminate lagging mouse trails
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150); // Offset by half width/height of tracker
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div id="liquid-glow-system" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* "Artistic Flair" Specific Background Lighting Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl opacity-50"></div>

      {/* 1. Interactive Mouse Backlight Follower (Soft white glow) */}
      <motion.div
        id="mouse-radial-backlight"
        className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_70%)] mix-blend-screen opacity-70"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* 2. Top-Center Ambient White Ray Light (Static organic source) */}
      <div 
        id="top-ambient-halo"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_50%,rgba(0,0,0,0)_100%)] blur-[40px]" 
      />

      {/* 3. Volumetric Background Light Rays (Simulated diagonal glow lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ray-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Dynamic angled vectors simulating real glass lighting ray reflections */}
        <line x1="-10%" y1="-10%" x2="80%" y2="110%" stroke="url(#ray-grad-1)" strokeWidth="60" />
        <line x1="20%" y1="-20%" x2="110%" y2="90%" stroke="url(#ray-grad-1)" strokeWidth="40" />
        <line x1="50%" y1="-30%" x2="140%" y2="80%" stroke="url(#ray-grad-1)" strokeWidth="80" />
      </svg>

      {/* 4. Left Ambient Blue-ish Tint Anchor (For cosmic depth) */}
      <div 
        id="left-ambient-glow"
        className="absolute -left-[200px] top-[35%] w-[450px] h-[450px] rounded-full bg-white/[0.015] blur-[120px]" 
      />

      {/* 5. Right Ambient Glow Anchor */}
      <div 
        id="right-ambient-glow"
        className="absolute -right-[200px] bottom-[20%] w-[450px] h-[450px] rounded-full bg-white/[0.02] blur-[120px]" 
      />

      {/* 6. High-Intensity Background Lateral White Lights (Requested "Side White Light") */}
      <div 
        id="left-side-white-light"
        className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-transparent blur-[30px]"
      />
      <div 
        id="right-side-white-light"
        className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-white/[0.08] via-white/[0.02] to-transparent blur-[30px]"
      />
      <div 
        id="left-side-radial-white-spot"
        className="absolute -left-[100px] top-1/4 w-[300px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)] blur-[50px] mix-blend-screen"
      />
      <div 
        id="right-side-radial-white-spot"
        className="absolute -right-[100px] top-1/3 w-[300px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)] blur-[50px] mix-blend-screen"
      />

      {/* 7. Fine Vertical & Horizontal Studio Guidelines (Requested "Lines") */}
      {/* Left side lines */}
      <div className="absolute left-[3%] top-0 bottom-0 w-[1px] bg-white/[0.07] hidden md:block">
        {/* Ticks & coordinates */}
        <div className="absolute top-[20%] -left-[4px] w-[9px] h-[1px] bg-white/35" />
        <div className="absolute top-[50%] -left-[4px] w-[9px] h-[1px] bg-white/35" />
        <div className="absolute top-[80%] -left-[4px] w-[9px] h-[1px] bg-white/35" />
        <span className="absolute top-[10%] left-2 font-mono text-[8px] text-white/30 tracking-widest uppercase origin-left rotate-90 whitespace-nowrap">GRID X // L-03</span>
      </div>
      <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-white/[0.03] hidden lg:block" />

      {/* Right side lines */}
      <div className="absolute right-[3%] top-0 bottom-0 w-[1px] bg-white/[0.07] hidden md:block">
        {/* Ticks & coordinates */}
        <div className="absolute top-[20%] -right-[4px] w-[9px] h-[1px] bg-white/35" />
        <div className="absolute top-[50%] -right-[4px] w-[9px] h-[1px] bg-white/35" />
        <div className="absolute top-[80%] -right-[4px] w-[9px] h-[1px] bg-white/35" />
        <span className="absolute top-[10%] right-2 font-mono text-[8px] text-white/30 tracking-widest uppercase origin-right -rotate-90 whitespace-nowrap">GRID X // R-03</span>
      </div>
      <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-white/[0.03] hidden lg:block" />

      {/* Crosshairs intersection indicators and subtle ticks */}
      <div className="absolute left-[3%] top-[25%] -translate-y-1/2 w-4 h-4 border border-white/[0.08] rounded-full hidden md:flex items-center justify-center">
        <div className="w-[3px] h-[3px] bg-white/45 rounded-full" />
      </div>
      <div className="absolute right-[3%] top-[75%] -translate-y-1/2 w-4 h-4 border border-white/[0.08] rounded-full hidden md:flex items-center justify-center">
        <div className="w-[3px] h-[3px] bg-white/45 rounded-full" />
      </div>
    </div>
  );
}

export default memo(LiquidGlow);
