import React, { useState } from 'react';
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/brandData';
import type { GalleryItem } from '../types';

export const PortfolioGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'installed', label: 'Verified On-Site Projects' },
    { id: 'wallpaper', label: 'Wallpapers' },
    { id: 'flooring', label: 'Vinyl Flooring' },
    { id: 'blinds', label: 'Vertical & Blinds' },
    { id: 'curtains', label: 'Curtain Rods' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setActiveLightboxItem(item);
  };

  const closeLightbox = () => {
    setActiveLightboxItem(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FAF7F0] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            Curated Portfolio & On-Site Projects
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight mb-4">
            Spaces That Inspire.
          </h2>
          <p className="text-[#29170F]/75 text-base md:text-lg font-light leading-relaxed">
            Browse our gallery of verified on-site client installations in Salem alongside showroom inspiration concepts.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#29170F] text-white shadow-md'
                  : 'bg-white border border-[#B58B3C]/20 text-[#29170F]/80 hover:bg-[#E7D9C5]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#B58B3C]/20 hover:border-[#B58B3C] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#29170F]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#29170F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#29170F] flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5 text-[#B58B3C]" />
                  </div>
                </div>

                {/* Status Badges: Real project vs Inspiration */}
                <div className="absolute top-3 left-3">
                  {item.isRealProject ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#29170F]/90 backdrop-blur-md text-[#E7D9C5] text-[10px] font-semibold uppercase tracking-wider border border-[#B58B3C]/40">
                      <ShieldCheck className="w-3 h-3 text-[#B58B3C]" />
                      Verified Installation
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#29170F] text-[10px] font-semibold uppercase tracking-wider border border-[#B58B3C]/20">
                      Showroom Inspiration
                    </span>
                  )}
                </div>

                {item.location && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-[#29170F]/80 backdrop-blur-md text-[10px] text-white/90">
                    {item.location}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8F6922] block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif-luxury font-bold text-lg text-[#29170F] group-hover:text-[#8F6922] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#29170F]/70 font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#29170F]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#FAF7F0] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#B58B3C]/30 flex flex-col max-h-[90vh]"
          >
            <div className="relative aspect-[16/10] bg-[#29170F] overflow-hidden">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4">
                {activeLightboxItem.isRealProject ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#29170F]/90 text-[#E7D9C5] text-xs font-semibold tracking-wider border border-[#B58B3C]/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B58B3C]" />
                    Verified On-Site Work by Kamlesh Interiors
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#29170F] text-xs font-semibold tracking-wider">
                    Design Inspiration Concept
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-lg">
                <span className="text-xs uppercase tracking-widest text-[#8F6922] font-semibold">
                  {activeLightboxItem.categoryLabel}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#29170F]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs md:text-sm text-[#29170F]/75 font-light leading-relaxed">
                  {activeLightboxItem.description}
                </p>
                {activeLightboxItem.location && (
                  <div className="text-xs text-[#8F6922] font-medium pt-1">
                    Location: {activeLightboxItem.location}
                  </div>
                )}
              </div>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20am%20interested%20in%20a%20similar%20installation%20as%20seen%20in%20your%20portfolio:%20"${encodeURIComponent(
                  activeLightboxItem.title
                )}"`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs md:text-sm font-medium tracking-wide shadow-md flex items-center gap-2 whitespace-nowrap transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;
