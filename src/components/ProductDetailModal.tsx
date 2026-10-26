import React from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import type { ProductCategory } from '../types';
import { BUSINESS_INFO } from '../data/brandData';

interface ProductDetailModalProps {
  category: ProductCategory | null;
  onClose: () => void;
  onEnquire: (categoryTitle: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  category,
  onClose,
  onEnquire,
}) => {
  if (!category) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#29170F]/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF7F0] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#B58B3C]/30 relative flex flex-col max-h-[90vh]"
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-[#29170F] overflow-hidden">
          <img
            src={category.cardImage}
            alt={category.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29170F] via-transparent to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-widest text-[#B58B3C] font-semibold block mb-1">
              Kamlesh Interiors Product Catalog
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
              {category.title}
            </h3>
            <p className="text-xs text-[#E7D9C5] italic font-light mt-0.5">
              “{category.tagline}”
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-[#29170F]/80 leading-relaxed font-light">
            {category.description}
          </p>

          {/* Key Features */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8F6922] mb-3">
              Key Features & Craftsmanship
            </h4>
            <div className="space-y-2">
              {category.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#29170F]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#B58B3C] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="pt-2 border-t border-[#B58B3C]/15">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8F6922] mb-3">
              Product Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.specs.map((sp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#B58B3C]/20 text-xs">
                  <div className="text-[10px] text-[#29170F]/60 uppercase tracking-wider">{sp.label}</div>
                  <div className="font-medium text-[#29170F] mt-0.5">{sp.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onEnquire(category.title);
              }}
              className="w-full sm:w-1/2 py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Enquire About {category.title}</span>
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20am%20interested%20in%20learning%20more%20about%20${encodeURIComponent(
                category.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
