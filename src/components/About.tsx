import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Target, Award, CheckCircle } from 'lucide-react';

const QUALITIES_DATA = [
  {
    icon: Cpu,
    title: 'Bleeding-Edge Hardware',
    description: 'Render pipelines powered by dual RTX 4090s and Apple M3 Max workstations for lightning-fast 10-bit HDR processing.',
  },
  {
    icon: Target,
    title: 'Attention Retention',
    description: 'Engineered storytelling tactics built specifically to maximize audience watch-time and trigger platform algorithms.',
  },
  {
    icon: ShieldCheck,
    title: 'Prisminate Quality Control',
    description: 'Every project goes through strict color alignment check, audio master leveling, and metadata structure optimization.',
  },
];

function About() {

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 w-full overflow-hidden bg-black text-white"
    >
      {/* Background glowing halo elements */}
      <div 
        id="about-top-ray shadow"
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[130px] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Visual Storytelling Description */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                [ 03 // STUDIO PROFILE ]
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-white mb-6 leading-tight">
              Creative Visual Storytelling
            </h2>
            
            <p className="font-sans text-white/70 text-base leading-relaxed mb-6">
              Vashu Studio is an elite creative visual laboratory helping brands, creators, and businesses build powerful global identities through expert video engineering, photo correction, and master-grade brand design solutions.
            </p>

            <p className="font-sans text-white/50 text-sm leading-relaxed mb-10">
              We do not just compile clips or apply LUT overlays. We study viewer neurology, build immersive sonic environments, and carve pristine geometric brand codes that establish direct authority in congested markets.
            </p>

            {/* Quick specifications grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                'Strict Non-Disclosure Protocols',
                'Lossless Pro-Res Delivery',
                'Direct Frame-by-Frame Audits',
                'Flexible Iterative Review Boards',
              ].map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0" />
                  <span className="font-mono text-xs text-white/80">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Spec Matrix Card & Creator Stats */}
          <div className="lg:col-span-6">
            <motion.div
              id="about-specs-bento"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-10 rounded-2xl bg-white/[0.012] border border-white/[0.08] backdrop-blur-md glass-glow-card"
            >
              <div className="absolute top-4 right-4 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                SPEC-SHEETS v3.4
              </div>

              {/* Master Lead Profile Card */}
              <div className="flex items-center gap-4 pb-6 mb-8 border-b border-white/[0.06]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/20 flex items-center justify-center">
                  <span className="font-display font-semibold text-white/90 text-sm">VS</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">OWNER & CREATIVE DIRECTOR</span>
                  <h4 className="font-display font-bold text-base text-white">Vashu Singh</h4>
                </div>
              </div>

              {/* Grid of qualities */}
              <div className="flex flex-col gap-6">
                {QUALITIES_DATA.map((q, idx) => {
                  const IconComp = q.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-white mt-0.5 flex-shrink-0">
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="font-display font-semibold text-sm text-white mb-1.5">{q.title}</h5>
                        <p className="font-sans text-xs text-white/50 leading-relaxed">{q.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(About);
