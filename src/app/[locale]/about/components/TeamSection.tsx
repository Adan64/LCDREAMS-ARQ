'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('About.team');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamData = [
    { id: 1, image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg" },
    { id: 2, image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg" },
    { id: 3, image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" },
    { id: 4, image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg" }
  ];

  const teamMembers: TeamMember[] = teamData.map(member => ({
    id: member.id,
    name: t(`members.${member.id}.name` as any), // Type assertion to avoid explicit literal types issue
    role: t(`members.${member.id}.role` as any),
    specialization: t(`members.${member.id}.specialization` as any),
    image: member.image,
    alt: t(`members.${member.id}.alt` as any),
    bio: t(`members.${member.id}.bio` as any),
    expertise: [0, 1, 2, 3].map(i => t(`members.${member.id}.expertise.${i}` as any))
  }));

  const handleMemberClick = (id: number) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-16 leading-tight text-center">
            {t('title')}
          </h2>
          <p className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('description')}
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
                      <span>{selectedMember === member.id ? t('actions.showLess') : t('actions.learnMore')}</span>
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
                      {t('expertiseTitle')}
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