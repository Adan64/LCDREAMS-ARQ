'use client';

import React, { useState, useEffect } from 'react';
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
      title: 'Villa Moderna Barcelona',
      category: 'Residencial',
      location: 'Barcelona, España',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      alt: 'Exterior de villa moderna de dos pisos con fachada blanca, grandes ventanales de vidrio y piscina infinita al atardecer',
      area: '450 m²',
      description: 'Diseño contemporáneo que fusiona elegancia minimalista con funcionalidad espacial, creando un hogar luminoso y acogedor.',
      featured: true,
    },
    {
      id: 'oficinas-tech-madrid',
      title: 'Oficinas Tech Hub Madrid',
      category: 'Comercial',
      location: 'Madrid, España',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      alt: 'Espacio de oficina moderno con escritorios blancos, sillas ergonómicas azules y grandes ventanales con vista urbana',
      area: '1200 m²',
      description: 'Espacio de trabajo innovador diseñado para fomentar la colaboración y creatividad con zonas flexibles y tecnología integrada.',
    },
    {
      id: 'loft-industrial-valencia',
      title: 'Loft Industrial Valencia',
      category: 'Diseño Interior',
      location: 'Valencia, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      alt: 'Interior de loft con techos altos, vigas de madera expuestas, paredes de ladrillo y mobiliario contemporáneo en tonos neutros',
      area: '180 m²',
      description: 'Transformación de espacio industrial en vivienda moderna conservando elementos originales y añadiendo confort contemporáneo.',
      featured: true,
    },
    {
      id: 'plaza-urbana-sevilla',
      title: 'Plaza Urbana Sevilla',
      category: 'Urbanismo',
      location: 'Sevilla, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
      alt: 'Plaza pública moderna con árboles, bancos de madera, fuentes de agua y pavimento de piedra natural al atardecer',
      area: '3500 m²',
      description: 'Renovación de espacio público integrando áreas verdes, zonas de descanso y elementos sostenibles para la comunidad.',
    },
    {
      id: 'casa-mediterranea-mallorca',
      title: 'Casa Mediterránea Mallorca',
      category: 'Residencial',
      location: 'Mallorca, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      alt: 'Casa mediterránea de piedra con terraza amplia, pérgola de madera, jardín con olivos y vistas al mar',
      area: '320 m²',
      description: 'Arquitectura tradicional mediterránea reinterpretada con materiales locales y diseño bioclimático sostenible.',
    },
    {
      id: 'restaurante-gastronomico-bilbao',
      title: 'Restaurante Gastronómico Bilbao',
      category: 'Comercial',
      location: 'Bilbao, España',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      alt: 'Interior de restaurante elegante con mesas de madera, sillas tapizadas, iluminación cálida y cocina abierta al fondo',
      area: '280 m²',
      description: 'Espacio gastronómico que combina diseño sofisticado con ambiente acogedor, destacando cocina abierta y materiales nobles.',
    },
    {
      id: 'penthouse-lujo-marbella',
      title: 'Penthouse de Lujo Marbella',
      category: 'Diseño Interior',
      location: 'Marbella, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      alt: 'Salón de penthouse con sofás blancos, mesa de centro de mármol, ventanales del suelo al techo y terraza con vistas al mar',
      area: '380 m²',
      description: 'Diseño interior exclusivo que maximiza vistas panorámicas con materiales premium y acabados de alta gama.',
      featured: true,
    },
    {
      id: 'parque-sostenible-granada',
      title: 'Parque Sostenible Granada',
      category: 'Urbanismo',
      location: 'Granada, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      alt: 'Parque urbano con senderos peatonales, áreas verdes, árboles frondosos, bancos y zonas de juego infantil',
      area: '5000 m²',
      description: 'Proyecto de paisajismo urbano con enfoque en biodiversidad, gestión sostenible del agua y espacios comunitarios.',
    },
    {
      id: 'boutique-hotel-toledo',
      title: 'Boutique Hotel Toledo',
      category: 'Comercial',
      location: 'Toledo, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      alt: 'Lobby de hotel boutique con recepción de mármol, sillones de terciopelo, lámpara de araña y decoración elegante',
      area: '850 m²',
      description: 'Rehabilitación de edificio histórico en hotel boutique preservando elementos originales con confort contemporáneo.',
    },
    {
      id: 'casa-campo-asturias',
      title: 'Casa de Campo Asturias',
      category: 'Residencial',
      location: 'Asturias, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      alt: 'Casa rural de piedra y madera con jardín amplio, porche cubierto y montañas verdes al fondo',
      area: '290 m²',
      description: 'Vivienda rural que integra arquitectura tradicional asturiana con eficiencia energética y confort moderno.',
    },
    {
      id: 'showroom-moda-barcelona',
      title: 'Showroom de Moda Barcelona',
      category: 'Diseño Interior',
      location: 'Barcelona, España',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      alt: 'Showroom minimalista con percheros metálicos, maniquíes blancos, iluminación LED y espejos de cuerpo entero',
      area: '220 m²',
      description: 'Espacio comercial minimalista que realza productos mediante iluminación estratégica y diseño limpio.',
    },
    {
      id: 'centro-cultural-zaragoza',
      title: 'Centro Cultural Zaragoza',
      category: 'Urbanismo',
      location: 'Zaragoza, España',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      alt: 'Edificio cultural moderno con fachada de vidrio y acero, plaza pública frontal y esculturas contemporáneas',
      area: '2800 m²',
      description: 'Equipamiento cultural que promueve actividades comunitarias con espacios versátiles y arquitectura icónica.',
    },
  ];

  const categories: FilterOption[] = [
    { id: 'all', label: 'Todos los Proyectos', count: mockProjects.length },
    { id: 'Residencial', label: 'Residencial', count: mockProjects.filter(p => p.category === 'Residencial').length },
    { id: 'Comercial', label: 'Comercial', count: mockProjects.filter(p => p.category === 'Comercial').length },
    { id: 'Urbanismo', label: 'Urbanismo', count: mockProjects.filter(p => p.category === 'Urbanismo').length },
    { id: 'Diseño Interior', label: 'Diseño Interior', count: mockProjects.filter(p => p.category === 'Diseño Interior').length },
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
            No se encontraron proyectos
          </h3>
          <p className="font-body text-base font-body-regular text-text-secondary">
            Intenta ajustar los filtros para ver más resultados
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
                    <span>Cargando...</span>
                  </>
                ) : (
                  <>
                    <span>Cargar más proyectos</span>
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