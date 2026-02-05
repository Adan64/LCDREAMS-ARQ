import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, duration, icon, isLast = false }: ProcessStepProps) => {
  return (
    <div className="relative">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0 relative">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-architectural">
            <Icon name={icon as any} size={32} className="text-accent-foreground" />
          </div>
          {!isLast && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-border"></div>
          )}
        </div>

        <div className="flex-1 pt-2">
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-headline text-4xl font-headline-bold text-accent/20">{number}</span>
            <h3 className="font-headline text-2xl font-headline-bold text-primary">{title}</h3>
          </div>
          <p className="font-body text-base font-body-regular text-secondary mb-4">{description}</p>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-md">
            <Icon name="ClockIcon" size={16} className="text-accent" />
            <span className="font-body text-sm font-body-regular text-text-primary">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;