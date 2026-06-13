import React, { memo } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Service } from '../types';

const SERVICES_DATA: Service[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Cinematic color grading, sound design, multi-camera sync, and high-retention storytelling cuts tailored for advertising and high-end broadcasts.',
    details: ['10-Bit HDR Grading', 'SFX & Foley Design', 'Multi-Cam Synchronization', 'High-Retention Pacing'],
    iconName: 'Film',
    metrics: '40M+ Cumulative Views',
  },
  {
    id: 'photo-editing',
    title: 'Photo Editing & Retouch',
    description: 'Ultra-high-end digital commercial retouching, portrait grading, product skin cleanses, composite manipulations, and premium lighting correction.',
    details: ['High-Frequency Separation', 'Commercial Color Matching', 'Product Spec-Grade Beauty', 'Dynamic Lighting Correction'],
    iconName: 'Aperture',
    metrics: 'DPI Export Ready',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    description: 'Bespoke geometric vector logos, holistic guideline design, custom typography sheets, and strict visual system parameters for scaling businesses.',
    details: ['Bespoke Typography Assets', 'Palette Harmonies & Rules', 'Comprehensive Brand Manuals', 'Vector Scaling Packaging'],
    iconName: 'Layers',
    metrics: '100% Unique Architecture',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Fluid liquid kinetography, dynamic custom intro sequences, title cards, particle engines, and procedural UI showcase vectors.',
    details: ['Procedural Logo Intros', 'Liquid Kinetic Typography', 'Procedural UI Overlays', 'Custom Lottie & JSON Renders'],
    iconName: 'Sparkles',
    metrics: 'Smooth 60FPS Physics',
  },
  {
    id: 'social-media',
    title: 'Social Media Content',
    description: 'Viral shortform structures, high-impact neon typography captions, attentionhook sequencing, and optimized cross-platform exports.',
    details: ['Auto-Cap Subtitles', 'High-Conversion Hooks', 'Vertical Ratio Formulation', 'Daily Volume Pipelines'],
    iconName: 'TrendingUp',
    metrics: '+85% Average Retention',
  },
  {
    id: 'youtube-production',
    title: 'YouTube Video Production',
    description: 'Full video editorial integration, creative thumbnail mockups, narrative pacing, interactive B-roll layering, and retention audits.',
    details: ['Plotline Pacing Audits', '3D Scene Introductions', 'Immersive B-Roll Stacks', 'CTA Hook Integrations'],
    iconName: 'Youtube',
    metrics: 'Clients Grew +1.2M Subs',
  },
];

function Services() {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36 w-full overflow-hidden bg-black text-white"
    >
      {/* Background decoration */}
      <div 
        id="services-back-glow"
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[150px] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
              [ 01 // CAPABILITIES ]
            </span>
          </div>
          
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
            Elite Digital Craftsmanship
          </h2>
          
          <p className="font-sans text-white/50 text-base leading-relaxed">
            Our specialized fields target high-performance creators and brands looking to command absolute attention. Each project undergoes strict architectural quality control.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            // Dynanically select lucide icons safely
            const MyIcon = (Icons as any)[service.iconName] || Icons.HelpCircle;

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md transition-all duration-500 sheen-sweep hover:border-white/25 hover:bg-white/[0.04] glass-glow-card hover:glass-glow-card-hover hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon & Metrics header row */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 text-white group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-500">
                        <MyIcon className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <span className="text-white/30 text-xs font-mono font-bold">0{idx + 1}</span>
                    </div>
                    
                    <span className="font-mono text-[10px] tracking-wider text-white/45 bg-white/[0.02] border border-white/[0.05] px-2.5 py-1 rounded-full uppercase">
                      {service.metrics}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-glow transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-white/50 leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Bullets feature list */}
                <div className="border-t border-white/[0.06] pt-6 mt-6">
                  <ul className="grid grid-cols-1 gap-2.5">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/60">
                        <Icons.Check className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner decorative accent visible only on hover */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-[-10px] right-[-10px] w-6 h-6 rotate-45 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Bottom line expansion from Design Style */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
