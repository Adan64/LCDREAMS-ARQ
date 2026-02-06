import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import OriginSection from './components/OriginSection';
import ArchitectProfile from './components/ArchitectProfile';
import DesignPhilosophy from './components/DesignPhilosophy';
import WhyUsSection from './components/WhyUsSection';
import TeamSection from './components/TeamSection';
import AwardsSection from './components/AwardsSection';
import SustainabilityCommitment from './components/SustainabilityCommitment';
import CTASection from './components/CTASection';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <HeroSection />
        <OriginSection />
        <ArchitectProfile />
        <DesignPhilosophy />
        <WhyUsSection />
        <TeamSection />
        <AwardsSection />
        <SustainabilityCommitment />
        <CTASection />
      </div>
    </main>
  );
}