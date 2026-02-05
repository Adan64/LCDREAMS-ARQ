import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface PhilosophyPillar {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const PhilosophySection = () => {
  const t = useTranslations('Homepage.Philosophy');

  const philosophyPillars: PhilosophyPillar[] = [
    {
      id: 1,
      icon: "LightBulbIcon",
      title: t('items.1.title'),
      description: t('items.1.description')
    },
    {
      id: 2,
      icon: "SparklesIcon",
      title: t('items.2.title'),
      description: t('items.2.description')
    },
    {
      id: 3,
      icon: "GlobeAltIcon",
      title: t('items.3.title'),
      description: t('items.3.description')
    },
    {
      id: 4,
      icon: "UserGroupIcon",
      title: t('items.4.title'),
      description: t('items.4.description')
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block text-center">
            {t('label')}
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight text-center">
            {t('title')}
          </h2>
          <p className="font-accent text-xl lg:text-2xl text-lcdream-gray-light font-accent-regular italic leading-relaxed text-center max-w-4xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-black rounded-lg p-8 shadow-subtle border border-lcdream-gold/20 hover:border-lcdream-gold hover:shadow-2xl hover:shadow-lcdream-gold/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer"
            >
              <div className="w-16 h-16 bg-lcdream-gold/10 rounded-full flex items-center justify-center mb-6 border border-lcdream-gold/30 group-hover:bg-lcdream-gold/20 transition-colors duration-300">
                <Icon name={pillar.icon as any} size={32} className="text-lcdream-gold" />
              </div>
              <h3 className="font-headline text-xl font-headline-semibold text-lcdream-gold mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;