import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Kaelen',
    role: 'Lead Executive Producer',
    company: 'Nova Media Group',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: 'VASHU STUDIO completely revamped our marketing sequence. Their meticulous attention to color grading and dynamic B-Roll sequencing pushed our view counters past 12 Million in under three weeks.',
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Evelyn Sterling',
    role: 'Creative Director',
    company: 'Sartorial Fashion',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'The skin retouching and jewelry cleanup was absolute perfection. I have worked with several top-tier agencies in Paris, but the liquid sheen finish achieved here is truly on another level.',
    rating: 5,
  },
  {
    id: 't-3',
    name: 'David Vance',
    role: 'Tech Creator',
    company: 'Vance Tech Channels',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote: 'The kinetic typography and intro transitions they designed perfectly fit my channels premium feel. Retention surged by +14%! Absolute pros.',
    rating: 5,
  },
  {
    id: 't-4',
    name: 'Sarah Jenkins',
    role: 'VP Brand Marketing',
    company: 'Synthetix Global',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    quote: 'Vashu Singh made our spatial guidelines beautiful. They delivered our aerospace brand guidebook 4 days ahead of client lockouts. Highly, highly recommend!',
    rating: 5,
  },
  {
    id: 't-5',
    name: 'Liam Chen',
    role: 'Founder',
    company: 'Apex Coffee Co.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote: 'Awesome motion logo reveal! The custom sound layout matches our brand identity with stellar timing. Will absolutely utilize their pipelines for our Q3 reels.',
    rating: 5,
  },
];

function Testimonials() {
  // Duplicate list to achieve continuous loop scroll seamlessness
  const doubledData = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 w-full overflow-hidden bg-black text-white"
    >
      {/* Background ambient halo */}
      <div 
        id="testimonials-back-glow"
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" 
      />

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              [ 04 // WORD OF MOUTH ]
            </span>
          </div>
          
          <div className="relative w-full max-w-2xl py-6 flex flex-col items-center justify-center">
            {/* 1. Behind-the-text Ambient White Backside Light Spot Glow */}
            <div 
              id="trusted-backside-light-spot"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.03)_60%,rgba(255,255,255,0)_100%)] blur-[35px] pointer-events-none mix-blend-screen"
            />
            {/* 2. Secondary Intense Side Flares */}
            <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-[40px] bg-white/[0.05] rounded-full blur-[25px] pointer-events-none mix-blend-screen animate-pulse duration-[3000ms]" />

            {/* 3. The main text header */}
            <h2 className="relative z-10 font-display font-bold text-3xl md:text-5xl tracking-tight text-white mb-4">
              Trusted by Creators & Brands
            </h2>

            {/* 4. Fine studio horizontal border underneath with a high-intensity flowing light flare */}
            <div id="trusted-flowing-laser-container" className="relative w-full max-w-sm h-[1px] bg-white/[0.08] overflow-hidden mt-2">
              <motion.div 
                id="flowing-white-light-flare"
                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
                animate={{
                  x: ['-150px', '450px'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0.5
                }}
              />
            </div>
          </div>
          
          <p className="font-sans text-white/50 text-base leading-relaxed max-w-xl mt-4">
            Read comments from global partners and creators who leverage our high-fidelity design pipelines to scale their brands.
          </p>
        </div>

        {/* INFINITE SCROLLER PORTAL (Continuous smooth rolling loop marquee) */}
        <div id="scroller-marquee-portal" className="relative flex w-full overflow-hidden py-4 select-none">
          {/* Glass horizontal shadows to fade out edges gracefully */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-black to-transparent z-15 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-black to-transparent z-15 pointer-events-none" />

          {/* Running Tape Container */}
          <div 
            id="scroller-marquee-track"
            className="flex gap-6 whitespace-nowrap animate-[infinite-scroll_45s_linear_infinite] hover:[animation-play-state:paused] pr-6"
          >
            {doubledData.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                id={`testimonial-card-${t.id}-${idx}`}
                className="inline-block whitespace-normal w-[350px] md:w-[420px] p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-lg glass-glow-card transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] flex-shrink-0"
              >
                {/* Quote details */}
                <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Profile Card Bottom section */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h4 className="font-display font-semibold text-xs md:text-sm text-white">{t.name}</h4>
                      <p className="font-mono text-[9px] text-white/40 tracking-wider uppercase mt-0.5">
                        {t.role}, <span className="text-white/60">{t.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* High Quality Stars indicator */}
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-3.5 h-3.5 fill-white text-white opacity-85" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Loop instructions indicator */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center mt-12">
          <span className="font-mono text-[9px] text-white/35 tracking-widest uppercase">
            ✦ HOVER TICKER TO PAUSE SEQUENCE
          </span>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
