'use client';

import React, { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const t = useTranslations('Header.nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { label: t('home'), href: '/homepage' },
    { label: t('portfolio'), href: '/portfolio-gallery' },
    { label: t('caseStudies'), href: '/project-case-studies' },
    { label: t('services'), href: '/services' },
    { label: t('about'), href: '/about' },
    { label: t('resources'), href: '/resources-blog' },
  ];

  // Updating messages in next step to include missing keys.
  // For now I will use what I have and add "caseStudies" and "resources" to messages.

  const moreItems: NavigationItem[] = [
    { label: t('contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth border-b ${isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-gold border-lcdream-gold/20' : 'bg-black/80 backdrop-blur-sm border-lcdream-gold/10'
          } ${className}`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-20 px-6 lg:px-12">
            <Link
              href="/homepage"
              className="flex items-center space-x-3 group"
              onClick={closeMobileMenu}
            >
              <div className="relative w-12 h-12 transition-smooth group-hover:scale-105">
                <Image
                  src="/assets/images/WhatsApp_Image_2026-01-21_at_4.57.17_PM-1769110981223.jpeg"
                  alt="LCDREAM.ARQ Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-headline-bold text-lcdream-gold tracking-tight">
                  LCDREAM.ARQ
                </span>
                <span className="font-body text-xs text-lcdream-gray-light tracking-wide uppercase">
                  Arquitectura e Interiores
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 font-body text-sm font-body-regular transition-smooth rounded-md ${isActiveRoute(item.href)
                    ? 'text-lcdream-gold bg-lcdream-gold/10 shadow-gold' : 'text-lcdream-white hover:text-lcdream-gold hover:bg-lcdream-gold/5'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative group">
                <button className="px-4 py-2 font-body text-sm font-body-regular text-lcdream-white hover:text-lcdream-gold hover:bg-lcdream-gold/5 transition-smooth rounded-md flex items-center space-x-1">
                  <span>More</span>
                  <Icon name="ChevronDownIcon" size={16} className="transition-smooth group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-lcdream-dark-bg border border-lcdream-gold/20 shadow-elevated rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                  <div className="py-2">
                    {moreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 font-body text-sm font-body-regular transition-smooth ${isActiveRoute(item.href)
                          ? 'text-lcdream-gold bg-lcdream-gold/10' : 'text-lcdream-white hover:text-lcdream-gold hover:bg-lcdream-gold/5'
                          }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="ml-4">
                <LocaleSwitcher />
              </div>

            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 font-cta text-sm font-cta-semibold text-black bg-lcdream-gold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-0.5"
              >
                Schedule Consultation
              </Link>
            </div>

            <div className="lg:hidden flex items-center space-x-4">
              {/* Mobile Language Switcher */}
              <LocaleSwitcher />

              <button
                onClick={toggleMobileMenu}
                className="p-2 text-lcdream-gold hover:text-lcdream-gold-light transition-smooth"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <Icon name="XMarkIcon" size={28} />
                ) : (
                  <Icon name="Bars3Icon" size={28} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black lg:hidden"
          style={{ top: '80px' }}
        >
          <nav className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 px-6 py-8 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 font-body text-base font-body-regular rounded-md transition-smooth ${isActiveRoute(item.href)
                    ? 'text-lcdream-gold bg-lcdream-gold/10 shadow-gold' : 'text-lcdream-white hover:text-lcdream-gold hover:bg-lcdream-gold/5'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-lcdream-gold/20">
                {moreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 font-body text-base font-body-regular rounded-md transition-smooth ${isActiveRoute(item.href)
                      ? 'text-lcdream-gold bg-lcdream-gold/10 shadow-gold' : 'text-lcdream-white hover:text-lcdream-gold hover:bg-lcdream-gold/5'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 p-6 bg-lcdream-dark-bg border-t border-lcdream-gold/20">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-full px-6 py-4 font-cta text-base font-cta-semibold text-black bg-lcdream-gold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold"
              >
                Schedule Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;