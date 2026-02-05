import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  timeline: string;
  priceRange: string;
}

const ServiceCard = ({ icon, title, description, features, timeline, priceRange }: ServiceCardProps) => {
  return (
    <div className="bg-lcdream-dark-bg rounded-lg p-8 shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth group">
      <div className="w-16 h-16 bg-lcdream-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lcdream-gold/20 transition-smooth border border-lcdream-gold/30">
        <Icon name={icon as any} size={32} className="text-lcdream-gold" />
      </div>
      <div className="flex-1">
        <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-4 group-hover:text-lcdream-gold transition-smooth">
          {title}
        </h3>
        <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 border-t border-border">
          <span className="font-body text-sm font-body-regular text-secondary">Duración estimada</span>
          <span className="font-body text-sm font-body-semibold text-primary">{timeline}</span>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-border">
          <span className="font-body text-sm font-body-regular text-secondary">Rango de inversión</span>
          <span className="font-body text-sm font-body-semibold text-primary">{priceRange}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="font-body text-sm font-body-semibold text-primary uppercase tracking-wide">Incluye:</h4>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon name="CheckCircleIcon" size={20} className="text-lcdream-gold mr-2 flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-lcdream-gray-light font-body-regular">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;