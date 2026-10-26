import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Maximize2, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  MessageCircle,
  Sun,
  Shield,
  Wind
} from 'lucide-react';
import { 
  WALLPAPER_PATTERNS, 
  FLOORING_FINISHES, 
  CURTAIN_ROD_FINISHES
} from '../data/brandData';

interface InteractiveShowroomProps {
  onDirectEnquire: (categoryTitle: string, itemDetail?: string) => void;
  selectedCategory?: string;
}

export const InteractiveShowroom: React.FC<InteractiveShowroomProps> = ({ 
  onDirectEnquire, 
  selectedCategory = 'wallpapers' 
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory);

  // Studio 1: Wallpaper State
  const [selectedWallpaper, setSelectedWallpaper] = useState(WALLPAPER_PATTERNS[0]);
  const [wallpaperZoom, setWallpaperZoom] = useState(false);

  // Studio 2: Flooring State
  const [selectedFlooring, setSelectedFlooring] = useState(FLOORING_FINISHES[0]);

  // Studio 4: Curtain Rods State
  const [selectedRod, setSelectedRod] = useState(CURTAIN_ROD_FINISHES[0]);

  // Studio 5: Vertical Blinds State
  const [blindAngle, setBlindAngle] = useState<number>(45);

  const tabs = [
    { id: 'wallpapers', title: 'Wallpapers', icon: Sparkles },
    { id: 'vinyl-flooring', title: 'Vinyl Flooring', icon: Layers },
    { id: 'netlon-screens', title: 'Netlon Screens', icon: ShieldCheck },
    { id: 'curtain-rods', title: 'Curtain Rods', icon: Maximize2 },
    { id: 'vertical-blinds', title: 'Vertical Blinds', icon: Sliders },
  ];

  return (
    <section id="interactive-showroom" className="py-20 md:py-28 bg-[#F7F1E7] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B3C]/10 border border-[#B58B3C]/30 text-[#8F6922] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B3C]" />
            Interactive 3D Product Showroom
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-medium text-[#29170F] tracking-tight mb-4">
            Experience Materials & Finishes
          </h2>
          <p className="text-[#29170F]/75 text-base md:text-lg font-light leading-relaxed">
            Interact with our five specialized product lines in real-time. Test textures, simulate daylight through vertical blinds, and compare insect screen transparency.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#29170F] text-[#F7F1E7] shadow-lg shadow-[#29170F]/20 scale-105'
                    : 'bg-white border border-[#B58B3C]/20 text-[#29170F]/80 hover:bg-[#E7D9C5]/40 hover:text-[#29170F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B58B3C]' : 'text-[#8F6922]'}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Wallpapers Studio */}
        {activeTab === 'wallpapers' && (
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl border border-[#B58B3C]/30 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive Wall Visualizer */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-inner border border-[#B58B3C]/30 bg-[#29170F]">
                  {/* Dynamic Wallpaper Wall Pattern */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: selectedWallpaper.textureThumb,
                      backgroundColor: selectedWallpaper.wallColorHex,
                    }}
                  />
                  
                  {/* Architectural Luxury Living Room Mockup Overlay */}
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury living room overlay"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50"
                  />

                  {/* Gold Frame accent */}
                  <div className="absolute inset-4 border border-[#B58B3C]/40 pointer-events-none rounded-xl" />

                  <div className="absolute top-6 left-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-white/60 block text-[10px] uppercase tracking-wider">Preview Pattern</span>
                    <span className="font-serif-luxury text-sm font-semibold text-[#E7D9C5]">
                      {selectedWallpaper.name}
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6 flex items-center gap-2">
                    <button
                      onClick={() => setWallpaperZoom(!wallpaperZoom)}
                      className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#29170F] text-xs font-medium shadow flex items-center gap-1.5 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#B58B3C]" />
                      <span>{wallpaperZoom ? 'Zoom Out' : 'Inspect Texture'}</span>
                    </button>
                  </div>
                </div>

                {wallpaperZoom && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-[#B58B3C]/20 text-xs text-[#29170F]/80 flex items-center justify-between">
                    <span>
                      High-resolution tactile vinyl finish • Embossed surface with micro-gold foil highlights
                    </span>
                    <span className="text-[10px] text-[#B58B3C] font-semibold uppercase">Washable Grade</span>
                  </div>
                )}
              </div>

              {/* Wallpaper Swatch Selector & Info */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                    Category 01 • Wall Papers
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#29170F]">
                    Designer Wallpaper Collections
                  </h3>
                  <p className="text-sm text-[#29170F]/80 font-light mt-2 leading-relaxed">
                    Select a wallpaper texture to preview how it transforms your interior. Every roll is crafted for seamless joins, washability, and fade-free opulence.
                  </p>
                </div>

                {/* Swatches Grid */}
                <div>
                  <label className="text-xs font-semibold text-[#29170F] block mb-2 uppercase tracking-wider">
                    Select Pattern Swatch
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {WALLPAPER_PATTERNS.map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => setSelectedWallpaper(pattern)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedWallpaper.id === pattern.id
                            ? 'border-[#B58B3C] bg-white ring-2 ring-[#B58B3C]/30 shadow'
                            : 'border-[#B58B3C]/20 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-full h-10 rounded-md mb-2 border border-[#B58B3C]/20"
                          style={{ background: pattern.textureThumb }}
                        />
                        <div className="text-xs font-medium text-[#29170F] truncate">{pattern.name}</div>
                        <div className="text-[10px] text-[#8F6922] font-light">{pattern.style}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-[#B58B3C]/15">
                  <div className="flex items-center gap-2 text-xs text-[#29170F]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B58B3C]" />
                    <span>Non-woven & heavy vinyl backing for damp resistance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#29170F]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B58B3C]" />
                    <span>Experienced on-site measurement & wallpaper pasting in Salem</span>
                  </div>
                </div>

                {/* Direct Enquiry CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onDirectEnquire('Wallpapers', selectedWallpaper.name)}
                    className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire About {selectedWallpaper.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vinyl Flooring Studio */}
        {activeTab === 'vinyl-flooring' && (
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl border border-[#B58B3C]/30 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Flooring Interactive Comparison View */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-inner border border-[#B58B3C]/30 bg-[#29170F]">
                  <img
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Vinyl Flooring Installation"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle tint overlay matching active wood tone */}
                  <div
                    className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: selectedFlooring.colorHex }}
                  />

                  <div className="absolute top-6 left-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-white/60 block text-[10px] uppercase tracking-wider">Active Plank Finish</span>
                    <span className="font-serif-luxury text-sm font-semibold text-[#E7D9C5]">
                      {selectedFlooring.name}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-[#29170F]/85 backdrop-blur-md p-3.5 rounded-xl text-white text-xs border border-[#B58B3C]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[#E7D9C5] font-medium block">{selectedFlooring.tone}</span>
                      <span className="text-white/70 text-[11px]">{selectedFlooring.grain}</span>
                    </div>
                    <span className="px-3 py-1 bg-[#B58B3C] text-white text-[10px] font-semibold rounded-full uppercase">
                      100% Water Resistant
                    </span>
                  </div>
                </div>
              </div>

              {/* Flooring Finish Selector & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                    Category 02 • Vinyl Flooring
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#29170F]">
                    Resilient Vinyl Wood Planks
                  </h3>
                  <p className="text-sm text-[#29170F]/80 font-light mt-2 leading-relaxed">
                    Enjoy the aesthetic luxury of timber flooring with the durability of heavy-duty vinyl. Termite-proof, scratch-resistant, and acoustic sound-dampened.
                  </p>
                </div>

                {/* Flooring Options */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold text-[#29170F] block uppercase tracking-wider">
                    Select Wood Finish
                  </label>
                  {FLOORING_FINISHES.map((floor) => (
                    <button
                      key={floor.id}
                      onClick={() => setSelectedFlooring(floor)}
                      className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all text-left ${
                        selectedFlooring.id === floor.id
                          ? 'border-[#B58B3C] bg-white ring-2 ring-[#B58B3C]/30 shadow'
                          : 'border-[#B58B3C]/20 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg shadow-sm border border-[#29170F]/20"
                          style={{ backgroundColor: floor.colorHex }}
                        />
                        <div>
                          <div className="text-xs font-medium text-[#29170F]">{floor.name}</div>
                          <div className="text-[10px] text-[#8F6922]">{floor.tone}</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#8F6922] font-semibold">Select</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onDirectEnquire('Vinyl Flooring', selectedFlooring.name)}
                    className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire About {selectedFlooring.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Netlon Insect Screens Studio */}
        {activeTab === 'netlon-screens' && (
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl border border-[#B58B3C]/30 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive Before & After Mesh Comparison */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-inner border border-[#B58B3C]/30 bg-[#29170F] select-none">
                  {/* Left: Authentic Netlon Window Installation */}
                  <img
                    src="/images/project-netlon-window.jpg"
                    alt="Authentic Netlon Window Installation by Kamlesh Interiors"
                    className="w-full h-full object-cover"
                  />

                  {/* Dynamic Mesh Info Badge */}
                  <div className="absolute top-6 left-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                      Kamlesh Interiors Verified Installation
                    </span>
                    <span className="font-serif-luxury text-sm font-semibold text-[#E7D9C5]">
                      Heavy-Duty Aluminum Frame Netlon Screen
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-[#29170F]/85 backdrop-blur-md border border-[#B58B3C]/20 text-white">
                      <Wind className="w-4 h-4 mx-auto mb-1 text-[#B58B3C]" />
                      <div className="text-[10px] uppercase text-white/70">Ventilation</div>
                      <div className="text-xs font-semibold text-[#E7D9C5]">100% Airflow</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#29170F]/85 backdrop-blur-md border border-[#B58B3C]/20 text-white">
                      <Shield className="w-4 h-4 mx-auto mb-1 text-[#B58B3C]" />
                      <div className="text-[10px] uppercase text-white/70">Protection</div>
                      <div className="text-xs font-semibold text-[#E7D9C5]">Zero Insects</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#29170F]/85 backdrop-blur-md border border-[#B58B3C]/20 text-white">
                      <Eye className="w-4 h-4 mx-auto mb-1 text-[#B58B3C]" />
                      <div className="text-[10px] uppercase text-white/70">Visibility</div>
                      <div className="text-xs font-semibold text-[#E7D9C5]">High Optical Clarity</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factual Screen Features */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                    Category 03 • Netlon Insect Screens
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#29170F]">
                    Custom Insect Screen Solutions
                  </h3>
                  <p className="text-sm text-[#29170F]/80 font-light mt-2 leading-relaxed">
                    Protect your home against mosquitoes, flies, and airborne insects without closing windows or sacrificing fresh cross-breeze.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#B58B3C]/20">
                    <h4 className="text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1">
                      1. Openable & Sliding Window Screens
                    </h4>
                    <p className="text-xs text-[#29170F]/70">
                      Sleek aluminum sash frames custom-colored to blend seamlessly with wooden, UPVC, or aluminum windows.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#B58B3C]/20">
                    <h4 className="text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1">
                      2. Magnetic Barrier Door Screens
                    </h4>
                    <p className="text-xs text-[#29170F]/70">
                      Heavy-duty magnetic walk-through screens that snap shut automatically, perfect for main entryways and balcony doors.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#B58B3C]/20">
                    <h4 className="text-xs font-semibold text-[#29170F] uppercase tracking-wider mb-1">
                      3. Stainless Steel 304 High-Tension Mesh
                    </h4>
                    <p className="text-xs text-[#29170F]/70">
                      Pet-safe, rodent-resistant, and corrosion-free wire mesh for long-term durability.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onDirectEnquire('Netlon Insect Screens', 'Window & Door Screens')}
                    className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire About Netlon Insect Screens</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Curtain Rods Studio */}
        {activeTab === 'curtain-rods' && (
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl border border-[#B58B3C]/30 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Curtain Rod Showcase with Real Project Photo */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-inner border border-[#B58B3C]/30 bg-[#29170F]">
                  <img
                    src="/images/project-curtains-installation.jpg"
                    alt="Curtain Rod & Drapes Installation by Kamlesh Interiors"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                      Kamlesh Interiors Verified Installation
                    </span>
                    <span className="font-serif-luxury text-sm font-semibold text-[#E7D9C5]">
                      High-Grade Metallic Rod with Fluted Finials
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-[#B58B3C] font-semibold">{selectedRod.name}</span>
                    <span className="block text-[10px] text-white/70">{selectedRod.finish}</span>
                  </div>
                </div>
              </div>

              {/* Curtain Rod Finishes */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                    Category 04 • Curtain Rods & Accessories
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#29170F]">
                    Architectural Rods & Designer Finials
                  </h3>
                  <p className="text-sm text-[#29170F]/80 font-light mt-2 leading-relaxed">
                    Engineered to carry everything from sheer voile curtains to heavy velvet drapes without sagging or stickiness.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-semibold text-[#29170F] block uppercase tracking-wider">
                    Select Metallic Finish
                  </label>
                  {CURTAIN_ROD_FINISHES.map((rod) => (
                    <button
                      key={rod.id}
                      onClick={() => setSelectedRod(rod)}
                      className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all text-left ${
                        selectedRod.id === rod.id
                          ? 'border-[#B58B3C] bg-white ring-2 ring-[#B58B3C]/30 shadow'
                          : 'border-[#B58B3C]/20 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full shadow-inner border border-black/20"
                          style={{ backgroundColor: rod.colorHex }}
                        />
                        <div>
                          <div className="text-xs font-medium text-[#29170F]">{rod.name}</div>
                          <div className="text-[10px] text-[#8F6922]">{rod.finialType}</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#8F6922] font-semibold">Select</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onDirectEnquire('Curtain Rods', selectedRod.name)}
                    className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire About {selectedRod.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Vertical Blinds Studio */}
        {activeTab === 'vertical-blinds' && (
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl border border-[#B58B3C]/30 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive Slat Light Simulator */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-inner border border-[#B58B3C]/30 bg-[#29170F]">
                  <img
                    src="/images/project-blinds-installation.jpg"
                    alt="Authentic Blinds Installation by Kamlesh Interiors"
                    className="w-full h-full object-cover"
                  />

                  {/* Dynamic Light Simulation Overlay based on blind angle */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,245,225,${(blindAngle / 90) * 0.45}) 0%, transparent 80%)`,
                    }}
                  />

                  <div className="absolute top-6 left-6 bg-[#29170F]/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-[#B58B3C]/30">
                    <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                      Solar Glare Control
                    </span>
                    <span className="font-serif-luxury text-sm font-semibold text-[#E7D9C5]">
                      Slat Angle: {blindAngle}° {blindAngle > 60 ? '(High Light)' : blindAngle > 30 ? '(Soft Diffusion)' : '(Maximum Privacy)'}
                    </span>
                  </div>

                  {/* Slat Angle Controller Bar */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[#29170F]/90 backdrop-blur-md p-4 rounded-2xl text-white border border-[#B58B3C]/30">
                    <div className="flex justify-between items-center text-xs font-medium mb-2">
                      <span className="flex items-center gap-1.5 text-[#E7D9C5]">
                        <Sun className="w-3.5 h-3.5 text-[#B58B3C]" />
                        Rotate Slat Louvers:
                      </span>
                      <span className="font-mono text-[#B58B3C] font-bold">{blindAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="5"
                      value={blindAngle}
                      onChange={(e) => setBlindAngle(Number(e.target.value))}
                      className="w-full accent-[#B58B3C] h-2 bg-white/20 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/50 mt-1.5">
                      <span>0° Closed (Privacy)</span>
                      <span>45° Filtered Light</span>
                      <span>90° Open (Full View)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Blinds Features */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6922] block mb-2">
                    Category 05 • Vertical Blinds
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#29170F]">
                    Contemporary Vertical & Roller Blinds
                  </h3>
                  <p className="text-sm text-[#29170F]/80 font-light mt-2 leading-relaxed">
                    Designed for expansive glass windows, office spaces, and modern living rooms. Easy wand-rotation provides precision solar heat management and privacy.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#B58B3C]/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#B58B3C] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#29170F]">Precision Solar Glare Deflection</div>
                      <div className="text-xs text-[#29170F]/70">Reduces room temperatures while maintaining soft ambient daylight.</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#B58B3C]/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#B58B3C] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#29170F]">Custom Sizing for High Ceilings</div>
                      <div className="text-xs text-[#29170F]/70">Fabricated to exact millimetric window dimensions in Salem.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onDirectEnquire('Vertical Blinds', `Slat Angle ${blindAngle}°`)}
                    className="w-full py-3.5 rounded-full bg-[#B58B3C] hover:bg-[#9E762B] text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire About Vertical Blinds</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveShowroom;
