import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProjectStat {
  icon: string;
  label: string;
  value: string;
}

interface ProjectOverviewProps {
  challenge: string;
  solution: string;
  outcome: string;
  stats: ProjectStat[];
}

const ProjectOverview = ({ challenge, solution, outcome, stats }: ProjectOverviewProps) => {
  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div>
            <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-12 leading-tight">
              El Desafío
            </h2>
            <p className="font-body text-base lg:text-lg text-text-secondary leading-relaxed">
              {challenge}
            </p>
          </div>
          
          <div>
            <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-12 leading-tight">
              Nuestra Solución
            </h2>
            <p className="font-body text-base lg:text-lg text-text-secondary leading-relaxed">
              {solution}
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 shadow-subtle border border-lcdream-gold/20 mb-16">
          <h3 className="font-headline text-xl font-headline-semibold text-lcdream-gold mb-2">
            Resultados del Proyecto
          </h3>
          <p className="font-body text-3xl font-body-bold text-lcdream-white mb-8">
            {outcome}
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-lcdream-gold/10 rounded-full flex items-center justify-center mb-6 border border-lcdream-gold/30">
                  <Icon name={stat.icon as any} size={32} className="text-lcdream-gold" />
                </div>
                <div className="font-headline text-2xl font-headline-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;