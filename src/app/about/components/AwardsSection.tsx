'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Award {
  id: number;
  year: number;
  title: string;
  organization: string;
  category: string;
  project: string;
  description: string;
}

interface AwardsSectionProps {
  className?: string;
}

const AwardsSection = ({ className = '' }: AwardsSectionProps) => {
  const [expandedAward, setExpandedAward] = useState<number | null>(null);

  const awards: Award[] = [
    {
      id: 1,
      year: 2025,
      title: "Excellence in Sustainable Design Award",
      organization: "International Architecture Foundation",
      category: "Residential Architecture",
      project: "EcoVista Residence",
      description: "Recognized for innovative integration of passive solar design, rainwater harvesting systems, and locally-sourced materials in a luxury residential project that achieved net-zero energy consumption."
    },
    {
      id: 2,
      year: 2024,
      title: "Best Commercial Space Design",
      organization: "European Design Council",
      category: "Commercial Architecture",
      project: "TechHub Innovation Center",
      description: "Awarded for creating a dynamic workspace that fosters collaboration and creativity while maintaining exceptional energy efficiency and employee well-being standards."
    },
    {
      id: 3,
      year: 2024,
      title: "Urban Regeneration Excellence",
      organization: "City Planning Institute",
      category: "Urban Design",
      project: "Riverside District Revitalization",
      description: "Honored for transforming an underutilized industrial area into a vibrant mixed-use community that respects historical context while introducing contemporary design elements."
    },
    {
      id: 4,
      year: 2023,
      title: "LEED Platinum Certification",
      organization: "U.S. Green Building Council",
      category: "Sustainable Building",
      project: "GreenTower Office Complex",
      description: "Achieved the highest level of LEED certification for a 12-story office building featuring advanced green building technologies and sustainable construction practices."
    },
    {
      id: 5,
      year: 2023,
      title: "Architectural Innovation Award",
      organization: "National Architecture Association",
      category: "Residential Design",
      project: "Skyline Penthouse",
      description: "Recognized for pushing boundaries in luxury residential design with innovative use of glass, steel, and natural materials to create seamless indoor-outdoor living spaces."
    },
    {
      id: 6,
      year: 2022,
      title: "Heritage Preservation Excellence",
      organization: "Historic Buildings Foundation",
      category: "Restoration & Adaptive Reuse",
      project: "Old Mill Cultural Center",
      description: "Awarded for sensitive restoration and adaptive reuse of a 19th-century mill building, preserving historical character while introducing modern functionality."
    }
  ];

  const certifications = [
    { name: "LEED Accredited Professional (LEED AP)", issuer: "U.S. Green Building Council" },
    { name: "American Institute of Architects (AIA) Member", issuer: "AIA" },
    { name: "National Council of Architectural Registration Boards (NCARB)", issuer: "NCARB" },
    { name: "Certified Passive House Designer", issuer: "Passive House Institute" },
    { name: "WELL Accredited Professional (WELL AP)", issuer: "International WELL Building Institute" }
  ];

  const toggleAward = (id: number) => {
    setExpandedAward(expandedAward === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-16 leading-tight text-center">
            Awards & Recognition
          </h2>
          <p className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized by leading industry organizations and institutions worldwide.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-8 text-center">
            Recent Awards
          </h3>
          <div className="space-y-4">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="bg-black rounded-lg p-8 text-center shadow-subtle border border-lcdream-gold/20 hover:border-lcdream-gold/40 transition-smooth group"
              >
                <button
                  onClick={() => toggleAward(award.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-smooth hover:bg-muted"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-headline text-lg font-headline-bold text-accent">
                        {award.year}
                      </span>
                      <span className="font-body text-xs font-body-regular text-text-secondary px-3 py-1 bg-accent/10 rounded-full">
                        {award.category}
                      </span>
                    </div>
                    <h4 className="font-headline text-xl font-headline-semibold text-primary mb-1">
                      {award.title}
                    </h4>
                    <p className="font-body text-sm font-body-regular text-text-secondary">
                      {award.organization} • {award.project}
                    </p>
                  </div>
                  <Icon 
                    name="ChevronDownIcon" 
                    size={24} 
                    className={`text-accent transition-smooth flex-shrink-0 ml-4 ${expandedAward === award.id ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {expandedAward === award.id && (
                  <div className="px-6 pb-5 border-t border-border">
                    <p className="font-body text-sm font-body-regular text-text-primary leading-relaxed pt-4">
                      {award.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-8 text-center">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg p-6 shadow-architectural flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckBadgeIcon" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body text-base font-body-semibold text-primary mb-1">
                    {cert.name}
                  </h4>
                  <p className="font-body text-sm font-body-regular text-text-secondary">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;