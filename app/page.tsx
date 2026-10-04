import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import DigitalProfileSection from "./components/DigitalProfileSection";
import HowItWorksSection from "./components/HowItWorksSection";
import QRSection from "./components/QRSection";
import BenefitsSection from "./components/BenefitsSection";
import FinalCTASection from "./components/FinalCTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Section right below Header */}
      <HeroSection />

      {/* 2. Key Stats bar */}
      <StatsSection />

      {/* 3. Features Overview */}
      <FeaturesSection />

      {/* 4. Single Digital Profile Showcase */}
      <DigitalProfileSection />

      {/* 5. 3-Step How It Works */}
      <HowItWorksSection />

      {/* 6. QR Code Section */}
      <QRSection />

      {/* 7. Key Benefits Grid */}
      <BenefitsSection />

      {/* 8. Final CTA Banner */}
      <FinalCTASection />
    </main>
  );
}
