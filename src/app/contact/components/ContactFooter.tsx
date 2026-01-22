import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

interface ContactFooterProps {
  className?: string;
}

const ContactFooter = ({ className = '' }: ContactFooterProps) => {
  const socialLinks: SocialLink[] = [
    { name: 'Instagram', icon: 'CameraIcon', href: 'https://instagram.com/archivision' },
    { name: 'LinkedIn', icon: 'BriefcaseIcon', href: 'https://linkedin.com/company/archivision' },
    { name: 'Pinterest', icon: 'PhotoIcon', href: 'https://pinterest.com/archivision' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-primary text-primary-foreground py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-headline text-lg font-headline-semibold mb-4">
              ArchiVision
            </h3>
            <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">
              Transforming spaces with vision and creativity. Where function meets beauty to create extraordinary architectural experiences.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-lg font-headline-semibold mb-4">
              Quick Links
            </h3>
            <nav className="space-y-2">
              <Link
                href="/homepage"
                className="block font-body text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                Home
              </Link>
              <Link
                href="/portfolio-gallery"
                className="block font-body text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                Portfolio
              </Link>
              <Link
                href="/services"
                className="block font-body text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block font-body text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                About
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-headline text-lg font-headline-semibold mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center transition-smooth hover:bg-accent hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
            <p className="font-body text-sm text-primary-foreground/80">
              Follow us for design inspiration and project updates
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="font-body text-sm text-primary-foreground/60">
              &copy; {currentYear} ArchiVision. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-smooth"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-smooth"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;