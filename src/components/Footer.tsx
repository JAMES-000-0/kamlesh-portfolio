import React from 'react';
import { Phone, MapPin, MessageCircle, Navigation, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, PRODUCT_CATEGORIES } from '../data/brandData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onCategorySelect }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#29170F] text-white pt-16 pb-10 border-t border-[#B58B3C]/30 relative overflow-hidden">
      {/* Subtle Gold Glow Accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#B58B3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 space-y-5">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#B58B3C]/40 p-1 flex items-center justify-center">
                <img
                  src="/images/kamlesh-monogram.png"
                  alt="Kamlesh Interiors Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-wider block text-white group-hover:text-[#B58B3C] transition-colors">
                  KAMLESH INTERIORS
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B58B3C] font-medium block">
                  SALEM, TAMIL NADU
                </span>
              </div>
            </button>

            <p className="font-serif-luxury italic text-lg text-[#E7D9C5] font-light leading-relaxed">
              “{BUSINESS_INFO.tagline}”
            </p>

            <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm">
              Dedicated to delivering luxury wallpapers, vinyl flooring, durable Netlon insect screens, decorative curtain rods, and vertical blinds crafted for discerning homes across Salem.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20learn%20more.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-medium hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Official</span>
              </a>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-all flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#B58B3C]" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Product Collections Column (Col 6-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-[#E7D9C5] uppercase tracking-wider">
              Product Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-light">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategorySelect(cat.id)}
                    className="hover:text-[#B58B3C] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span className="text-[#B58B3C]">›</span>
                    <span>{cat.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Contact (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-[#E7D9C5] uppercase tracking-wider">
              Showroom Contact
            </h4>
            <div className="space-y-3 text-xs text-white/75 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B58B3C] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.line2}, {BUSINESS_INFO.address.city} – {BUSINESS_INFO.address.postalCode}, {BUSINESS_INFO.address.state}, India.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#B58B3C] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {BUSINESS_INFO.phones.map((p) => (
                    <div key={p.raw}>
                      <a
                        href={`tel:${p.raw}`}
                        className="font-mono text-white hover:text-[#B58B3C] transition-colors"
                      >
                        +91 {p.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-white/50 block mb-1">Salem Showroom Visit:</span>
              <p className="text-xs text-[#E7D9C5]/90">
                Ponnammapet showroom open Monday through Saturday with dedicated parking.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            © {currentYear} Kamlesh Interiors. All rights reserved. “From Walls to Windows, Quality and Elegance Under One Roof.”
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#B58B3C] transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
