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

const PortfolioGalleryInteractive = () => {
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

  const mockProjects: Project[] = [
    {
      id: 'villa-moderna-barcelona',
      title: t('projects.villa-moderna-barcelona.title'),
      category: t('filters.residential'),
      location: 'Barcelona, España',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      alt: t('projects.villa-moderna-barcelona.alt'),
      area: '450 m²',
      description: t('projects.villa-moderna-barcelona.description'),
      featured: true,
    },
    {
      id: 'oficinas-tech-madrid',
      title: t('projects.oficinas-tech-madrid.title'),
      category: t('filters.commercial'),
      location: 'Madrid, España',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      alt: t('projects.oficinas-tech-madrid.alt'),
      area: '1200 m²',
      description: t('projects.oficinas-tech-madrid.description'),
    },
    {
      id: 'loft-industrial-valencia',
      title: t('projects.loft-industrial-valencia.title'),
      category: t('filters.interiorDesign'),
      location: 'Valencia, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      alt: t('projects.loft-industrial-valencia.alt'),
      area: '180 m²',
      description: t('projects.loft-industrial-valencia.description'),
      featured: true,
    },
    {
      id: 'plaza-urbana-sevilla',
      title: t('projects.plaza-urbana-sevilla.title'),
      category: t('filters.urbanPlanning'),
      location: 'Sevilla, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
      alt: t('projects.plaza-urbana-sevilla.alt'),
      area: '3500 m²',
      description: t('projects.plaza-urbana-sevilla.description'),
    },
    {
      id: 'casa-mediterranea-mallorca',
      title: t('projects.casa-mediterranea-mallorca.title'),
      category: t('filters.residential'),
      location: 'Mallorca, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      alt: t('projects.casa-mediterranea-mallorca.alt'),
      area: '320 m²',
      description: t('projects.casa-mediterranea-mallorca.description'),
    },
    {
      id: 'restaurante-gastronomico-bilbao',
      title: t('projects.restaurante-gastronomico-bilbao.title'),
      category: t('filters.commercial'),
      location: 'Bilbao, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      alt: t('projects.restaurante-gastronomico-bilbao.alt'),
      area: '280 m²',
      description: t('projects.restaurante-gastronomico-bilbao.description'),
    },
    {
      id: 'penthouse-lujo-marbella',
      title: t('projects.penthouse-lujo-marbella.title'),
      category: t('filters.interiorDesign'),
      location: 'Marbella, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      alt: t('projects.penthouse-lujo-marbella.alt'),
      area: '380 m²',
      description: t('projects.penthouse-lujo-marbella.description'),
      featured: true,
    },
    {
      id: 'parque-sostenible-granada',
      title: t('projects.parque-sostenible-granada.title'),
      category: t('filters.urbanPlanning'),
      location: 'Granada, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      alt: t('projects.parque-sostenible-granada.alt'),
      area: '5000 m²',
      description: t('projects.parque-sostenible-granada.description'),
    },
    {
      id: 'boutique-hotel-toledo',
      title: t('projects.boutique-hotel-toledo.title'),
      category: t('filters.commercial'),
      location: 'Toledo, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      alt: t('projects.boutique-hotel-toledo.alt'),
      area: '850 m²',
      description: t('projects.boutique-hotel-toledo.description'),
    },
    {
      id: 'casa-campo-asturias',
      title: t('projects.casa-campo-asturias.title'),
      category: t('filters.residential'),
      location: 'Asturias, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      alt: t('projects.casa-campo-asturias.alt'),
      area: '290 m²',
      description: t('projects.casa-campo-asturias.description'),
    },
    {
      id: 'showroom-moda-barcelona',
      title: t('projects.showroom-moda-barcelona.title'),
      category: t('filters.interiorDesign'),
      location: 'Barcelona, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      alt: t('projects.showroom-moda-barcelona.alt'),
      area: '220 m²',
      description: t('projects.showroom-moda-barcelona.description'),
    },
    {
      id: 'centro-cultural-zaragoza',
      title: t('projects.centro-cultural-zaragoza.title'),
      category: t('filters.urbanPlanning'),
      location: 'Zaragoza, España',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      alt: t('projects.centro-cultural-zaragoza.alt'),
      area: '2800 m²',
      description: t('projects.centro-cultural-zaragoza.description'),
    },
  ];

  const categories: FilterOption[] = [
    { id: 'all', label: t('filters.all'), count: mockProjects.length },
    { id: t('filters.residential'), label: t('filters.residential'), count: mockProjects.filter(p => p.category === t('filters.residential')).length },
    { id: t('filters.commercial'), label: t('filters.commercial'), count: mockProjects.filter(p => p.category === t('filters.commercial')).length },
    { id: t('filters.urbanPlanning'), label: t('filters.urbanPlanning'), count: mockProjects.filter(p => p.category === t('filters.urbanPlanning')).length },
    { id: t('filters.interiorDesign'), label: t('filters.interiorDesign'), count: mockProjects.filter(p => p.category === t('filters.interiorDesign')).length },
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
      ? mockProjects
      : mockProjects.filter(p => p.category === selectedCategory);

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