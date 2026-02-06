import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import ArchitectProfile from './components/ArchitectProfile';
import DesignPhilosophy from './components/DesignPhilosophy';
import TeamSection from './components/TeamSection';
import AwardsSection from './components/AwardsSection';
import SustainabilityCommitment from './components/SustainabilityCommitment';
import CTASection from './components/CTASection';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
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