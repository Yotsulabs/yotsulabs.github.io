import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/landing-page/HeroSection";
import ServicesSection from "./components/sections/landing-page/ServicesSection";
import ProcessSection from "./components/sections/landing-page/ProcessSection";
import PortfolioSection from "./components/sections/landing-page/PortfolioSection";
import FaqSection from "./components/sections/landing-page/FaqSection";
import CtaSection from "./components/sections/landing-page/CtaSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-grid-pattern text-brand-ink flex flex-col font-sans selection:bg-brand-purple selection:text-white">
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
