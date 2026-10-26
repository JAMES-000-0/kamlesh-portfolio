import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/brandData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onEnquireClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onEnquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Collections', id: 'collections' },
    { label: '3D Studio', id: 'interactive-showroom' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Showroom', id: 'showroom' },
    { label: 'Contact', id: 'enquiry' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#B58B3C]/20 py-3'
            : 'bg-gradient-to-b from-[#29170F]/70 via-[#29170F]/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden bg-[#29170F] p-0.5 border border-[#B58B3C]/40 flex items-center justify-center shadow-md">
              <img
                src="/images/kamlesh-monogram.png"
                alt="Kamlesh Interiors Emblem"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to text initials if image not loaded
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span
                className={`font-serif-luxury font-bold text-lg md:text-xl tracking-wider block leading-tight transition-colors ${
                  isScrolled ? 'text-[#29170F]' : 'text-white'
                }`}
              >
                KAMLESH
              </span>
              <span
                className={`text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-medium block transition-colors ${
                  isScrolled ? 'text-[#B58B3C]' : 'text-[#E7D9C5]'
                }`}
              >
                INTERIORS • SALEM
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-[#B58B3C] ${
                  isScrolled ? 'text-[#29170F]' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Direct Phone Call */}
            <a
              href={`tel:${BUSINESS_INFO.phones[0].raw}`}
              className={`flex items-center gap-2 text-xs md:text-sm font-medium px-3.5 py-2 rounded-full transition-all ${
                isScrolled
                  ? 'text-[#29170F] hover:bg-[#E7D9C5]/50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#B58B3C]" />
              <span className="font-mono">{BUSINESS_INFO.phones[0].display}</span>
            </a>

            {/* Enquire Now CTA */}
            <button
              onClick={onEnquireClick}
              className="px-5 py-2.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-xs md:text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`p-2 rounded-lg lg:hidden transition-colors ${
              isScrolled ? 'text-[#29170F]' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#29170F]/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 text-white animate-fade-in lg:hidden">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#B58B3C] font-semibold mb-2">
              Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="block w-full text-left font-serif-luxury text-2xl py-2 text-white/90 hover:text-[#B58B3C] transition-colors border-b border-white/10"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="text-xs text-[#E7D9C5]/70">Contact Kamlesh Interiors:</div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phones[0].raw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white text-xs font-mono font-medium"
              >
                <Phone className="w-4 h-4 text-[#B58B3C]" />
                {BUSINESS_INFO.phones[0].display}
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20would%20like%20to%20enquire%20about%20your%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick();
              }}
              className="w-full py-3.5 rounded-full bg-[#B58B3C] text-white font-medium text-center shadow-lg"
            >
              Get a Quick Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
