import { useState } from 'react';
import Navbar from './components/Navbar';
import Room3D from './components/Hero3D/Room3D';
import BrandBannerShowcase from './components/BrandBannerShowcase';
import InteractiveShowroom from './components/InteractiveShowroom';
import ScrollStory from './components/ScrollStory';
import PortfolioGallery from './components/PortfolioGallery';
import WhyChooseUs from './components/WhyChooseUs';
import EnquirySection from './components/EnquirySection';
import ShowroomLocation from './components/ShowroomLocation';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProductDetailModal from './components/ProductDetailModal';
import { PRODUCT_CATEGORIES, BUSINESS_INFO } from './data/brandData';
import type { ProductCategory } from './types';

export function App() {
  const [selectedProductModal, setSelectedProductModal] = useState<ProductCategory | null>(null);
  const [activeShowroomCategory, setActiveShowroomCategory] = useState<string>('wallpapers');
  const [enquiryCategory, setEnquiryCategory] = useState<string>('Premium Wallpapers');
  const [enquiryDetail, setEnquiryDetail] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    const found = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
    if (found) {
      setSelectedProductModal(found);
      setActiveShowroomCategory(categoryId);
    }
  };

  const handleDirectEnquire = (categoryTitle: string, itemDetail?: string) => {
    setEnquiryCategory(categoryTitle);
    if (itemDetail) setEnquiryDetail(itemDetail);
    scrollToSection('enquiry');
  };

  const handleScheduleVisit = () => {
    const text = encodeURIComponent(
      `Hello Kamlesh Interiors! I would like to schedule a visit to your showroom in Ponnammapet, Salem to see your wallpaper, flooring, and window furnishing samples.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#29170F] font-sans antialiased overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        onEnquireClick={() => scrollToSection('enquiry')}
      />

      {/* Hero Section: 3D Luxury Living Room */}
      <section id="hero">
        <Room3D
          onExploreClick={() => scrollToSection('interactive-showroom')}
          onShowroomClick={() => scrollToSection('showroom')}
        />
      </section>

      {/* Brand Identity & Banner Showcase */}
      <section id="collections">
        <BrandBannerShowcase onCategorySelect={handleCategorySelect} />
      </section>

      {/* Interactive 3D Product Showroom Studio */}
      <InteractiveShowroom
        selectedCategory={activeShowroomCategory}
        onDirectEnquire={handleDirectEnquire}
      />

      {/* Scroll-Driven Storytelling Narrative */}
      <ScrollStory />

      {/* Premium Portfolio Gallery */}
      <PortfolioGallery />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Showroom Location & Interactive Map */}
      <ShowroomLocation onScheduleVisitClick={handleScheduleVisit} />

      {/* Conversion Enquiry Experience */}
      <EnquirySection
        initialCategory={enquiryCategory}
        initialItemDetail={enquiryDetail}
      />

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onCategorySelect={handleCategorySelect}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Expandable Product Detail Modal */}
      <ProductDetailModal
        category={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onEnquire={(title) => handleDirectEnquire(title)}
      />
    </div>
  );
}

export default App;
