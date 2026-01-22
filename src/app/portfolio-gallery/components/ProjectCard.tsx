'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    year: number;
    image: string;
    alt: string;
    area: string;
    featured?: boolean;
  };
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const ProjectCard = ({ project, onFavorite, isFavorited = false }: ProjectCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(project.id);
    }
  };

  return (
    <Link
      href={`/project-case-studies?project=${project.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-architectural hover:shadow-elevated transition-smooth"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <AppImage
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground font-cta text-xs font-cta-semibold rounded-md">
            Featured
          </div>
        )}
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-card hover:scale-110"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon
            name="HeartIcon"
            variant={isFavorited ? 'solid' : 'outline'}
            size={20}
            className={isFavorited ? 'text-error' : 'text-text-primary'}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
          <div className="flex items-center space-x-4 text-primary-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPinIcon" size={16} />
              <span className="font-body text-sm font-body-regular">{project.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Square3Stack3DIcon" size={16} />
              <span className="font-body text-sm font-body-regular">{project.area}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-headline text-xl font-headline-bold text-primary group-hover:text-accent transition-smooth">
            {project.title}
          </h3>
          <span className="font-body text-sm font-body-regular text-secondary whitespace-nowrap ml-4">
            {project.year}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent font-body text-xs font-body-semibold rounded-md">
            {project.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;