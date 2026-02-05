import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PhilosophyPrinciple {
  icon: string;
  title: string;
  description: string;
}

interface DesignPhilosophyProps {
  className?: string;
}

const DesignPhilosophy = ({ className = '' }: DesignPhilosophyProps) => {
  const principles: PhilosophyPrinciple[] = [
    {
      icon: "LightBulbIcon",
      title: "Human-Centered Design",
      description: "Every space we create is designed with the end user in mind, prioritizing comfort, functionality, and emotional well-being to enhance daily life experiences."
    },
    {
      icon: "SparklesIcon",
      title: "Timeless Aesthetics",
      description: "We blend contemporary design principles with classic elements to create spaces that remain beautiful and relevant for decades, transcending fleeting trends."
    },
    {
      icon: "GlobeAltIcon",
      title: "Sustainable Innovation",
      description: "Environmental responsibility is woven into every decision, from material selection to energy systems, ensuring our projects contribute positively to the planet."
    },
    {
      icon: "CubeTransparentIcon",
      title: "Contextual Integration",
      description: "Our designs respond thoughtfully to their surroundings, respecting local culture, climate, and landscape while creating distinctive architectural statements."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block">
            Our Design Philosophy
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            At the heart of LCDREAM.ARQ lies a commitment to creating spaces that are not just visually stunning, but deeply meaningful and functionally superior. Our philosophy is built on four core principles that guide every project.
          </h2>
          <p className="font-body text-lg text-lcdream-gray-light font-body-regular leading-relaxed mb-8">
            At the heart of LCDREAM.ARQ lies a commitment to creating spaces that are not just visually stunning, but deeply meaningful and functionally superior. Our philosophy is built on four core principles that guide every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <div key={index} className="bg-black rounded-lg p-8 shadow-subtle border border-lcdream-gold/20 hover:border-lcdream-gold/40 transition-smooth">
              <div className="w-16 h-16 bg-lcdream-gold/10 rounded-full flex items-center justify-center mb-6 border border-lcdream-gold/30">
                <Icon name={principle.icon as any} size={32} className="text-lcdream-gold" />
              </div>
              <h3 className="font-headline text-xl font-headline-semibold text-lcdream-gold mb-3">
                {principle.title}
              </h3>
              <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophy;