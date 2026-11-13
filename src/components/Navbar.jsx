import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" }
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled 
            ? 'bg-[#121316] border-b border-[#d4ff00]/15 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo in Anton */}
          <a 
            href="#" 
            className="flex items-center gap-2 text-2xl tracking-wide text-[#f4f4f5] hover:text-[#d4ff00] transition-colors"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span className="w-2.5 h-2.5 bg-[#d4ff00] rounded-none inline-block mr-1" />
            <span>MIDHUN MOHAN</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#f4f4f5]/70 hover:text-[#d4ff00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-[#d4ff00] text-[#121316] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#f4f4f5] transition-colors flex items-center gap-1.5"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
            className="md:hidden touch-target flex items-center justify-center text-[#f4f4f5] hover:text-[#d4ff00] transition-colors p-2"
          >
            {isOpen ? <X className="w-6 h-6 text-[#d4ff00]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="fixed inset-0 z-30 bg-[#121316] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden border-b border-[#d4ff00]/20"
          >
            <div className="space-y-6 pt-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4ff00]">
                NAVIGATION MENU
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl text-[#f4f4f5] hover:text-[#d4ff00] transition-colors flex items-center justify-between border-b border-[#d4ff00]/10 pb-3"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-[#d4ff00]">0{idx + 1}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-[#d4ff00] text-[#121316] font-mono text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#f4f4f5]/40 pt-2">
                <span>LOCAL TIME: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-[#d4ff00]">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
