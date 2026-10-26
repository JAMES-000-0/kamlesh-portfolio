import React from 'react';
import { MapPin, Navigation, Phone, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/brandData';

interface ShowroomLocationProps {
  onScheduleVisitClick: () => void;
}

export const ShowroomLocation: React.FC<ShowroomLocationProps> = ({ onScheduleVisitClick }) => {
  return (
    <section id="showroom" className="py-20 md:py-28 bg-[#F7F1E7] border-t border-[#B58B3C]/15 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            Experience In Person
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight mb-4">
            Visit Our Showroom.
          </h2>
          <p className="text-[#29170F]/75 text-base md:text-lg font-light leading-relaxed">
            Touch physical wallpaper books, step onto vinyl plank samples, inspect smooth-gliding curtain rods, and test Netlon insect screens at our Salem location.
          </p>
        </div>

        {/* Map & Information Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Verified Location & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B3C]/25 shadow-lg">
            <div className="space-y-6">
              {/* Address Block */}
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                  Showroom Address
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] text-[#8F6922] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#B58B3C]" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury font-bold text-xl text-[#29170F]">
                      Kamlesh Interiors
                    </h3>
                    <p className="text-sm text-[#29170F]/80 leading-relaxed font-light mt-1">
                      {BUSINESS_INFO.address.line1},<br />
                      {BUSINESS_INFO.address.line2},<br />
                      {BUSINESS_INFO.address.city} – {BUSINESS_INFO.address.postalCode},<br />
                      {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.country}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Calling */}
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                  Call for Showroom Directions
                </span>
                <div className="space-y-2">
                  {BUSINESS_INFO.phones.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.raw}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7F1E7]/60 hover:bg-[#F7F1E7] border border-[#B58B3C]/20 transition-all text-sm font-mono text-[#29170F]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#8F6922]" />
                        <span>{p.display}</span>
                      </div>
                      <span className="text-xs text-[#8F6922] font-sans font-medium">Call Now →</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Verified Working Hours (With clear owner editable note) */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#B58B3C]/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#29170F] uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#8F6922]" />
                  <span>Showroom Hours</span>
                </div>
                <p className="text-xs text-[#29170F]/70 leading-relaxed">
                  Monday – Saturday: 10:00 AM – 8:30 PM<br />
                  Sunday: Prior appointment recommended
                </p>
                <div className="text-[10px] text-[#8F6922] italic pt-1">
                  *Please call ahead to confirm holiday timings or request an on-site executive visit.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#B58B3C]/15">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#29170F] hover:bg-[#3D2418] text-white text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#B58B3C]" />
                <span>Open in Google Maps</span>
              </a>

              <button
                onClick={onScheduleVisitClick}
                className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Schedule a Showroom Visit via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#B58B3C]/30 shadow-lg min-h-[380px] bg-[#29170F] relative">
            <iframe
              title="Kamlesh Interiors Ponnammapet Salem Location Map"
              src="https://maps.google.com/maps?q=Ponnammapet%2C%20Salem%2C%20Tamil%20Nadu%20636001&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-medium text-[#29170F] border border-[#B58B3C]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ponnammapet, Salem 636 001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomLocation;
