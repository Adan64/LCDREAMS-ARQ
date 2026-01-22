import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import ArchitectProfile from './components/ArchitectProfile';
import DesignPhilosophy from './components/DesignPhilosophy';
import TeamSection from './components/TeamSection';
import AwardsSection from './components/AwardsSection';
import SustainabilityCommitment from './components/SustainabilityCommitment';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'About - ArchiVision',
  description: 'Discover ArchiVision\'s design philosophy, meet our talented team, and explore our commitment to sustainable architecture. Learn about our awards, certifications, and approach to creating spaces that transform lives.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20">
        <HeroSection />
        <ArchitectProfile />
        <DesignPhilosophy />
        <TeamSection />
        <AwardsSection />
        <SustainabilityCommitment />
        <CTASection />
      </div>
    </main>
  );
}