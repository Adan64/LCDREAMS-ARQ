'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProjectType {
  id: string;
  name: string;
  baseTimeline: number;
  icon: string;
}

interface TimelineCalculatorProps {
  projectTypes: ProjectType[];
}

const TimelineCalculator = ({ projectTypes }: TimelineCalculatorProps) => {
  const [selectedType, setSelectedType] = useState<string>(projectTypes[0]?.id || '');
  const [projectSize, setProjectSize] = useState<number>(100);
  const [complexity, setComplexity] = useState<string>('medium');

  const calculateTimeline = () => {
    const baseType = projectTypes.find(pt => pt.id === selectedType);
    if (!baseType) return 0;

    let timeline = baseType.baseTimeline;
    
    const sizeMultiplier = projectSize / 100;
    timeline *= sizeMultiplier;

    const complexityMultipliers: { [key: string]: number } = {
      low: 0.8,
      medium: 1.0,
      high: 1.3
    };
    timeline *= complexityMultipliers[complexity] || 1.0;

    return Math.round(timeline);
  };

  const estimatedWeeks = calculateTimeline();

  return (
    <div className="bg-card rounded-lg p-8 shadow-architectural">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CalculatorIcon" size={32} className="text-accent" />
        <h3 className="font-headline text-2xl font-headline-bold text-primary">
          Calculadora de Plazos
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-body text-sm font-body-semibold text-primary mb-3">
            Tipo de Proyecto
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-smooth ${
                  selectedType === type.id
                    ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                }`}
              >
                <Icon name={type.icon as any} size={24} className={selectedType === type.id ? 'text-accent' : 'text-secondary'} />
                <span className={`font-body text-sm font-body-regular ${
                  selectedType === type.id ? 'text-primary' : 'text-secondary'
                }`}>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-body text-sm font-body-semibold text-primary mb-3">
            Tamaño del Proyecto: {projectSize}m²
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={projectSize}
            onChange={(e) => setProjectSize(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between mt-2">
            <span className="font-body text-xs font-body-regular text-secondary">50m²</span>
            <span className="font-body text-xs font-body-regular text-secondary">500m²</span>
          </div>
        </div>

        <div>
          <label className="block font-body text-sm font-body-semibold text-primary mb-3">
            Complejidad
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low', label: 'Baja' },
              { value: 'medium', label: 'Media' },
              { value: 'high', label: 'Alta' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setComplexity(option.value)}
                className={`py-3 px-4 rounded-lg border-2 transition-smooth ${
                  complexity === option.value
                    ? 'border-accent bg-accent/10 text-primary' :'border-border text-secondary hover:border-accent/50'
                }`}
              >
                <span className="font-body text-sm font-body-regular">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="bg-accent/10 rounded-lg p-6 text-center">
            <span className="font-body text-sm font-body-regular text-secondary block mb-2">
              Duración Estimada
            </span>
            <span className="font-headline text-4xl font-headline-bold text-accent block mb-1">
              {estimatedWeeks}
            </span>
            <span className="font-body text-base font-body-regular text-primary">
              semanas aproximadamente
            </span>
          </div>
          <p className="font-body text-xs font-body-regular text-secondary text-center mt-4">
            * Esta es una estimación aproximada. El plazo real puede variar según las condiciones específicas del proyecto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineCalculator;