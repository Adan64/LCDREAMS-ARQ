'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Award {
  id: number;
  year: number;
  title: string;
  organization: string;
  category: string;
  project: string;
  description: string;
}

interface AwardsSectionProps {
  className?: string;
}

const AwardsSection = ({ className = '' }: AwardsSectionProps) => {
  const t = useTranslations('About.awards');
  const [expandedAward, setExpandedAward] = useState<number | null>(null);

  const awards: Award[] = [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    year: id === 1 ? 2025 : id <= 3 ? 2024 : id <= 5 ? 2023 : 2022,
    title: t(`items.${id}.title`),
    organization: t(`items.${id}.organization` as any),
    category: t(`items.${id}.category`),
    project: t(`items.${id}.project` as any),
    description: t(`items.${id}.description`)
  }));

  const certifications = ['leed', 'aia', 'ncarb', 'passive', 'well'];

  const issuers: Record<string, string> = {
    leed: 'usgbc',
    aia: 'aia',
    ncarb: 'ncarb',
    passive: 'phi',
    well: 'well'
  };

  const handleAwardClick = (id: number) => {
    setExpandedAward(expandedAward === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-lcdream-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6">
            {t('title')}
          </h2>
          <p className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Awards List */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-gold mb-8 flex items-center">
              <span className="w-8 h-[1px] bg-lcdream-gold mr-4" />
              {t('recentTitle')}
            </h3>

            <div className="space-y-4">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className={`border-b border-white/10 pb-4 transition-all duration-300 ${expandedAward === award.id ? 'bg-white/5 rounded-lg p-6 border-none' : 'hover:bg-white/5 hover:rounded-lg hover:p-6 hover:border-none'
                    }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer group"
                    onClick={() => handleAwardClick(award.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-sm text-lcdream-gold opacity-80">{award.year}</span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="font-body text-xs font-body-medium text-accent uppercase tracking-wider">{award.category}</span>
                      </div>
                      <h4 className="font-headline text-xl font-headline-medium text-lcdream-white group-hover:text-lcdream-gold transition-colors">
                        {award.title}
                      </h4>
                      <p className="font-body text-sm font-body-regular text-text-secondary mt-1">
                        {award.organization} • {award.project}
                      </p>
                    </div>
                    <button
                      className={`ml-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-lcdream-white transition-all ${expandedAward === award.id ? 'bg-lcdream-gold border-lcdream-gold text-black rotate-45' : 'group-hover:border-lcdream-gold group-hover:text-lcdream-gold'
                        }`}
                    >
                      <Icon name="PlusIcon" size={16} />
                    </button>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${expandedAward === award.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-body text-base font-body-regular text-text-primary leading-relaxed pl-4 border-l-2 border-lcdream-gold/30">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Badges */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-xl p-8 lg:p-10 border border-white/5 shadow-architectural sticky top-32">
              <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-8 text-center">
                {t('certificationsTitle')}
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth border border-white/5 hover:border-lcdream-gold/20 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-black/40 rounded-full border border-white/10 text-lcdream-gold group-hover:scale-110 transition-transform">
                      <Icon name="AcademicCapIcon" size={24} />
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-headline-medium text-lcdream-white group-hover:text-lcdream-gold transition-colors">
                        {t(`certifications.${cert}` as any)}
                      </h4>
                      <p className="font-body text-sm font-body-regular text-text-secondary">
                        {t(`issuers.${issuers[cert]}` as any)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <p className="font-body text-sm font-body-italic text-text-secondary">
                  "Excellence is not an act, but a habit."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;