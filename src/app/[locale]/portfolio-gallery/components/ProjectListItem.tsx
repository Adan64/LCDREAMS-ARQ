'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProjectListItemProps {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    year: number;
    image: string;
    alt: string;
    area: string;
    description: string;
    featured?: boolean;
  };
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const ProjectListItem = ({ project, onFavorite, isFavorited = false }: ProjectListItemProps) => {
  const t = useTranslations('PortfolioGallery.common');

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
      className="group flex flex-col md:flex-row bg-card rounded-lg overflow-hidden shadow-architectural hover:shadow-elevated transition-smooth"
    >
      <div className="relative w-full md:w-80 aspect-[4/3] md:aspect-auto overflow-hidden bg-muted flex-shrink-0">
        <AppImage
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground font-cta text-xs font-cta-semibold rounded-md">
            {t('featured')}
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-headline text-2xl font-headline-bold text-primary group-hover:text-accent transition-smooth mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-secondary mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPinIcon" size={16} />
                  <span className="font-body text-sm font-body-regular">{project.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CalendarIcon" size={16} />
                  <span className="font-body text-sm font-body-regular">{project.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Square3Stack3DIcon" size={16} />
                  <span className="font-body text-sm font-body-regular">{project.area}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              className="p-2 hover:bg-muted rounded-full transition-smooth ml-4"
              aria-label={isFavorited ? t('removeFromFavorites') : t('addToFavorites')}
            >
              <Icon
                name="HeartIcon"
                variant={isFavorited ? 'solid' : 'outline'}
                size={24}
                className={isFavorited ? 'text-error' : 'text-text-primary'}
              />
            </button>
          </div>

          <p className="font-body text-base font-body-regular text-text-secondary mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent font-body text-xs font-body-semibold rounded-md">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end mt-4 pt-4 border-t border-border">
          <span className="flex items-center space-x-2 text-accent font-body text-sm font-body-semibold group-hover:translate-x-2 transition-smooth">
            <span>{t('viewProject')}</span>
            <Icon name="ArrowRightIcon" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;