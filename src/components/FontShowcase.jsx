import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Type } from 'lucide-react'

const FONTS = [
  {
    id: 'syne',
    name: 'Syne',
    category: 'Avant-Garde Display',
    fontFamily: "'Syne', sans-serif",
    tagline: 'Wide, sculptural, eccentric poster headlines',
    bestFor: 'Modern art direction, creative agencies, future-tech portfolios',
    sampleHeadline: 'DIGITAL ARCHITECT',
    sampleSubtitle: 'Crafting visceral kinetic interfaces and experiential design systems.'
  },
  {
    id: 'anton',
    name: 'Anton',
    category: 'Brutalist Compressed',
    fontFamily: "'Anton', sans-serif",
    tagline: 'Massive vertical height, maximum impact, raw power',
    bestFor: 'Brutalist posters, high-energy hero banners, bold visual statements',
    sampleHeadline: 'UNCOMPROMISING SPEED',
    sampleSubtitle: 'Direct, loud, and engineered to seize attention across every viewport.'
  },
  {
    id: 'editorial',
    name: 'Cormorant Garamond',
    category: 'Editorial Serif',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    tagline: 'Refined elegance, high stroke contrast, luxury monograph',
    bestFor: 'Luxury design, fine art portfolios, timeless storytelling',
    sampleHeadline: 'Poetry in Architecture',
    sampleSubtitle: 'The delicate convergence of timeless typography and digital form.'
  },
  {
    id: 'space',
    name: 'Space Grotesk',
    category: 'Neo-Grotesk Tech',
    fontFamily: "'Space Grotesk', sans-serif",
    tagline: 'Geometric ink traps, scientific clarity, futuristic balance',
    bestFor: 'Full-stack engineering, web3, AI researchers, software innovators',
    sampleHeadline: 'SYNTACTIC SYSTEMS',
    sampleSubtitle: 'Structured computational elegance built with mathematical rigor.'
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Monumental Chisel',
    fontFamily: "'Cinzel', serif",
    tagline: 'Classical Roman proportions carved in stone',
    bestFor: 'Curators, high-end studios, architectural monographs',
    sampleHeadline: 'TIMELESS MONUMENT',
    sampleSubtitle: 'Classical restraint meeting modern digital craftsmanship.'
  }
]

export default function FontShowcase({ onSelectFont }) {
  const [selectedFont, setSelectedFont] = useState(FONTS[0])
  const [customText, setCustomText] = useState('')

  const activeHeadline = customText.trim() ? customText : selectedFont.sampleHeadline

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f5f5f7]/10 pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#f5f5f7]/50 mb-2 sm:mb-3">
            <Type className="w-3.5 h-3.5 text-[#f5f5f7]" />
            <span>Mobile-First Specimens</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#f5f5f7] tracking-tight">
            Creative Poster Fonts
          </h2>
          <p className="text-[#f5f5f7]/60 text-xs sm:text-sm md:text-base mt-2 max-w-xl leading-relaxed">
            Choose the typographic personality that will anchor your portfolio in the 2-color Pitch Black & Bone White palette.
          </p>
        </div>

        {/* Live Text Input with touch accessibility */}
        <div className="w-full md:w-80">
          <label className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#f5f5f7]/50 mb-2">
            Test Your Name / Custom Text:
          </label>
          <input 
            type="text" 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="e.g. YOUR NAME or DESIGNER"
            className="w-full min-h-[44px] px-4 py-2.5 rounded-none bg-[#080808] border border-[#f5f5f7]/20 text-[#f5f5f7] text-sm focus:outline-none focus:border-[#f5f5f7] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Font Selector Tabs - Mobile horizontal scroll or clean responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {FONTS.map((font) => {
          const isSelected = selectedFont.id === font.id
          return (
            <button
              key={font.id}
              onClick={() => {
                setSelectedFont(font)
                if (onSelectFont) onSelectFont(font)
              }}
              className={`p-3.5 sm:p-4 text-left border transition-all duration-200 relative flex flex-col justify-between min-h-[90px] sm:min-h-[120px] active:scale-[0.98] touch-manipulation ${
                isSelected 
                  ? 'border-[#f5f5f7] bg-[#f5f5f7]/5' 
                  : 'border-[#f5f5f7]/10 hover:border-[#f5f5f7]/40 bg-transparent'
              }`}
            >
              <div className="flex justify-between items-start gap-1">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#f5f5f7]/40 truncate">
                  {font.category}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#f5f5f7] shrink-0" />}
              </div>

              <div>
                <span 
                  className="text-lg sm:text-2xl text-[#f5f5f7] block leading-none truncate"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {font.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#f5f5f7]/50 mt-1 hidden sm:block truncate">
                  {font.tagline}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Hero Poster Specimen Card - Fully Responsive */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedFont.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="border border-[#f5f5f7]/20 p-5 sm:p-10 md:p-14 relative overflow-hidden bg-gradient-to-b from-[#f5f5f7]/[0.03] to-transparent min-h-[340px] sm:min-h-[420px] flex flex-col justify-between"
        >
          {/* Poster Top Grid Details */}
          <div className="flex justify-between items-start gap-2 text-[10px] sm:text-xs font-mono text-[#f5f5f7]/40 border-b border-[#f5f5f7]/10 pb-4 sm:pb-6 uppercase tracking-widest">
            <div>
              <span className="text-[#f5f5f7] font-bold block">{selectedFont.name}</span>
              <span className="text-[9px] sm:text-[10px]">{selectedFont.category}</span>
            </div>
            <div className="hidden md:block text-right">
              <span className="block">RECOMMENDED USE</span>
              <span className="text-[10px] text-[#f5f5f7]/60 normal-case">{selectedFont.bestFor}</span>
            </div>
            <div className="text-right">
              <span className="text-[#f5f5f7] font-bold block">FIG. 01</span>
              <span className="text-[9px] sm:text-[10px]">MONOCHROME</span>
            </div>
          </div>

          {/* Main Giant Poster Display */}
          <div className="py-8 sm:py-12 my-auto">
            <h3 
              className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f5f5f7] leading-[1.02] sm:leading-[0.95] break-words uppercase"
              style={{ 
                fontFamily: selectedFont.fontFamily,
                textTransform: selectedFont.id === 'editorial' ? 'none' : 'uppercase'
              }}
            >
              {activeHeadline}
            </h3>

            <p 
              className={`text-sm sm:text-xl md:text-2xl text-[#f5f5f7]/70 mt-4 sm:mt-6 max-w-2xl leading-relaxed ${
                selectedFont.id === 'editorial' ? 'italic' : ''
              }`}
              style={{ fontFamily: selectedFont.fontFamily }}
            >
              {selectedFont.sampleSubtitle}
            </p>
          </div>

          {/* Poster Bottom Grid: Glyph & Scale Specimen */}
          <div className="border-t border-[#f5f5f7]/10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-[10px] sm:text-xs font-mono text-[#f5f5f7]/40">
            <div className="overflow-hidden max-w-full">
              <span className="block text-[9px] sm:text-[10px] tracking-widest uppercase mb-1">CHARACTER SET</span>
              <span className="text-[#f5f5f7]/70 text-[11px] sm:text-xs tracking-wider font-sans block truncate">
                A-Z • 0-9 • &@#$!?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#f5f5f7]/50">SELECTED:</span>
              <span className="px-2.5 py-0.5 border border-[#f5f5f7]/30 text-[#f5f5f7] text-[11px] font-bold font-mono">
                {selectedFont.name}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side-by-side comparison specimens */}
      <div className="space-y-4 pt-4 sm:pt-8">
        <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#f5f5f7]/50">
          Direct Side-By-Side Comparison:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {FONTS.filter(f => f.id !== selectedFont.id).slice(0, 4).map((f) => (
            <div 
              key={f.id}
              onClick={() => {
                setSelectedFont(f)
                if (onSelectFont) onSelectFont(f)
              }}
              className="p-4 sm:p-6 border border-[#f5f5f7]/10 hover:border-[#f5f5f7]/40 bg-[#f5f5f7]/[0.02] cursor-pointer transition-all space-y-2 sm:space-y-3 active:scale-[0.99] touch-manipulation"
            >
              <div className="flex justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#f5f5f7]/40">
                <span>{f.name}</span>
                <span>{f.category}</span>
              </div>
              <p 
                className="text-xl sm:text-2xl md:text-3xl text-[#f5f5f7] leading-tight break-words"
                style={{ fontFamily: f.fontFamily }}
              >
                {activeHeadline}
              </p>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#f5f5f7]/40 hover:text-[#f5f5f7] flex items-center gap-1 transition-colors pt-1">
                Tap to preview in poster stage →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
