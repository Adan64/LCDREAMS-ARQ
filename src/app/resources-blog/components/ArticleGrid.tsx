'use client';

import React, { useState } from 'react';
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

const ArticleGrid = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Tendencias',
    'Sostenibilidad',
    'Innovación',
    'Consejos para Clientes'
  ];

  const articles: Article[] = [
    {
      id: 3,
      title: "10 Tendencias Arquitectónicas que Dominarán 2026",
      excerpt: "Desde el diseño biofílico hasta la arquitectura paramétrica, estas son las tendencias que marcarán el año.",
      category: "Tendencias",
      readTime: "7 min",
      date: "8 Enero 2026",
      author: "Laura Martínez",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Modern architectural building showcasing parametric design with curved glass facades",
      slug: "10-tendencias-arquitectonicas-2026"
    },
    {
      id: 4,
      title: "Guía Completa: Cómo Planificar tu Proyecto Arquitectónico",
      excerpt: "Consejos prácticos para clientes que están iniciando un proyecto de construcción o renovación.",
      category: "Consejos para Clientes",
      readTime: "10 min",
      date: "5 Enero 2026",
      author: "David López",
      image: "https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Architect and client reviewing blueprints and architectural plans on desk with laptop",
      slug: "guia-planificar-proyecto-arquitectonico"
    },
    {
      id: 5,
      title: "Certificaciones Verdes: LEED, BREEAM y Más",
      excerpt: "Todo lo que necesitas saber sobre las principales certificaciones de construcción sostenible.",
      category: "Sostenibilidad",
      readTime: "9 min",
      date: "2 Enero 2026",
      author: "Ana Fernández",
      image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Green certified building with LEED plaque and sustainable landscaping features",
      slug: "certificaciones-verdes-leed-breeam"
    },
    {
      id: 6,
      title: "Inteligencia Artificial en el Diseño Arquitectónico",
      excerpt: "Cómo la IA está transformando el proceso de diseño y optimización de espacios arquitectónicos.",
      category: "Innovación",
      readTime: "8 min",
      date: "28 Diciembre 2025",
      author: "Roberto Sánchez",
      image: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Digital architectural design interface showing AI-powered 3D modeling software",
      slug: "inteligencia-artificial-diseno-arquitectonico"
    },
    {
      id: 7,
      title: "Presupuesto de Construcción: Evita Estos Errores Comunes",
      excerpt: "Los errores más frecuentes al presupuestar un proyecto arquitectónico y cómo evitarlos.",
      category: "Consejos para Clientes",
      readTime: "6 min",
      date: "25 Diciembre 2025",
      author: "Isabel Torres",
      image: "https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Construction budget spreadsheet with calculator and architectural drawings",
      slug: "presupuesto-construccion-errores-comunes"
    },
    {
      id: 8,
      title: "Arquitectura Modular: El Futuro de la Construcción Rápida",
      excerpt: "Descubre cómo la construcción modular está revolucionando los tiempos y costos de edificación.",
      category: "Tendencias",
      readTime: "7 min",
      date: "22 Diciembre 2025",
      author: "Miguel Ángel Ruiz",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Modular building construction with prefabricated units being assembled on site",
      slug: "arquitectura-modular-futuro-construccion"
    }
  ];

  const filteredArticles = activeCategory === 'Todos'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary mb-8">
            Todos los Artículos
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 font-body text-sm font-body-semibold rounded-md transition-smooth ${
                activeCategory === 'all' ?'bg-lcdream-gold text-black shadow-gold' :'bg-lcdream-dark-bg text-lcdream-gray-light border border-lcdream-gold/20 hover:border-lcdream-gold/50 hover:text-lcdream-gold'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 font-body text-sm font-body-semibold rounded-md transition-smooth ${
                  activeCategory === category
                    ? 'bg-lcdream-gold text-black shadow-gold'
                    : 'bg-lcdream-dark-bg text-lcdream-gray-light border border-lcdream-gold/20 hover:border-lcdream-gold/50 hover:text-lcdream-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/resources-blog/${article.slug}`}
              className="group bg-lcdream-dark-bg rounded-lg overflow-hidden shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth"
            >
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={article.image}
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-lcdream-gold text-black font-body text-xs font-body-semibold rounded-full">
                  {article.category}
                </span>
              </div>
              
              <div className="p-5">
                <h3 className="font-headline text-xl font-headline-semibold text-lcdream-white mb-2 group-hover:text-lcdream-gold transition-smooth">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-lcdream-gray-light font-body-regular mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="font-body font-body-regular text-secondary">
                    {article.date}
                  </span>
                  <div className="flex items-center space-x-1 text-secondary">
                    <Icon name="ClockIcon" size={14} />
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

export default ArticleGrid;