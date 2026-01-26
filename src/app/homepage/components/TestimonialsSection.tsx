'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
  projectType: string;
}

const TestimonialsSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    role: "Propietaria",
    company: "Villa Mediterránea",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    alt: "Professional woman with brown hair in business attire smiling at camera",
    rating: 5,
    text: "LCDREAM.ARQ transformó completamente nuestra visión en realidad. Su atención al detalle y compromiso con la sostenibilidad superaron todas nuestras expectativas. El proceso fue fluido y el resultado final es simplemente espectacular.",
    projectType: "Residencial"
  },
  {
    id: 2,
    name: "Carlos Martínez",
    role: "Director General",
    company: "Innovatech Solutions",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d932125-1763301249072.png",
    alt: "Hispanic businessman in navy suit with short black hair smiling confidently",
    rating: 5,
    text: "Nuestro nuevo espacio de oficinas ha revolucionado la forma en que trabajamos. El diseño fomenta la colaboración y creatividad. El equipo de LCDREAM.ARQ entendió perfectamente nuestra cultura empresarial y la plasmó en cada rincón.",
    projectType: "Comercial"
  },
  {
    id: 3,
    name: "Laura Sánchez",
    role: "Fundadora",
    company: "Wellness Center Zen",
    image: "https://images.unsplash.com/photo-1650603697000-18d771fe3a7e",
    alt: "Young woman with long dark hair in casual attire smiling warmly outdoors",
    rating: 5,
    text: "El diseño biofílico que crearon para nuestro centro de bienestar es absolutamente mágico. Cada espacio transmite paz y armonía. Nuestros clientes constantemente elogian la atmósfera única que han logrado crear.",
    projectType: "Comercial"
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHydrated, testimonials.length]);

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  if (!isHydrated) {
    return (
      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-96 bg-background rounded-lg animate-pulse" />
        </div>
      </section>);

  }

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-16 leading-tight text-center">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="font-body text-xl text-text-secondary font-body-regular max-w-3xl mx-auto leading-relaxed">
            La satisfacción de nuestros clientes es nuestro mayor logro
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-background rounded-lg shadow-elevated p-8 lg:p-12">
            {testimonials.map((testimonial, index) =>
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
              index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`
              }>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-accent/20">
                      <AppImage
                      src={testimonial.image}
                      alt={testimonial.alt}
                      className="w-full h-full object-cover" />

                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      {[...Array(testimonial.rating)].map((_, i) =>
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={20}
                      variant="solid"
                      className="text-accent" />

                    )}
                    </div>

                    <blockquote className="font-quote text-xl lg:text-2xl text-text-primary font-quote-regular italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="font-headline text-xl font-headline-semibold text-primary">
                          {testimonial.name}
                        </div>
                        <div className="font-body text-sm text-text-secondary font-body-regular">
                          {testimonial.role} • {testimonial.company}
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <span className="px-4 py-2 bg-accent/10 text-accent font-body text-sm font-body-semibold rounded-full">
                          {testimonial.projectType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handlePrevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 flex items-center justify-center bg-accent text-accent-foreground rounded-full transition-smooth hover:bg-accent/90 hover:scale-110 shadow-architectural"
            aria-label="Testimonio anterior">

            <Icon name="ChevronLeftIcon" size={24} />
          </button>

          <button
            onClick={handleNextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 flex items-center justify-center bg-accent text-accent-foreground rounded-full transition-smooth hover:bg-accent/90 hover:scale-110 shadow-architectural"
            aria-label="Siguiente testimonio">

            <Icon name="ChevronRightIcon" size={24} />
          </button>

          <div className="flex items-center justify-center mt-8 space-x-2">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full transition-smooth ${
              index === currentTestimonial ?
              'bg-accent w-8' : 'bg-border hover:bg-accent/50'}`
              }
              aria-label={`Ir al testimonio ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;