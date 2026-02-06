import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

interface ContactFooterProps {
  className?: string;
}

const ContactFooter = ({ className = '' }: ContactFooterProps) => {
  const t = useTranslations('Contact.footer');

  return (
    <footer className={`bg-primary text-white pt-20 pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-headline text-2xl font-headline-bold text-white tracking-wider">
                LCDREAM<span className="text-accent">.ARQ</span>
              </span>
            </Link>
            <p className="font-body text-gray-400 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Icon name="GlobeAltIcon" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Icon name="CameraIcon" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                {/* LinkedIn icon or similar */}
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-headline-bold text-white mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="font-body text-gray-400 hover:text-accent transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="font-body text-gray-400 hover:text-accent transition-colors">
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-body text-gray-400 hover:text-accent transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-body text-gray-400 hover:text-accent transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-headline-bold text-white mb-6">
              {t('connect')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <Icon name="MapPinIcon" size={20} className="mt-1 text-accent flex-shrink-0" />
                <span className="font-body">Calle de Serrano 45, 28001 Madrid, Spain</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Icon name="PhoneIcon" size={20} className="mt-1 text-accent flex-shrink-0" />
                <a href="tel:+34912345678" className="font-body hover:text-white transition-colors">
                  +34 912 345 678
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Icon name="EnvelopeIcon" size={20} className="mt-1 text-accent flex-shrink-0" />
                <a href="mailto:contact@lcdream.arq" className="font-body hover:text-white transition-colors">
                  contact@lcdream.arq
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-headline text-lg font-headline-bold text-white mb-6">
              {t('follow')}
            </h3>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              {/* <p className="font-body text-sm text-gray-300 mb-4">
                 Subscribe to our newsletter for the latest design trends and studio updates.
               </p> */}
              {/* Simple subscribe form could go here */}
              <Link
                href="/contact"
                className="block w-full py-3 px-4 bg-accent text-white text-center rounded hover:bg-accent/90 transition-colors font-cta font-cta-semibold"
              >
                {t('connect')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t('rights')}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="font-body text-sm text-gray-500 hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="font-body text-sm text-gray-500 hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;