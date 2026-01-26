import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
}

interface DesignProcessProps {
  steps: ProcessStep[];
}

const DesignProcess = ({ steps }: DesignProcessProps) => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary mb-4">
            Proceso de Diseño
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Un viaje meticuloso desde el concepto hasta la finalización, donde cada fase aporta valor y claridad al proyecto.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-architectural">
                  <AppImage
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={step.icon as any} size={32} className="text-accent" />
                  </div>
                  <span className="font-body text-sm font-body-semibold text-accent uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>
                
                <h3 className="font-headline text-2xl lg:text-3xl font-headline-bold mb-4 text-white">
                  {step.title}
                </h3>
                
                <p className="font-body text-base lg:text-lg text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;