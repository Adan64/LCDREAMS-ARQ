'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Services.calculator');
  const [selectedType, setSelectedType] = useState<string>(projectTypes[0]?.id || '');
  const [size, setSize] = useState<number>(150);
  const [complexity, setComplexity] = useState<string>('medium');
  const [estimatedWeeks, setEstimatedWeeks] = useState<number>(0);

  useEffect(() => {
    if (!selectedType) return;

    const type = projectTypes.find(t => t.id === selectedType);
    if (!type) return;

    let weeks = type.baseTimeline;

    // Size adjustment
    if (size > 500) weeks *= 1.5;
    else if (size > 250) weeks *= 1.25;
    else if (size < 100) weeks *= 0.8;

    // Complexity adjustment
    if (complexity === 'high') weeks *= 1.3;
    else if (complexity === 'low') weeks *= 0.8;

    setEstimatedWeeks(Math.round(weeks));
  }, [selectedType, size, complexity, projectTypes]);

  return (
    <div className="bg-card rounded-lg p-8 shadow-architectural border border-border/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon name="CalculatorIcon" size={24} className="text-accent" />
        </div>
        <h3 className="font-headline text-2xl font-headline-bold text-card-foreground">
          {t('title')}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-2">
            {t('labels.projectType')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${selectedType === type.id
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background text-muted-foreground border-border hover:border-accent/50'
                  }`}
              >
                <Icon name={type.icon as any} size={18} />
                <span className="text-sm font-body font-body-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-2">
            {t('labels.size')}
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="text-right text-sm text-muted-foreground mt-1">
            {size} m²
          </div>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-2">
            {t('labels.complexity')}
          </label>
          <div className="flex space-x-3">
            {[
              { id: 'low', label: t('complexity.low') },
              { id: 'medium', label: t('complexity.medium') },
              { id: 'high', label: t('complexity.high') }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setComplexity(option.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-body font-body-medium transition-all ${complexity === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex justify-between items-end">
            <span className="text-sm font-body font-body-regular text-muted-foreground">
              {t('labels.estimatedDuration')}
            </span>
            <div className="text-right">
              <span className="block text-4xl font-headline font-headline-bold text-accent">
                {estimatedWeeks}
              </span>
              <span className="text-sm font-body font-body-medium text-card-foreground">
                {t('labels.weeks')}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs font-body font-body-regular text-muted-foreground/80 italic">
            * {t('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineCalculator;