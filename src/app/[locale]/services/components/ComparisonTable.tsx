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
            <th className="px-6 py-4 text-left text-neutral-50">
              <span className="text-sm font-body-semibold uppercase tracking-wide text-neutral-50">
                Características
              </span>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="space-y-1">
                <span className="text-lg font-headline-bold block text-[rgba(252,252,252,1)]">Básico</span>
                <span className="text-xs font-body-regular block text-orange-100">Proyectos pequeños</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center bg-accent/5">
              <div className="space-y-1">
                <span className="font-headline text-lg font-headline-bold text-accent block">Estándar</span>
                <span className="text-xs font-body-regular block text-orange-100">Más popular</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="space-y-1">
                <span className="text-lg font-headline-bold block text-neutral-50">Premium</span>
                <span className="text-xs font-body-regular block text-orange-100">Proyectos complejos</span>
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