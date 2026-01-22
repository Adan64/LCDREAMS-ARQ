'use client';

import React from 'react';

import ProcessStep from './ProcessStep';
import ComparisonTable from './ComparisonTable';
import TimelineCalculator from './TimelineCalculator';
import ConsultationBooking from './ConsultationBooking';
import DownloadableGuide from './DownloadableGuide';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  timeline: string;
  priceRange: string;
}

interface ProcessStepData {
  number: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

interface ComparisonFeature {
  name: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

interface ProjectType {
  id: string;
  name: string;
  baseTimeline: number;
  icon: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  pages: number;
  fileSize: string;
  coverImage: string;
  coverAlt: string;
}

interface ServicesInteractiveProps {
  services: Service[];
  processSteps: ProcessStepData[];
  comparisonFeatures: ComparisonFeature[];
  projectTypes: ProjectType[];
  availableDates: string[];
  guides: Guide[];
}

const ServicesInteractive = ({
  services,
  processSteps,
  comparisonFeatures,
  projectTypes,
  availableDates,
  guides
}: ServicesInteractiveProps) => {
  return (
    <div className="space-y-24">
      <section className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
        <div className="text-center mb-12">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block">
            Nuestro Proceso de Trabajo
          </span>
          <h1 className="font-headline text-5xl lg:text-7xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            Nuestro Proceso de Trabajo
          </h1>
          <p className="font-body text-xl lg:text-2xl text-lcdream-gray-light font-body-regular leading-relaxed max-w-3xl mx-auto">
            Un enfoque estructurado y transparente que garantiza resultados excepcionales en cada fase del proyecto
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              {...step}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary mb-4">
            Comparación de Paquetes
          </h2>
          <p className="font-body text-lg font-body-regular text-secondary max-w-3xl mx-auto">
            Elige el nivel de servicio que mejor se adapte a las necesidades de tu proyecto
          </p>
        </div>

        <ComparisonTable features={comparisonFeatures} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TimelineCalculator projectTypes={projectTypes} />
        <ConsultationBooking availableDates={availableDates} />
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary mb-4">
            Guías Descargables
          </h2>
          <p className="font-body text-lg font-body-regular text-secondary max-w-3xl mx-auto">
            Recursos gratuitos para ayudarte a planificar tu proyecto arquitectónico
          </p>
        </div>

        <DownloadableGuide guides={guides} />
      </section>
    </div>
  );
};

export default ServicesInteractive;