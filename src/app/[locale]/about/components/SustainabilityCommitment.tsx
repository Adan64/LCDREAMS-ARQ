import { useTranslations } from 'next-intl';
import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SustainabilityInitiative {
  icon: string;
  title: string;
  description: string;
  impact: string;
}

// SustainabilityProject interface is removed as its content is now fetched via translations

interface SustainabilityCommitmentProps {
  className?: string;
}

const SustainabilityCommitment = ({ className = '' }: SustainabilityCommitmentProps) => {
  const t = useTranslations('About.sustainability');

  const initiatives: SustainabilityInitiative[] = [
    {
      icon: "SunIcon",
      key: "renewable"
    },
    {
      icon: "CubeIcon",
      key: "materials"
    },
    {
      icon: "CloudIcon",
      key: "water"
    },
    {
      icon: "HomeModernIcon",
      key: "passive"
    }
  ].map(item => ({
    icon: item.icon,
    title: t(`initiatives.${item.key}.title`),
    description: t(`initiatives.${item.key}.description`),
    impact: t(`initiatives.${item.key}.impact`)
  }));

  const achievements = [0, 1, 2, 3, 4].map(i => t(`showcase.achievements.${i}` as any));

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-6">
            <Icon name="GlobeAltIcon" size={32} className="text-accent" />
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6">
            {t('title')}
          </h2>
          <p className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="bg-lcdream-dark-bg p-8 rounded-lg border border-white/5 hover:border-accent/30 transition-smooth group hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <Icon name={initiative.icon} size={24} className="text-lcdream-white group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-headline text-xl font-headline-semibold text-lcdream-white mb-3">
                {initiative.title}
              </h3>
              <p className="font-body text-sm font-body-regular text-text-secondary mb-4 leading-relaxed">
                {initiative.description}
              </p>
              <div className="flex items-center text-accent text-xs font-body-bold">
                <Icon name="ArrowTrendingUpIcon" size={14} className="mr-2" />
                {initiative.impact}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl overflow-hidden shadow-architectural border border-white/10 lg:grid lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <AppImage
              src="https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg"
              alt="Sustainable residential project with green roof and solar panels"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-body-bold uppercase tracking-wider mb-2 inline-block">
                {t('showcase.tag')}
              </span>
              <h3 className="font-headline text-2xl lg:text-3xl font-headline-bold text-white">
                EcoHabitat 2030
              </h3>
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <p className="font-body text-lg font-body-regular text-text-secondary mb-8">
              {t('showcase.description')}
            </p>
            <h4 className="font-headline text-base font-headline-bold text-lcdream-white mb-4 uppercase tracking-wider">
              {t('showcase.achievementsTitle')}
            </h4>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-center text-text-primary">
                  <Icon name="CheckCircleIcon" size={20} className="text-accent mr-3 flex-shrink-0" />
                  <span className="font-body text-sm font-body-medium">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-4">
            {t('footer.title')}
          </h3>
          <p className="font-body text-text-secondary max-w-2xl mx-auto mb-10">
            {t('footer.description')}
          </p>
          <div className="inline-grid grid-cols-3 gap-8 text-center divide-x divide-white/10">
            <div>
              <div className="font-headline text-3xl font-headline-bold text-accent mb-1">50+</div>
              <div className="font-body text-xs text-text-secondary uppercase tracking-wider">{t('stats.1.label')}</div>
            </div>
            <div>
              <div className="font-headline text-3xl font-headline-bold text-accent mb-1">12</div>
              <div className="font-body text-xs text-text-secondary uppercase tracking-wider">{t('stats.2.label')}</div>
            </div>
            <div>
              <div className="font-headline text-3xl font-headline-bold text-accent mb-1">45%</div>
              <div className="font-body text-xs text-text-secondary uppercase tracking-wider">{t('stats.3.label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitment;