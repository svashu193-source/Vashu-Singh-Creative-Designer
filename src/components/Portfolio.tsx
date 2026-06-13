import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CornerDownRight, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'project-1',
    title: 'Cyberpunk Tokyo Retouch',
    category: 'Photo Editing',
    description: 'High-frequency separation skin cleanse and HDR cyberpunk neon color grading on cinematic urban night landscapes.',
    mediaUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80',
    client: 'Urban Aesthetics Inc.',
    year: '2026',
    tags: ['Color Grading', 'Retouch', 'ACES Color', 'Tokyo'],
  },
  {
    id: 'project-2',
    title: 'Solitude - Cinematic Trailer',
    category: 'Video Editing',
    description: 'A 4K atmospheric promotional trailer featuring complex multi-channel audio sequencing, custom soundscape design, and pristine color matching.',
    mediaUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    client: 'Aether Pictures',
    year: '2026',
    tags: ['Cinematic Cuts', 'Sound Design', '4K master', 'LUT Design'],
  },
  {
    id: 'project-3',
    title: 'Apex Brand Ecosystem',
    category: 'Brand Identity Design',
    description: 'A complete spatial vector system for a luxury aerospace platform, encompassing customized glyph shapes and dark-mode brand palettes.',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    client: 'Apex Aerospace',
    year: '2025',
    tags: ['Vector Emblem', 'Guidelines', 'Typography', 'Stationery'],
  },
  {
    id: 'project-4',
    title: 'Hyper-Heist Reel Edit',
    category: 'Social Media Content',
    description: 'High-retention horizontal clip converted to vertical, featuring custom kinetic subtitle fonts, sound-effect pop haptics, and fast zoom framing transitions.',
    mediaUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    client: 'Vandals Gaming Corp.',
    year: '2026',
    tags: ['Vertical Edit', 'Captions', 'SFX Pop', 'Retention Hacking'],
  },
  {
    id: 'project-5',
    title: 'Kinetic Hologram Identity',
    category: 'Motion Graphics',
    description: 'Procedurally generated 3D logo reveal employing fluid vector liquid outlines, digital distortion layers, and organic glass sheens.',
    mediaUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    client: 'Chronos Digital',
    year: '2026',
    tags: ['Logo Reveal', 'Framer Renders', '3D Outline', 'Liquid FX'],
  },
  {
    id: 'project-6',
    title: 'Premium Product Reveal',
    category: 'Photo Editing',
    description: 'Studio product lighting cleanup and metal reflection optimization for a luxury titanium wristwatch accessory lines.',
    mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    client: 'Vanguard Chrono',
    year: '2025',
    tags: ['Metal Retouch', 'Highlights', 'Background Swaps', 'Glows'],
  },
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', 'Video Editing', 'Photo Editing', 'Brand Identity Design', 'Motion Graphics', 'Social Media Content'], []);

  const filteredItems = useMemo(() => {
    return activeCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="portfolio"
      className="relative py-28 md:py-36 w-full overflow-hidden bg-black text-white"
    >
      {/* Dynamic ambient lights */}
      <div 
        id="portfolio-back-glow"
        className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-white/[0.012] blur-[140px] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 w-full">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                [ 02 // SELECTED ARCHIVES ]
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
              Visual Case Studies
            </h2>
            
            <p className="font-sans text-white/50 text-base leading-relaxed">
              Explore our curated portfolio of ultra-high-end video, photo, motion graphics, and branding masterpieces.
            </p>
          </div>

          {/* Inline Instruction Indicator */}
          <div className="hidden xl:flex items-center gap-2 font-mono text-[10px] text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-white/50 animate-pulse" />
            <span>EXQUISITE SPECIFICATIONS ARCHIVE</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div id="portfolio-categories-scroller" className="flex items-center gap-2 pb-6 mb-12 overflow-x-auto scrollbar-none border-b border-white/[0.05]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`portfolio-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-md cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.02] text-white/50 border-white/[0.06] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry Matrix Grid of beautiful typography text detail cards */}
        <motion.div
          id="portfolio-masonry-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  id={`portfolio-item-${project.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col rounded-2xl bg-white/[0.015] border border-white/[0.06] p-8 md:p-10 overflow-hidden backdrop-blur-md glass-glow-card hover:border-white/20 hover:bg-white/[0.035] transition-all duration-500 min-h-[300px] justify-between"
                >
                  {/* Bottom line expansion from Design Style */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-300 rounded-b-2xl" />

                  <div>
                    {/* Top category & year badges */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] tracking-widest uppercase text-white/80 group-hover:bg-white/10 transition-colors">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-white/45">{project.year}</span>
                    </div>

                    {/* Client info */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3.5">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Client: <span className="text-white/70 font-sans font-semibold">{project.client}</span></span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-white group-hover:text-glow transition-all duration-300 mb-4 tracking-tight leading-snug">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-sans text-xs md:text-sm text-white/50 group-hover:text-white/60 transition-colors leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>

                  {/* Tag list map */}
                  <div className="flex flex-wrap gap-1.5 pt-6 border-t border-white/[0.04] mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.06] font-mono text-[9px] tracking-wider text-white/50 group-hover:text-white/85 group-hover:border-white/15 transition-colors lowercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Portfolio);
