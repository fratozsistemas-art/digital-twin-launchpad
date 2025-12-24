import React from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import WhatIsSection from '@/components/landing/WhatIsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <WhatIsSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="use-cases">
          <UseCasesSection />
        </div>
        <TestimonialsSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}