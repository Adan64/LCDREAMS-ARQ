import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

const StatsBar = ({ stats }: StatsBarProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-12 mb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Icon name={stat.icon as any} size={32} className="text-accent" />
                </div>
              </div>
              <div className="font-headline text-4xl font-headline-bold mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm font-body-regular opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;