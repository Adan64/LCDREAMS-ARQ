import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary-foreground mb-4">
          ¿Listo para Transformar Tu Espacio?
        </h2>
        <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Trabajemos juntos para crear un proyecto excepcional que supere tus expectativas y transforme tu visión en realidad.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 font-cta text-base font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5"
          >
            <Icon name="CalendarIcon" size={20} className="mr-2" />
            Agendar Consulta
          </Link>
          
          <Link
            href="/portfolio-gallery"
            className="inline-flex items-center px-8 py-4 font-cta text-base font-cta-semibold text-primary-foreground border-2 border-primary-foreground/20 rounded-md transition-smooth hover:border-primary-foreground/40 hover:bg-white/5"
          >
            <Icon name="RectangleStackIcon" size={20} className="mr-2" />
            Ver Más Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;