import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

export const ScrollStory: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Architectural Feature Walls',
      subtitle: 'Luxury Textured Wallpapers',
      description:
        'Walls set the emotional baseline of any interior. Our curated European and Asian designer wallpaper substrates deliver tactile depth, gold leaf accents, and acoustic warmth that paint alone cannot achieve.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      badge: 'Tactile Grandeur',
    },
    {
      step: '02',
      title: 'Resilient Foundations Underfoot',
      subtitle: 'Warm Hardwood Vinyl Planks',
      description:
        'Flooring endures daily life. We bring you 100% waterproof, termite-free luxury vinyl flooring with realistic wire-brushed wood grain that cushions footsteps, resists scratches, and cleans in minutes.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
      badge: 'Enduring Comfort',
    },
    {
      step: '03',
      title: 'Invisible Barrier & Natural Airflow',
      subtitle: 'Engineered Netlon Screens',
      description:
        'Embrace Salem’s evening breeze without mosquito worries. Custom-fitted aluminum sash and pleated door screens allow uninterrupted airflow while remaining nearly invisible to the eye.',
      image: '/images/project-netlon-window.jpg',
      badge: 'Verified On-Site Craft',
    },
    {
      step: '04',
      title: 'Sculpting Natural Light',
      subtitle: 'Designer Drapery & Vertical Blinds',
      description:
        'Windows connect private comfort with the outside world. Master solar heat and privacy with precision vertical blinds and heavy drapery suspended from architectural antique brass rods.',
      image: '/images/project-blinds-installation.jpg',
      badge: 'Mastered Light',
    },
  ];

  return (
    <section className="py-24 bg-[#29170F] text-white relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#B58B3C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#8F6922]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/20 border border-[#B58B3C]/40 text-[#E7D9C5] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            The Interior Narrative
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Curating Harmonious Spaces<br />
            <span className="italic text-[#E7D9C5] font-normal">Layer by Thoughtful Layer</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light mt-4 max-w-xl leading-relaxed">
            From the tactile textures on your walls to the filtered daylight through your windows, every element works in concert.
          </p>
        </div>

        {/* Narrative Cards */}
        <div className="space-y-16 md:space-y-28">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.step}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Visual Imagery */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#B58B3C]/30 group aspect-[16/11]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#29170F]/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#29170F]/80 backdrop-blur-md text-[11px] font-medium text-[#E7D9C5] border border-[#B58B3C]/30">
                      {step.badge}
                    </div>

                    <div className="absolute bottom-4 right-4 text-4xl font-serif-luxury font-bold text-white/20 select-none">
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-[#B58B3C] font-semibold">{step.step}</span>
                    <span className="w-8 h-[1px] bg-[#B58B3C]/50" />
                    <span className="text-xs uppercase tracking-widest text-[#E7D9C5] font-medium">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-white/75 text-sm md:text-base font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-[#E7D9C5]/80">
                    <CheckCircle className="w-4 h-4 text-[#B58B3C]" />
                    <span>Personal assistance & on-site measurements across Salem</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
