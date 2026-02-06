import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  const t = useTranslations('About.cta');

  return (
    <section className="py-20 lg:py-32 bg-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-accent-foreground mb-6 leading-tight">
          {t('title')}
        </h2>
        <p className="font-body text-lg lg:text-xl font-body-medium text-accent-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-lg font-cta font-cta-bold hover:bg-black/80 transition-smooth shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('schedule')}
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-black text-black rounded-lg font-cta font-cta-bold hover:bg-black/5 transition-smooth">
            {t('portfolio')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;