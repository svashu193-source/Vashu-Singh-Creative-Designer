import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, ArrowRight, MousePointerClick } from 'lucide-react';
import ThreeDCamera from './ThreeDCamera';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black text-white"
    >
      {/* 1. Behind-grid digital star background */}
      <div 
        id="hero-ambient-grid"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.85),transparent_60%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Premium Editorial Typography with consolidated stagger anim */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Elegant glass-encased status pill & What's New banner */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <motion.div
                id="hero-welcome-badge"
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                  ✦ LUXURY AGENCY 2026
                </span>
              </motion.div>

              <motion.div
                id="hero-whats-new-badge"
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/20 hover:border-white/40 active:scale-95 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={() => {
                  document.getElementById('nav-search-button-trigger')?.click();
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#111111] bg-white px-1.5 py-0.5 rounded mr-1">
                  WHAT'S NEW?
                </span>
                <span className="font-sans text-[10.5px] font-medium text-white/90 tracking-wide flex items-center gap-1.5">
                  Spotlight Search Interface with Details <span className="font-mono text-[9px] text-white/45 bg-white/10 px-1 py-0.5 rounded">⌘K</span>
                </span>
              </motion.div>
            </div>

            {/* Main agency mission statement with backstage lights and glows */}
            <div className="relative w-full mb-6 group/headline">
              {/* Backside high-intensity white light glows ("text backside light light glow") */}
              <div 
                id="headline-backside-glow"
                className="absolute -inset-x-12 -inset-y-8 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.02)_60%,rgba(255,255,255,0)_100%)] blur-[40px] pointer-events-none mix-blend-screen"
              />
              <div 
                id="headline-accent-glowing-core"
                className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[260px] h-[70px] bg-white/[0.08] rounded-full blur-[30px] pointer-events-none mix-blend-screen animate-pulse duration-[4000ms]"
              />
              
              <motion.h1
                id="hero-headline"
                variants={itemVariants}
                className="relative z-10 font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl tracking-tighter leading-tight text-white"
              >
                Transforming Ideas Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic font-serif">
                  Stunning Visual Experiences
                </span>
              </motion.h1>
            </div>

            {/* Subheading describing high-end specializations */}
            <motion.p
              id="hero-subheadline"
              variants={itemVariants}
              className="font-sans text-white/60 text-sm tracking-[0.2em] uppercase font-light max-w-xl mb-10 leading-relaxed"
            >
              Professional Video Editing • Photo Retouching • Brand Identity • Creative Solutions
            </motion.p>

            {/* Actions CTAs: View Portfolio and Start Project */}
            <motion.div
              id="hero-action-actions"
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              {/* Start Project: Heavy White Capsule Button */}
              <button
                id="hero-primary-cta"
                onClick={() => onNavigate('contact')}
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] focus:outline-none"
              >
                <span>Start Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* View Portfolio: Premium Glass Button */}
              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate('portfolio')}
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] focus:outline-none"
              >
                <Play className="w-3.5 h-3.5 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                <span>View Portfolio</span>
              </button>
            </motion.div>

            {/* Key brand visual specs metrics */}
            <motion.div
              id="hero-key-metrics"
              variants={itemVariants}
              className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-6 sm:gap-10 w-full"
            >
              <div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white">400M+</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Total Views</p>
              </div>
              <div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white">100+</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Creators Helped</p>
              </div>
              <div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white">100%</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Retention Focused</p>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive holographic 3D Camera */}
          <motion.div
            id="hero-3d-camera-column"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[400px]"
          >
            {/* Halo backlight pulsing ring */}
            <div 
              id="camera-halo-pulse"
              className="absolute w-[240px] h-[240px] rounded-full bg-white/[0.04] blur-[50px] animate-pulse duration-[4000ms]" 
            />
            
            {/* Liquid glass floating frame card to contain camera rendering nicely */}
            <div 
              id="camera-container-card"
              className="relative w-full overflow-hidden p-2 rounded-3xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-sm glass-glow-card"
            >
              {/* Corner decorative bracket lines for high tech hud appeal */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br-sm pointer-events-none" />
              
              <ThreeDCamera />
            </div>

            {/* Quick gesture prompt overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] tracking-widest text-white uppercase">MOVE MOUSE TO PIVOT</span>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Absolute Bottom fading shadow anchor */}
      <div 
        id="hero-bottom-fade"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" 
      />
    </section>
  );
}

export default memo(Hero);
