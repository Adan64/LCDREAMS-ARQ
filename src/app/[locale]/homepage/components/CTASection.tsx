import React from 'react';
import { Link } from '@/i18n/routing';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';
import DirectContactForm from '@/components/ui/DirectContactForm';

const CTASection = () => {
  const t = useTranslations('Homepage.CTA');

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-black via-lcdream-dark-bg to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="text-left">
            <h2 className="font-headline text-4xl lg:text-5xl xl:text-6xl font-headline-bold text-lcdream-white mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="font-body text-lg lg:text-xl text-lcdream-gray-light font-body-regular leading-relaxed mb-10 max-w-lg">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-1 hover:scale-105"
              >
                {t('buttons.schedule')}
                <Icon name="CalendarIcon" size={20} className="ml-2" />
              </Link>
              <Link
                href="/portfolio-gallery"
                className="inline-flex items-center px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-2 border-primary-foreground/30 font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-primary-foreground/20 hover:border-primary-foreground/50"
              >
                {t('buttons.portfolio')}
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-primary-foreground/20">
              <div className="flex items-start">
                <Icon name="PhoneIcon" size={24} className="text-accent mr-4 flex-shrink-0" />
                <div>
                  <div className="font-body text-xs text-primary-foreground/70 font-body-regular mb-1 uppercase tracking-wider">
                    {t('contact.call')}
                  </div>
                  <div className="font-body text-base text-primary-foreground font-body-semibold">
                    +595 971 954 037
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Icon name="EnvelopeIcon" size={24} className="text-accent mr-4 flex-shrink-0" />
                <div>
                  <div className="font-body text-xs text-primary-foreground/70 font-body-regular mb-1 uppercase tracking-wider">
                    {t('contact.email')}
                  </div>
                  <div className="font-body text-base text-primary-foreground font-body-semibold break-all">
                    badan4074@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-xl mx-auto lg:mx-0">
            <DirectContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;