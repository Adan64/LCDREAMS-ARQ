'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import ProjectListItem from './ProjectListItem';
import FilterBar from './FilterBar';
import LoadingSkeleton from './LoadingSkeleton';
import Icon from '@/components/ui/AppIcon';

interface Project {
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
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

const PortfolioGalleryInteractive = ({ initialProjects }: { initialProjects: Project[] }) => {
  const t = useTranslations('PortfolioGallery');
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const savedFavorites = localStorage.getItem('portfolioFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const projects = initialProjects; // Use passed props


  const categories: FilterOption[] = [
    { id: 'all', label: t('filters.all'), count: projects.length },
    { id: t('filters.residential'), label: t('filters.residential'), count: projects.filter(p => p.category === t('filters.residential')).length },
    { id: t('filters.commercial'), label: t('filters.commercial'), count: projects.filter(p => p.category === t('filters.commercial')).length },
    { id: t('filters.urbanPlanning'), label: t('filters.urbanPlanning'), count: projects.filter(p => p.category === t('filters.urbanPlanning')).length },
    { id: t('filters.interiorDesign'), label: t('filters.interiorDesign'), count: projects.filter(p => p.category === t('filters.interiorDesign')).length },
  ];

  const handleFavorite = (projectId: string) => {
    if (!isHydrated) return;

    const newFavorites = favorites.includes(projectId)
      ? favorites.filter(id => id !== projectId)
      : [...favorites, projectId];

    setFavorites(newFavorites);
    localStorage.setItem('portfolioFavorites', JSON.stringify(newFavorites));
  };

  const getFilteredProjects = () => {
    let filtered = selectedCategory === 'all'
      ? projects
      : projects.filter(p => p.category === selectedCategory);

    switch (sortBy) {
      case 'recent':
        filtered = [...filtered].sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        filtered = [...filtered].sort((a, b) => a.year - b.year);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'area':
        filtered = [...filtered].sort((a, b) => {
          const areaA = parseInt(a.area);
          const areaB = parseInt(b.area);
          return areaB - areaA;
        });
        break;
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const visibleProjects = filteredProjects.slice(0, displayedProjects);
  const hasMore = displayedProjects < filteredProjects.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProjects(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  if (!isHydrated) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="py-20 lg:py-32 bg-black">
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <Icon name="FolderOpenIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-headline text-2xl font-headline-bold text-primary mb-2">
            {t('common.noResults')}
          </h3>
          <p className="font-body text-base font-body-regular text-text-secondary">
            {t('common.noResultsDesc')}
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onFavorite={handleFavorite}
                  isFavorited={favorites.includes(project.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {visibleProjects.map((project) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  onFavorite={handleFavorite}
                  isFavorited={favorites.includes(project.id)}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-8 py-4 font-cta text-base font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    <span>{t('common.loading')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('common.loadMore')}</span>
                    <Icon name="ChevronDownIcon" size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PortfolioGalleryInteractive;