import React from 'react';
import { Link } from '@/i18n/routing';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

const CTASection = () => {
  const t = useTranslations('Homepage.CTA');

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-black via-lcdream-dark-bg to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl lg:text-6xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="font-body text-lg lg:text-xl text-lcdream-gray-light font-body-regular leading-relaxed text-center mb-10 max-w-2xl mx-auto">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-lcdream-gold text-black font-cta text-lg font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-1 hover:scale-105"
            >
              {t('buttons.schedule')}
              <Icon name="CalendarIcon" size={24} className="ml-2" />
            </Link>
            <Link
              href="/portfolio-gallery"
              className="inline-flex items-center px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-2 border-primary-foreground/30 font-cta text-lg font-cta-semibold rounded-md transition-smooth hover:bg-primary-foreground/20 hover:border-primary-foreground/50"
            >
              {t('buttons.portfolio')}
              <Icon name="ArrowRightIcon" size={24} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20">
            <div className="text-center">
              <Icon name="PhoneIcon" size={32} className="text-accent mx-auto mb-3" />
              <div className="font-body text-sm text-primary-foreground/70 font-body-regular mb-1">
                {t('contact.call')}
              </div>
              <div className="font-body text-lg text-primary-foreground font-body-semibold">
                +595 971 954 037
              </div>
            </div>

            <div className="text-center">
              <Icon name="EnvelopeIcon" size={32} className="text-accent mx-auto mb-3" />
              <div className="font-body text-sm text-primary-foreground/70 font-body-regular mb-1">
                {t('contact.email')}
              </div>
              <div className="font-body text-lg text-primary-foreground font-body-semibold">
                badan4074@gmail.com
              </div>
            </div>

            <div className="text-center">
              <Icon name="MapPinIcon" size={32} className="text-accent mx-auto mb-3" />
              <div className="font-body text-sm text-primary-foreground/70 font-body-regular mb-1">
                {t('contact.visit')}
              </div>
              <div className="font-body text-lg text-primary-foreground font-body-semibold">
                Madrid, España
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;