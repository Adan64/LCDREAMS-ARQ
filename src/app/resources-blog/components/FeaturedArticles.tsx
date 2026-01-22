'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  alt: string;
  slug: string;
}

const FeaturedArticles = () => {
  const featuredArticles: Article[] = [
    {
      id: 1,
      title: "El Futuro de la Arquitectura Sostenible en 2026",
      excerpt: "Exploramos las tendencias emergentes en diseño ecológico y cómo están transformando el panorama arquitectónico mundial.",
      category: "Sostenibilidad",
      readTime: "8 min",
      date: "15 Enero 2026",
      author: "María González",
      image: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Modern sustainable building with green walls and solar panels integrated into architectural design",
      slug: "futuro-arquitectura-sostenible-2026"
    },
    {
      id: 2,
      title: "Materiales Innovadores que Están Revolucionando el Diseño",
      excerpt: "Desde hormigón translúcido hasta madera transparente, descubre los materiales que definen la arquitectura del futuro.",
      category: "Innovación",
      readTime: "6 min",
      date: "10 Enero 2026",
      author: "Carlos Ruiz",
      image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Close-up of innovative translucent building materials and modern architectural textures",
      slug: "materiales-innovadores-revolucionando-diseno"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-12 leading-tight text-center">
            Artículos Destacados
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/resources-blog/${article.slug}`}
              className="group bg-black rounded-lg overflow-hidden shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth"
            >
              <div className="relative h-64 overflow-hidden">
                <AppImage
                  src={article.image}
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-lcdream-gold text-black font-body text-xs font-body-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-3 group-hover:text-lcdream-gold transition-smooth">
                  {article.title}
                </h3>
                <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="font-body font-body-regular text-secondary">
                      {article.author}
                    </span>
                    <span className="font-body font-body-regular text-secondary">
                      {article.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-secondary">
                    <Icon name="ClockIcon" size={16} />
                    <span className="font-body font-body-regular">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;