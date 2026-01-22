import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SustainabilityInitiative {
  icon: string;
  title: string;
  description: string;
  impact: string;
}

interface SustainabilityProject {
  name: string;
  description: string;
  image: string;
  alt: string;
  achievements: string[];
}

interface SustainabilityCommitmentProps {
  className?: string;
}

const SustainabilityCommitment = ({ className = '' }: SustainabilityCommitmentProps) => {
  const initiatives: SustainabilityInitiative[] = [
    {
      icon: "SunIcon",
      title: "Renewable Energy Integration",
      description: "We prioritize solar, wind, and geothermal energy systems in all our projects, reducing dependence on fossil fuels.",
      impact: "Average 60% reduction in energy costs"
    },
    {
      icon: "BeakerIcon",
      title: "Sustainable Materials",
      description: "Carefully selected eco-friendly materials including reclaimed wood, recycled steel, and low-VOC finishes.",
      impact: "85% locally-sourced materials"
    },
    {
      icon: "CloudIcon",
      title: "Water Conservation",
      description: "Rainwater harvesting, greywater recycling, and efficient irrigation systems minimize water consumption.",
      impact: "Up to 50% water usage reduction"
    },
    {
      icon: "HomeModernIcon",
      title: "Passive Design Strategies",
      description: "Optimal building orientation, natural ventilation, and thermal mass reduce mechanical heating and cooling needs.",
      impact: "30-40% HVAC energy savings"
    }
  ];

  const showcaseProject: SustainabilityProject = {
    name: "EcoVista Residence",
    description: "Our flagship sustainable residential project that achieved net-zero energy consumption through innovative design and technology integration.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    alt: "Modern sustainable house with large solar panels on roof, floor-to-ceiling windows, and natural wood exterior surrounded by green landscape",
    achievements: [
      "LEED Platinum Certification",
      "Net-Zero Energy Consumption",
      "100% Renewable Energy Powered",
      "50% Water Usage Reduction",
      "Carbon-Neutral Construction Process"
    ]
  };

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            Our Sustainability Commitment
          </h2>
          <p className="font-body text-lg text-lcdream-gray-light font-body-regular leading-relaxed mb-12">
            Environmental responsibility isn't an afterthought—it's woven into the fabric of every project we undertake. We're committed to creating buildings that respect and enhance our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-lcdream-dark-bg rounded-lg p-8 shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth">
              <div className="w-16 h-16 bg-lcdream-gold/10 rounded-lg flex items-center justify-center mb-6 border border-lcdream-gold/30">
                <Icon name={initiative.icon as any} size={32} className="text-lcdream-gold" />
              </div>
              <h3 className="font-headline text-xl font-headline-semibold text-lcdream-gold mb-3">
                {initiative.title}
              </h3>
              <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-4">
                {initiative.description}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="ChartBarIcon" size={16} className="text-lcdream-gold" />
                <span className="font-body text-sm font-body-semibold text-lcdream-gold">
                  {initiative.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-lcdream-dark-bg rounded-lg overflow-hidden shadow-elevated">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
              <AppImage
                src={showcaseProject.image}
                alt={showcaseProject.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-lcdream-gold/10 text-lcdream-gold font-body text-xs font-body-semibold rounded-full mb-4">
                  FEATURED PROJECT
                </span>
                <h3 className="font-headline text-3xl font-headline-bold text-lcdream-white mb-4">
                  {showcaseProject.name}
                </h3>
                <p className="font-body text-base font-body-regular text-lcdream-gray-light leading-relaxed">
                  {showcaseProject.description}
                </p>
              </div>
              <div>
                <h4 className="font-headline text-lg font-headline-semibold text-lcdream-gold mb-4">
                  Key Achievements
                </h4>
                <div className="space-y-3">
                  {showcaseProject.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircleIcon" size={20} className="text-lcdream-gold flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm font-body-regular text-lcdream-gray-light">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-lcdream-accent/5 rounded-lg p-8 lg:p-12 text-center">
          <Icon name="GlobeAltIcon" size={48} className="text-lcdream-accent mx-auto mb-6" />
          <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-4">
            Building a Sustainable Future Together
          </h3>
          <p className="font-body text-base font-body-regular text-lcdream-gray-light max-w-2xl mx-auto leading-relaxed mb-6">
            Every project is an opportunity to make a positive environmental impact. We work closely with clients to integrate sustainable practices that align with their values and budget, proving that responsible architecture doesn't require compromise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-background rounded-lg">
              <div className="font-headline text-3xl font-headline-bold text-lcdream-accent mb-1">100%</div>
              <div className="font-body text-xs font-body-regular text-text-secondary">Projects with Sustainable Features</div>
            </div>
            <div className="px-6 py-3 bg-background rounded-lg">
              <div className="font-headline text-3xl font-headline-bold text-lcdream-accent mb-1">15+</div>
              <div className="font-body text-xs font-body-regular text-text-secondary">LEED Certified Projects</div>
            </div>
            <div className="px-6 py-3 bg-background rounded-lg">
              <div className="font-headline text-3xl font-headline-bold text-lcdream-accent mb-1">40%</div>
              <div className="font-body text-xs font-body-regular text-text-secondary">Average Energy Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitment;