import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface RelatedProject {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  location: string;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-headline-bold mb-4 text-neutral-50">
            Proyectos Relacionados
          </h2>
          <p className="font-body text-lg text-text-secondary">
            Descubre más de nuestro trabajo innovador
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) =>
          <Link
            key={project.id}
            href={`/project-case-studies#${project.id}`}
            className="group">

              <div className="bg-card rounded-lg overflow-hidden shadow-architectural transition-smooth hover:shadow-elevated hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="flex items-center space-x-2 text-white">
                      <Icon name="ArrowRightIcon" size={20} />
                      <span className="font-body text-sm font-body-semibold">
                        Ver Caso de Estudio
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent font-body text-xs font-body-semibold rounded-full">
                      {project.category}
                    </span>
                    <span className="font-body text-xs text-text-secondary">
                      {project.location}
                    </span>
                  </div>
                  
                  <h3 className="font-headline text-xl font-headline-bold text-primary group-hover:text-accent transition-smooth">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

};

export default RelatedProjects;