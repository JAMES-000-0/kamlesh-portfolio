import { Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO, PRODUCT_CATEGORIES } from '../data/brandData';

interface BrandBannerShowcaseProps {
  onCategorySelect: (categoryId: string) => void;
}

export const BrandBannerShowcase: React.FC<BrandBannerShowcaseProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] border-b border-[#B58B3C]/15 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B58B3C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E7D9C5]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Subheader */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            Authentic Brand Heritage • Salem, Tamil Nadu
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight mb-4">
            “From Walls to Windows,<br className="hidden sm:inline" />
            <span className="italic text-[#8F6922]">Quality and Elegance Under One Roof.”</span>
          </h2>
          <p className="text-[#29170F]/75 text-base md:text-lg font-light leading-relaxed">
            Preserving trusted craftsmanship in Ponnammapet, Salem. Explore the five core interior divisions that form the cornerstone of Kamlesh Interiors.
          </p>
        </div>

        {/* High-Resolution Brand Banner Container */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B58B3C]/30 bg-white mb-14 group">
          <img
            src="/images/kamlesh-banner.jpg"
            alt="Kamlesh Interiors Official Brand Showcase Banner"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#29170F]/90 via-[#29170F]/40 to-transparent p-4 md:p-6 flex flex-wrap items-center justify-between text-white gap-4">
            <div className="flex items-center gap-2 text-xs md:text-sm font-light text-[#E7D9C5]">
              <MapPin className="w-4 h-4 text-[#B58B3C]" />
              <span>{BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.line2}, {BUSINESS_INFO.address.city} – {BUSINESS_INFO.address.postalCode}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70">Showroom Enquiries:</span>
              <a
                href={`tel:${BUSINESS_INFO.phones[0].raw}`}
                className="px-4 py-1.5 rounded-full bg-[#B58B3C] text-white text-xs font-mono font-medium hover:bg-[#9E762B] transition-colors"
              >
                {BUSINESS_INFO.phones[0].display}
              </a>
            </div>
          </div>
        </div>

        {/* Five Signature Categories Grid (Matching the banner's 5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {PRODUCT_CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#B58B3C]/20 hover:border-[#B58B3C] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="w-full h-32 rounded-xl overflow-hidden bg-[#F7F1E7] mb-3.5 relative">
                  <img
                    src={cat.cardImage}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#29170F]/80 text-[#E7D9C5] text-xs flex items-center justify-center font-serif-luxury font-bold">
                    0{index + 1}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-serif-luxury font-bold text-base md:text-lg text-[#29170F] group-hover:text-[#8F6922] transition-colors mb-1.5">
                  {cat.bannerTitle}
                </h3>
                <p className="text-xs text-[#29170F]/70 leading-relaxed font-light mb-3">
                  {cat.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-[#B58B3C]/15 flex items-center justify-between text-xs font-medium text-[#8F6922]">
                <span>View Details</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBannerShowcase;
