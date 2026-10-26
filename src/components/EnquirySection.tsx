import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_INFO } from '../data/brandData';

interface EnquirySectionProps {
  initialCategory?: string;
  initialItemDetail?: string;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  initialCategory = 'Wallpapers',
  initialItemDetail = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [message, setMessage] = useState(initialItemDetail ? `Interested in ${initialItemDetail}` : '');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      setStatus('error');
      return;
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B58B3C', '#29170F', '#E7D9C5', '#25D366'],
      });

      setStatus('success');

      // Compose prefilled WhatsApp message
      const text = `Hello Kamlesh Interiors!%0A%0A*Name:* ${encodeURIComponent(name.trim())}%0A*Phone:* ${encodeURIComponent(cleanPhone)}%0A*Product Category:* ${encodeURIComponent(category)}%0A${message.trim() ? `*Requirements:* ${encodeURIComponent(message.trim())}%0A` : ''}%0AI would like to discuss specifications and arrange a consultation/quote.`;
      const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;

      // Open WhatsApp after a brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    }, 600);
  };

  return (
    <section id="enquiry" className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58B3C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
                Enquiry & Consultation
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight leading-tight mb-4">
                Let's Make Your<br />
                <span className="italic text-[#8F6922]">Space Beautiful.</span>
              </h2>
              <p className="text-[#29170F]/80 text-base md:text-lg font-light leading-relaxed">
                Looking for the right wallpaper, flooring, curtains, or blinds? Get in touch with Kamlesh Interiors to discuss your requirements.
              </p>
            </div>

            {/* Quick Click-to-Call Buttons */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8F6922] block">
                Direct Telephone Inquiries
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUSINESS_INFO.phones.map((phoneItem) => (
                  <a
                    key={phoneItem.raw}
                    href={`tel:${phoneItem.raw}`}
                    className="p-4 rounded-2xl bg-white border border-[#B58B3C]/20 hover:border-[#B58B3C] shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F7F1E7] text-[#8F6922] group-hover:bg-[#B58B3C] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#29170F]/60">Call Showroom</div>
                      <div className="text-sm font-mono font-bold text-[#29170F]">{phoneItem.display}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Quick Contact */}
            <div className="p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#29170F]">Instant WhatsApp Chat</div>
                  <div className="text-[11px] text-[#29170F]/70">Chat directly with our showroom team in Salem</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Kamlesh%20Interiors,%20I%20would%20like%20to%20enquire%20about%20interior%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-medium hover:bg-[#20bd5a] transition-colors whitespace-nowrap shadow-sm"
              >
                Chat Now
              </a>
            </div>

            {/* Showroom Address Reference */}
            <div className="pt-2 text-xs text-[#29170F]/70 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#8F6922] shrink-0 mt-0.5" />
              <span>
                <strong>Showroom Address:</strong> {BUSINESS_INFO.address.full}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#B58B3C]/30 relative">
              <h3 className="font-serif-luxury font-bold text-2xl text-[#29170F] mb-1">
                Send a Product Enquiry
              </h3>
              <p className="text-xs text-[#29170F]/70 font-light mb-6">
                Fill in your details below to instantly connect with Kamlesh Interiors on WhatsApp.
              </p>

              {status === 'success' ? (
                <div className="py-10 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury font-bold text-2xl text-[#29170F]">
                    Thank You, {name}!
                  </h4>
                  <p className="text-sm text-[#29170F]/80 max-w-md mx-auto leading-relaxed">
                    Opening WhatsApp to connect with Kamlesh Interiors directly at{' '}
                    <span className="font-mono font-semibold">+91 {BUSINESS_INFO.whatsappNumber.slice(2)}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-[#29170F] text-white text-xs font-medium"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1.5">
                      Interested Product / Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#B58B3C]/30 bg-[#F7F1E7]/50 text-sm text-[#29170F] focus:outline-none focus:ring-2 focus:ring-[#B58B3C] transition-all"
                    >
                      <option value="Premium Wallpapers">Premium Wallpapers</option>
                      <option value="Vinyl Flooring">Vinyl Flooring</option>
                      <option value="Netlon Insect Screens">Netlon Insect Screens</option>
                      <option value="Curtain Rods & Accessories">Curtain Rods & Accessories</option>
                      <option value="Vertical Blinds">Vertical Blinds</option>
                      <option value="Multiple Products / Full Home">Multiple Products / Full Home Interior</option>
                    </select>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#B58B3C]/30 bg-[#F7F1E7]/50 text-sm text-[#29170F] placeholder-[#29170F]/40 focus:outline-none focus:ring-2 focus:ring-[#B58B3C] transition-all"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1.5">
                      Contact Phone Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#29170F]/60 font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="98427 01481"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-[#B58B3C]/30 bg-[#F7F1E7]/50 text-sm text-[#29170F] placeholder-[#29170F]/40 focus:outline-none focus:ring-2 focus:ring-[#B58B3C] transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Optional Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1.5">
                      Project Details / Approximate Dimensions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Looking for vinyl flooring for 2 bedrooms and Netlon insect screens for 4 windows in Salem."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#B58B3C]/30 bg-[#F7F1E7]/50 text-sm text-[#29170F] placeholder-[#29170F]/40 focus:outline-none focus:ring-2 focus:ring-[#B58B3C] transition-all resize-none"
                    />
                  </div>

                  {/* Error Display */}
                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white font-medium text-sm md:text-base tracking-wide transition-all shadow-lg shadow-[#B58B3C]/30 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span>Connecting to WhatsApp...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Enquiry via WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#29170F]/60 pt-2">
                    Direct enquiry flow: Your message opens seamlessly in WhatsApp with Kamlesh Interiors.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
