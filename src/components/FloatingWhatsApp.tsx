import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/brandData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20am%20browsing%20your%20website%20and%20would%20like%20to%20enquire%20about%20interior%20products.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#29170F] rounded-2xl py-2 px-3.5 shadow-xl border border-[#B58B3C]/30 text-xs flex items-center gap-2 animate-fade-in max-w-xs">
          <span>Need quick advice or quote? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kamlesh Interiors on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
