import React from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface HeroFallbackProps {
  onExploreClick: () => void;
  onShowroomClick: () => void;
}

export const HeroFallback: React.FC<HeroFallbackProps> = ({ onExploreClick, onShowroomClick }) => {
  return (
    <div className="relative w-full h-[90vh] min-h-[600px] flex items-center bg-[#29170F] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
        alt="Kamlesh Interiors Luxury Living Room"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#29170F] via-[#29170F]/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B58B3C]/20 border border-[#B58B3C]/40 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-[#F7F1E7]">
              Salem's Premier Interior Destination
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] text-white tracking-tight mb-6">
            Transform Your Space.<br />
            <span className="italic font-light text-[#E7D9C5]">Elevate Your Living.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#F7F1E7]/90 font-light leading-relaxed mb-8 max-w-xl">
            Discover thoughtfully selected wallpapers, elegant window furnishings, Netlon insect screens, and premium flooring that bring your dream interiors to life.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white font-medium text-sm md:text-base tracking-wide transition-all shadow-lg shadow-[#B58B3C]/30 flex items-center gap-2"
            >
              Explore Our Collection
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onShowroomClick}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1E7] border border-white/30 font-medium text-sm md:text-base tracking-wide transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#B58B3C]" />
              Visit Our Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFallback;
