import React from 'react';
import { Sparkles, Compass, Palette, Home, CheckCircle, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Palette,
      title: 'A Variety of Interior Options',
      description:
        'A comprehensive selection spanning classic European damask and modern botanical wallpapers, resilient vinyl wood flooring, insect screens, drapery rods, and vertical blinds.',
    },
    {
      icon: Home,
      title: 'Stylish Designs for Every Space',
      description:
        'Whether outfitting a cozy family living room, an executive office suite, or an expansive glass balcony, discover tailored aesthetics that complement your architecture.',
    },
    {
      icon: Compass,
      title: 'Tailored to Interior Preferences',
      description:
        'Curated choices to match diverse interior tastes—from minimalist Scandinavian bleached ash and linen textures to opulent dark walnut and champagne gold accents.',
    },
    {
      icon: ShieldCheck,
      title: 'Everything Under One Roof',
      description:
        'No need to coordinate with multiple disjointed vendors. Furnish your walls, windows, and floors under one roof with cohesive styling and synchronized execution.',
    },
    {
      icon: Sparkles,
      title: 'Personal In-Showroom Assistance',
      description:
        'Consult directly with our knowledgeable team in Salem. Review physical material swatches, inspect hardware finishes, and receive thoughtful guidance tailored to your layout.',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#F7F1E7] border-y border-[#B58B3C]/15 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            The Kamlesh Interiors Standard
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight mb-4">
            Every Detail Makes a Difference.
          </h2>
          <p className="text-[#29170F]/75 text-base md:text-lg font-light leading-relaxed">
            Delivering quality materials, considerate guidance, and honest craftsmanship for homes and businesses across Salem.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`p-8 rounded-2xl bg-white border border-[#B58B3C]/20 hover:border-[#B58B3C] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F1E7] border border-[#B58B3C]/30 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#8F6922]" />
                  </div>
                  <h3 className="font-serif-luxury font-bold text-xl text-[#29170F] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#29170F]/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#B58B3C]/10 flex items-center gap-2 text-xs text-[#8F6922] font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B58B3C]" />
                  <span>Quality Assured</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
