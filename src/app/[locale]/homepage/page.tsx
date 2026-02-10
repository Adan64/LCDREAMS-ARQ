import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import ServicesSection from './components/ServicesSection';
import TrustSection from './components/TrustSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from '@/components/common/Footer';
import VirtualTourSection from '@/components/ui/VirtualTourSection';

export const metadata: Metadata = {
  title: 'Homepage - LCDREAM.ARQ',
  description: 'LCDREAM.ARQ es un estudio de arquitectura que transforma espacios con visión y creatividad, ofreciendo diseño residencial, arquitectura comercial y planificación urbana con excelencia profesional.',
};

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <PhilosophySection />
        <FeaturedProjectsSection />
        <ServicesSection />
        <TrustSection />
        <TestimonialsSection />
        <VirtualTourSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}