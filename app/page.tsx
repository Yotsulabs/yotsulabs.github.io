import Navbar from "./components/Navbar";
import HeroSection from "./landingpage/HeroSection";
import ServicesSection from "./landingpage/ServicesSection";
import ProcessSection from "./landingpage/ProcessSection";
import PortfolioSection from "./landingpage/PortfolioSection";
import EstimatorSection from "./landingpage/EstimatorSection";
import FaqSection from "./landingpage/FaqSection";
import CtaSection from "./landingpage/CtaSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-grid-pattern text-[#13102b] flex flex-col font-sans selection:bg-[#7b42f5] selection:text-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <EstimatorSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
