import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  name: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
}

const ComparisonTable = ({ features }: ComparisonTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-card rounded-lg shadow-architectural">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left">
              <span className="font-body text-sm font-body-semibold text-secondary uppercase tracking-wide">
                Características
              </span>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="space-y-1">
                <span className="font-headline text-lg font-headline-bold text-primary block">Básico</span>
                <span className="font-body text-xs font-body-regular text-secondary block">Proyectos pequeños</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center bg-accent/5">
              <div className="space-y-1">
                <span className="font-headline text-lg font-headline-bold text-accent block">Estándar</span>
                <span className="font-body text-xs font-body-regular text-secondary block">Más popular</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="space-y-1">
                <span className="font-headline text-lg font-headline-bold text-primary block">Premium</span>
                <span className="font-body text-xs font-body-regular text-secondary block">Proyectos complejos</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth">
              <td className="px-6 py-4">
                <span className="font-body text-sm font-body-regular text-text-primary">{feature.name}</span>
              </td>
              <td className="px-6 py-4 text-center">
                {feature.basic ? (
                  <Icon name="CheckIcon" size={20} className="text-accent mx-auto" />
                ) : (
                  <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
                )}
              </td>
              <td className="px-6 py-4 text-center bg-accent/5">
                {feature.standard ? (
                  <Icon name="CheckIcon" size={20} className="text-accent mx-auto" />
                ) : (
                  <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {feature.premium ? (
                  <Icon name="CheckIcon" size={20} className="text-accent mx-auto" />
                ) : (
                  <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;