import Navbar from "./components/Navbar";
import HeroSection from "./landing-page/HeroSection";
import ServicesSection from "./landing-page/ServicesSection";
import ProcessSection from "./landing-page/ProcessSection";
import PortfolioSection from "./landing-page/PortfolioSection";
import FaqSection from "./landing-page/FaqSection";
import CtaSection from "./landing-page/CtaSection";
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
      <FaqSection />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
