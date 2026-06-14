import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowLeft, ArrowRight, X, Sparkles, CornerDownRight, Zap, Target, ArrowUpRight } from 'lucide-react';

interface SearchInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface SearchResult {
  id: string;
  type: 'Section' | 'Project' | 'Service';
  title: string;
  description: string;
  category?: string;
  targetId: string; // section or item to navigate to
}

const SEARCH_ITEMS: SearchResult[] = [
  // Sections
  { id: 'sec-home', type: 'Section', title: 'Launch Pad / Home', description: 'The absolute landing gateway featuring the real-time 3D telemetry camera.', targetId: 'home' },
  { id: 'sec-services', type: 'Section', title: 'Creative Services Matrix', description: 'Explore premium video, image, retouching, and branding pipelines.', targetId: 'services' },
  { id: 'sec-portfolio', type: 'Section', title: 'Exhibition Portfolio', description: 'Visual showcase of complete project edits and brand deployments.', targetId: 'portfolio' },
  { id: 'sec-about', type: 'Section', title: 'Hardware & Identity Specs', description: 'Read parameters about dual RTX 4090 pipelines and studio values.', targetId: 'about' },
  { id: 'sec-testimonials', type: 'Section', title: 'Praise & Endorsements', description: 'View comments from our creator network and verified brand clients.', targetId: 'testimonials' },
  { id: 'sec-contact', type: 'Section', title: 'Connect / Project Intake', description: 'Reach our direct system coordinates and submit your video input logs.', targetId: 'contact' },

  // Projects
  { id: 'proj-tokyo', type: 'Project', title: 'Cyberpunk Tokyo Retouch', description: 'Pro skin frequency separation and neo-neon color grading on streets of Tokyo.', category: 'Photo Editing', targetId: 'portfolio' },
  { id: 'proj-solitude', type: 'Project', title: 'Solitude - Cinematic Trailer', description: '4K cinema trailer detailing sophisticated audio layers and pristine master grading.', category: 'Video Editing', targetId: 'portfolio' },
  { id: 'proj-apex', type: 'Project', title: 'Apex Brand Ecosystem', description: 'Luxury spatial design matrices and pristine aerospace branding systems.', category: 'Brand Identity', targetId: 'portfolio' },
  { id: 'proj-heist', type: 'Project', title: 'Hyper-Heist Reel Edit', description: 'Vertical conversion retention optimizing, kinetic text flow and dynamic sfx haptics.', category: 'Social Media', targetId: 'portfolio' },
  { id: 'proj-kinetic', type: 'Project', title: 'Kinetic Hologram Identity', description: '3D logo spatial reveal featuring liquid vector outlines and ambient glass reflection.', category: 'Motion Graphics', targetId: 'portfolio' },
  { id: 'proj-reveal', type: 'Project', title: 'Premium Product Reveal', description: 'Studio product retouching, refraction maps, and studio lighting setup.', category: 'Photo Editing', targetId: 'portfolio' },

  // Services
  { id: 'srv-video', type: 'Service', title: 'High-Retention Video Editing', description: 'Dynamic sequencing and pristine pacing crafted for 4K YouTube and short form.', targetId: 'services' },
  { id: 'srv-photo', type: 'Service', title: 'Premium Photo Retouching', description: 'Flemish frequency cleanses, high-end color models, and cinematic depth.', targetId: 'services' },
  { id: 'srv-brand', type: 'Service', title: 'Brand Identity Architecture', description: 'Strategic design guides, spatial emblems, and typographic scale models.', targetId: 'services' },
];

function SearchInterface({ isOpen, onClose, onNavigate }: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_ITEMS; // Show all as default suggestions
    }
    const cleanQuery = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(cleanQuery) ||
        item.description.toLowerCase().includes(cleanQuery) ||
        item.type.toLowerCase().includes(cleanQuery) ||
        (item.category && item.category.toLowerCase().includes(cleanQuery))
    );
  }, [query]);

  // Handle cycle left / select previous index
  const selectPrev = useCallback(() => {
    if (filteredResults.length === 0) return;
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
  }, [filteredResults]);

  // Handle cycle right / select next index
  const selectNext = useCallback(() => {
    if (filteredResults.length === 0) return;
    setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
  }, [filteredResults]);

  // Activate / trigger navigation for current selected item
  const handleActivate = useCallback(() => {
    if (filteredResults.length === 0) return;
    const item = filteredResults[selectedIndex];
    if (item) {
      onNavigate(item.targetId);
      // If navigating to a specific project, we can also flash some state or just scroll there
      onClose();
    }
  }, [filteredResults, selectedIndex, onNavigate, onClose]);

  // Reset index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input automatically when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80.0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        // Intercept Arrow keys for left/right macOS button simulation
        e.preventDefault();
        selectPrev();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        selectNext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleActivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectPrev, selectNext, handleActivate, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="futuristic-spotlight-overlay"
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 select-none"
      >
        {/* Deep dark charcoal gradient backdrop with elegant ambient backlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-[16px]"
          onClick={onClose}
        >
          {/* Soft ambient lighting radial flare centered exactly behind the floating glass box */}
          <div 
            id="spotlight-backlight-ambient"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_50%,transparent_100%)] blur-[60px] pointer-events-none"
          />
        </motion.div>

        {/* Floating macOS-Inspired Neumorphic Glassmorphic Search Module */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1c1e]/60 to-[#121214]/65 border border-white/[0.08] rounded-3xl p-6 shadow-[-1px_1px_24px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-[32px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Realistic glass diagonal glow accent bar */}
          <div 
            id="glass-specular-sheen" 
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent pointer-events-none rotate-12"
          />

          {/* Decorative macOS window header controls */}
          <div className="flex items-center justify-between mb-5 px-1 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">SPOTLIGHT SPEC // SEC-199</span>
            </div>
          </div>

          {/* A. Translucent frosted glass search bar with rounded corners, soft inner glow, subtle reflections */}
          <div 
            id="frosted-glass-search-shell"
            className="relative flex items-center w-full group rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-[inset_0_1px_3px_rgba(255,255,255,0.06),_inset_0_-1px_1px_rgba(0,0,0,0.4),_0_4px_16px_rgba(0,0,0,0.4)] hover:border-white/15 transition-all duration-300"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, portfolio pieces, studio locations..."
              className="w-full h-14 pl-5 pr-14 bg-transparent outline-none border-none text-white font-sans text-sm tracking-wider placeholder:text-white/25 select-text"
            />
            
            {/* White search icon on the right side */}
            <div className="absolute right-4.5 pointer-events-none text-white/70">
              <Search className="w-4.5 h-4.5 select-none" />
            </div>
          </div>

          {/* 
            B. Dynamic Search Results Box
            Styled cleanly in monochromatic gray color palette
          */}
          <div className="mt-5 max-h-[310px] overflow-y-auto pr-1 space-y-2 custom-hud-scroll">
            <div className="px-1 py-1.5 flex items-center justify-between border-b border-white/[0.04]">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                {query ? 'MATCHING DICTIONARY INDEX' : 'SYS RECOMMENDED QUICK-JUMPS'}
              </span>
              <span className="font-mono text-[9px] text-white/30 uppercase">
                {filteredResults.length} OPTION{filteredResults.length !== 1 ? 'S' : ''}
              </span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
                <Target className="w-8 h-8 text-white mb-2" />
                <p className="font-mono text-[10px] tracking-widest text-white uppercase">NO REGISTRY ENTRIES MATCHED</p>
                <p className="text-[11px] text-white/70 mt-1">Try querying different metrics like "retouch" or "video"</p>
              </div>
            ) : (
              filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedIndex(index);
                      // Double click or single click to navigate
                      onNavigate(item.targetId);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl flex items-start gap-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/[0.07] border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.05),_inset_0_1px_1px_rgba(255,255,255,0.1)]'
                        : 'bg-transparent border border-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Visual ID Badge or icon */}
                    <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center font-mono text-[9px] uppercase tracking-widest font-bold ${
                      isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/50'
                    }`}>
                      {item.type[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-sans text-[13px] font-bold tracking-wide transition-colors ${
                          isSelected ? 'text-white' : 'text-white/80'
                        }`}>
                          {item.title}
                        </span>
                        
                        {/* Meta Category label */}
                        <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded">
                          {item.category || item.type}
                        </span>
                      </div>
                      
                      <p className={`font-sans text-[11px] mt-1 pr-4 line-clamp-1 transition-colors ${
                        isSelected ? 'text-white/60' : 'text-white/40'
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Right feedback chevron */}
                    {isSelected && (
                      <div className="self-center flex items-center pr-1 text-white">
                        <CornerDownRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* 
            C. Action Strip & macOS-Inspired Glass Control Interface
            "below the search bar three circular translucent glass buttons containing left arrow, right arrow, and close (X) icons"
          */}
          <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-between">
            {/* Quick hotkey labels for high-end feel */}
            <div className="hidden sm:flex items-center gap-3 font-mono text-[9px] text-white/35">
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑ ↓</span>
                <span>NAVIGATE</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">ENTER</span>
                <span>TRIGGER CHASSIS</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-serif">ESC</span>
                <span>CLOSE</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/40 text-[9px] font-mono sm:hidden">
              SYS DIALOG MODAL V-3
            </div>

            {/* The absolute three circular glass buttons requested */}
            <div id="mac-glass-navigation-trio" className="flex items-center gap-3">
              {/* Button A: Left Arrow */}
              <button
                id="search-btn-prev"
                onClick={selectPrev}
                disabled={filteredResults.length === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] active:scale-90 disabled:opacity-20 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),_0_4px_12px_rgba(0,0,0,0.3)] text-white/70 hover:text-white cursor-pointer focus:outline-none"
                title="Scroll selection up (Keyboard Left/Up)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Button B: Right Arrow */}
              <button
                id="search-btn-next"
                onClick={selectNext}
                disabled={filteredResults.length === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] active:scale-90 disabled:opacity-20 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),_0_4px_12px_rgba(0,0,0,0.3)] text-white/70 hover:text-white cursor-pointer focus:outline-none"
                title="Scroll selection down (Keyboard Right/Down)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button C: Close (X) */}
              <button
                id="search-btn-close"
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.12] hover:border-white/35 hover:bg-white/[0.1] active:scale-90 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),_0_4px_12px_rgba(0,0,0,0.3)] text-white/80 hover:text-white cursor-pointer focus:outline-none"
                title="Dismiss overlay (Keyboard ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default memo(SearchInterface);
