'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialization: string;
  image: string;
  alt: string;
  bio: string;
  expertise: string[];
}

interface TeamSectionProps {
  className?: string;
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      role: "Senior Architect",
      specialization: "Commercial & Mixed-Use Design",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      alt: "Professional headshot of Carlos Rodríguez, Hispanic man with short dark hair and beard wearing navy blue suit in modern office",
      bio: "Carlos brings 12 years of experience in large-scale commercial projects, with a particular focus on creating dynamic mixed-use spaces that foster community interaction. His innovative approach to urban design has transformed numerous city centers.",
      expertise: ["Urban Planning", "Commercial Architecture", "Mixed-Use Development", "Community Spaces"]
    },
    {
      id: 2,
      name: "Isabel Torres",
      role: "Lead Interior Designer",
      specialization: "Residential & Hospitality Interiors",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
      alt: "Professional portrait of Isabel Torres, Hispanic woman with long dark hair wearing elegant white blouse in contemporary design studio",
      bio: "Isabel's talent for creating warm, inviting interiors that reflect her clients' personalities has made her one of the most sought-after designers in the region. She specializes in luxury residential and boutique hospitality projects.",
      expertise: ["Interior Design", "Space Planning", "Material Selection", "Custom Furniture Design"]
    },
    {
      id: 3,
      name: "Miguel Ángel Santos",
      role: "Sustainability Consultant",
      specialization: "Green Building & LEED Certification",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      alt: "Professional headshot of Miguel Ángel Santos, Hispanic man with glasses and short dark hair wearing gray suit in eco-friendly office",
      bio: "Miguel is our sustainability expert, ensuring every project meets the highest environmental standards. With LEED AP credentials and a passion for green building, he guides our commitment to responsible architecture.",
      expertise: ["LEED Certification", "Sustainable Materials", "Energy Efficiency", "Green Building Systems"]
    },
    {
      id: 4,
      name: "Ana María Delgado",
      role: "Project Manager",
      specialization: "Construction Administration & Client Relations",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg",
      alt: "Professional portrait of Ana María Delgado, Hispanic woman with shoulder-length dark hair wearing professional black blazer in construction site office",
      bio: "Ana María ensures seamless project execution from concept to completion. Her exceptional organizational skills and client-focused approach have resulted in consistently on-time, on-budget project deliveries.",
      expertise: ["Project Management", "Construction Oversight", "Client Communication", "Budget Management"]
    }
  ];

  const handleMemberClick = (id: number) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-16 leading-tight text-center">
            Meet Our Team
          </h2>
          <p className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our diverse team of talented professionals brings together decades of combined experience, united by a shared passion for creating exceptional architectural solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div 
                className="bg-lcdream-dark-bg rounded-lg overflow-hidden shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth group"
                onClick={() => handleMemberClick(member.id)}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <AppImage
                    src={member.image}
                    alt={member.alt}
                    fill
                    className="object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-2 group-hover:text-lcdream-gold transition-smooth">
                      {member.name}
                    </h3>
                    <p className="font-body text-sm font-body-semibold text-accent mb-1">
                      {member.role}
                    </p>
                    <p className="font-body text-xs font-body-regular text-text-secondary mb-4">
                      {member.specialization}
                    </p>
                    <button className="flex items-center space-x-2 text-accent font-body text-sm font-body-semibold transition-smooth hover:text-accent/80">
                      <span>{selectedMember === member.id ? 'Show Less' : 'Learn More'}</span>
                      <Icon 
                        name="ChevronDownIcon" 
                        size={16} 
                        className={`transition-smooth ${selectedMember === member.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {selectedMember === member.id && (
                <div className="mt-4 bg-card rounded-lg p-6 shadow-architectural">
                  <p className="font-body text-sm font-body-regular text-text-primary leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div>
                    <h4 className="font-headline text-sm font-headline-semibold text-primary mb-3">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent font-body text-xs font-body-regular rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;