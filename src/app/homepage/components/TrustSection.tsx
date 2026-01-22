import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustIndicator {
  id: number;
  icon: string;
  value: string;
  label: string;
}

interface Award {
  id: number;
  name: string;
  year: number;
  organization: string;
}

const TrustSection = () => {
  const trustIndicators: TrustIndicator[] = [
    {
      id: 1,
      icon: "CalendarDaysIcon",
      value: "15+",
      label: "Años de Experiencia"
    },
    {
      id: 2,
      icon: "BuildingOffice2Icon",
      value: "200+",
      label: "Proyectos Completados"
    },
    {
      id: 3,
      icon: "UserGroupIcon",
      value: "150+",
      label: "Clientes Satisfechos"
    },
    {
      id: 4,
      icon: "TrophyIcon",
      value: "25+",
      label: "Premios Ganados"
    }
  ];

  const recentAwards: Award[] = [
    {
      id: 1,
      name: "Premio Nacional de Arquitectura",
      year: 2025,
      organization: "Consejo Superior de Arquitectos de España"
    },
    {
      id: 2,
      name: "Mejor Diseño Sostenible",
      year: 2024,
      organization: "Green Building Council España"
    },
    {
      id: 3,
      name: "Innovación en Diseño Residencial",
      year: 2024,
      organization: "Asociación de Arquitectos de Madrid"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-primary mb-6">
            Reconocimiento y Experiencia
          </h2>
          <p className="font-body text-xl text-text-secondary font-body-regular max-w-3xl mx-auto leading-relaxed">
            Nuestra trayectoria habla por sí misma con años de excelencia y reconocimiento en la industria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {trustIndicators.map((indicator, index) => (
            <div
              key={indicator.id}
              className="text-center p-6 bg-card rounded-lg transition-smooth hover:shadow-architectural hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={indicator.icon as any} size={32} className="text-accent" />
              </div>
              <div className="font-headline text-4xl font-headline-bold text-primary mb-2">
                {indicator.value}
              </div>
              <div className="font-body text-sm text-text-secondary font-body-regular uppercase tracking-wide">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card p-8 lg:p-12 rounded-lg">
          <div className="flex items-center justify-center mb-8">
            <Icon name="TrophyIcon" size={40} className="text-accent mr-3" />
            <h3 className="font-headline text-3xl font-headline-semibold text-primary">
              Premios Recientes
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recentAwards.map((award, index) => (
              <div
                key={award.id}
                className="bg-background p-6 rounded-lg border-l-4 border-accent transition-smooth hover:shadow-architectural"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent font-body text-sm font-body-semibold rounded-full">
                    {award.year}
                  </span>
                  <Icon name="StarIcon" size={20} className="text-accent" variant="solid" />
                </div>
                <h4 className="font-headline text-lg font-headline-semibold text-primary mb-2">
                  {award.name}
                </h4>
                <p className="font-body text-sm text-text-secondary font-body-regular">
                  {award.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;