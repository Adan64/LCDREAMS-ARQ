import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface FeaturedProject {
  id: number;
  title: string;
  category: string;
  location: string;
  year: number;
  image: string;
  alt: string;
  description: string;
}

const FeaturedProjectsSection = () => {
  const featuredProjects: FeaturedProject[] = [
    {
      id: 1,
      title: "Casa del Horizonte",
      category: "Residencial",
      location: "Valencia, España",
      year: 2025,
      image: "https://images.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
      alt: "Modern minimalist living room with white walls, large windows, wooden floors and contemporary furniture",
      description: "Residencia contemporánea que maximiza vistas panorámicas al mar"
    },
    {
      id: 2,
      title: "Estudio Creativo Urbano",
      category: "Comercial",
      location: "Sevilla, España",
      year: 2025,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      alt: "Modern open office space with wooden desks, plants, and natural lighting from large windows",
      description: "Espacio de trabajo flexible que fomenta innovación y colaboración"
    },
    {
      id: 3,
      title: "Loft Industrial Renovado",
      category: "Residencial",
      location: "Bilbao, España",
      year: 2024,
      image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Industrial loft interior with exposed brick walls, high ceilings, metal beams and modern furnishings",
      description: "Transformación de espacio industrial en vivienda moderna y acogedora"
    },
    {
      id: 4,
      title: "Centro Wellness Sostenible",
      category: "Comercial",
      location: "Granada, España",
      year: 2024,
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg",
      alt: "Modern spa interior with natural stone walls, wooden elements and soft ambient lighting",
      description: "Diseño biofílico que integra naturaleza y bienestar"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight">
              Proyectos Destacados
            </h2>
            <p className="font-body text-lg lg:text-xl text-lcdream-gray-light font-body-regular leading-relaxed max-w-3xl">
              Descubre nuestra selección de proyectos que demuestran excelencia en diseño y ejecución
            </p>
          </div>
          <Link
            href="/portfolio-gallery"
            className="inline-flex items-center justify-center px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-0.5"
          >
            Ver Todo el Portfolio
            <Icon name="ArrowRightIcon" size={20} className="ml-2 transition-smooth group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/project-case-studies"
              className="group relative block bg-card rounded-lg overflow-hidden shadow-subtle transition-smooth hover:shadow-gold hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <AppImage
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-lcdream-gold text-black font-body text-xs font-body-semibold rounded-full mb-3 shadow-gold">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-2 group-hover:text-lcdream-gold transition-smooth">
                    {project.title}
                  </h3>
                  <Icon
                    name="ArrowTopRightOnSquareIcon"
                    size={20}
                    className="text-text-secondary group-hover:text-accent transition-smooth"
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4 text-text-secondary font-body text-sm">
                  <span className="flex items-center">
                    <Icon name="MapPinIcon" size={16} className="mr-1" />
                    {project.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="CalendarIcon" size={16} className="mr-1" />
                    {project.year}
                  </span>
                </div>

                <p className="font-body text-sm text-lcdream-gray-light font-body-regular">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;