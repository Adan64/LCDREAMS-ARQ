import React from 'react';
import { useTranslations } from 'next-intl';

interface ContactHeroProps {
  className?: string;
}

const ContactHero = ({ className = '' }: ContactHeroProps) => {
  const t = useTranslations('Contact.hero');

  return (
    <section className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block">
            {t('label')}
          </span>
          <h1 className="font-headline text-5xl lg:text-7xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="font-body text-xl lg:text-2xl text-lcdream-gray-light font-body-regular leading-relaxed max-w-3xl">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;