import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface SustainabilityFeature {
  icon: string;
  title: string;
  description: string;
  impact: string;
}

interface SustainabilityFeaturesProps {
  features: SustainabilityFeature[];
  certifications: string[];
}

const SustainabilityFeatures = ({ features, certifications }: SustainabilityFeaturesProps) => {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-headline-bold mb-4 text-white">
            Compromiso con la Sostenibilidad
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Diseño responsable que minimiza el impacto ambiental mientras maximiza la eficiencia y el confort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) =>
          <div key={index} className="bg-card rounded-lg p-8 shadow-architectural">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon as any} size={28} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-headline-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Icon name="ChartBarIcon" size={16} className="text-accent" />
                    <span className="font-body text-sm font-body-semibold text-accent">
                      {feature.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {certifications.length > 0 &&
        <div className="bg-card rounded-lg p-8 text-center">
            <h3 className="font-headline text-xl font-headline-bold mb-6 text-neutral-50">
              Certificaciones y Reconocimientos
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) =>
            <div
              key={index}
              className="px-6 py-3 bg-accent/10 text-accent font-body text-sm font-body-semibold rounded-full">

                  {cert}
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </section>);

};

export default SustainabilityFeatures;