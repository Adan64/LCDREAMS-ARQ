'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FooterSection = () => {
  const t = useTranslations('Homepage.Footer');
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerSections: FooterSection[] = [
    {
      title: t('sections.services'),
      links: [
        { label: t('links.services.residential'), href: "/services" },
        { label: t('links.services.commercial'), href: "/services" },
        { label: t('links.services.urban'), href: "/services" },
        { label: t('links.services.interior'), href: "/services" }
      ]
    },
    {
      title: t('sections.company'),
      links: [
        { label: t('links.company.about'), href: "/about" },
        { label: t('links.company.portfolio'), href: "/portfolio-gallery" },
        { label: t('links.company.caseStudies'), href: "/project-case-studies" },
        { label: t('links.company.contact'), href: "/contact" }
      ]
    },
    {
      title: t('sections.legal'),
      links: [
        { label: t('links.legal.privacy'), href: "/homepage" },
        { label: t('links.legal.terms'), href: "/homepage" },
        { label: t('links.legal.cookies'), href: "/homepage" },
        { label: t('links.legal.legal'), href: "/homepage" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "ShareIcon", href: "#" },
    { name: "Instagram", icon: "CameraIcon", href: "#" },
    { name: "LinkedIn", icon: "BriefcaseIcon", href: "#" },
    { name: "Twitter", icon: "ChatBubbleLeftIcon", href: "#" }
  ];

  return (
    <footer className="bg-black text-lcdream-white pt-16 pb-8 border-t border-lcdream-gold/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4L4 16V32L24 44L44 32V16L24 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-lcdream-white"
                  />
                  <path
                    d="M24 4V44M4 16L44 32M44 16L4 32"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-lcdream-gold"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-headline-bold tracking-tight text-lcdream-gold">
                  LCDREAM.ARQ
                </span>
                <span className="font-body text-xs text-lcdream-gray-light tracking-wide uppercase">
                  Arquitectura e Interiores
                </span>
              </div>
            </Link>

            <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-6 max-w-md">
              {t('description')}
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-lcdream-gold/10 text-lcdream-gold rounded-full transition-smooth hover:bg-lcdream-gold hover:text-black hover:scale-110 border border-lcdream-gold/30"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline text-lg font-headline-semibold text-lcdream-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-lcdream-gray-light font-body-regular transition-smooth hover:text-lcdream-gold hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-lcdream-gold/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-lcdream-gray-light font-body-regular text-center md:text-left">
              {isHydrated ? `© ${currentYear}` : '© 2026'} LCDREAM.ARQ. {t('rights')}
            </p>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-lcdream-gray-light">
                <Icon name="ShieldCheckIcon" size={16} />
                <span className="font-body text-xs font-body-regular">
                  {t('certifications.iso')}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-lcdream-gray-light">
                <Icon name="CheckBadgeIcon" size={16} />
                <span className="font-body text-xs font-body-regular">
                  {t('certifications.leed')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;