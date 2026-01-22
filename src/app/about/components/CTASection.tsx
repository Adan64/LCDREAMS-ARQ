import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-black via-lcdream-dark-bg to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-headline text-4xl lg:text-6xl font-headline-bold text-lcdream-white mb-6 leading-tight text-center">
          Ready to Transform Your Space?
        </h2>
        <p className="font-body text-lg lg:text-xl text-lcdream-gray-light font-body-regular leading-relaxed text-center mb-10 max-w-2xl mx-auto">
          Let's discuss how we can bring your architectural vision to life with our expertise, creativity, and commitment to excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-lcdream-gold text-black font-cta text-lg font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-1"
          >
            <span>Schedule a Consultation</span>
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </Link>
          <Link
            href="/portfolio-gallery"
            className="inline-flex items-center justify-center px-8 py-4 font-cta text-base font-cta-semibold text-primary-foreground bg-transparent border-2 border-primary-foreground rounded-md transition-smooth hover:bg-primary-foreground/10"
          >
            <span>View Our Portfolio</span>
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;