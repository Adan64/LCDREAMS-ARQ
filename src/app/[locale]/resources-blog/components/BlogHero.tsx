'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const BlogHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
        <div className="max-w-3xl">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block">
            Resources & Blog
          </span>
          <h1 className="font-headline text-5xl lg:text-7xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            Resources & Blog
          </h1>
          <p className="font-body text-xl lg:text-2xl text-lcdream-gray-light font-body-regular leading-relaxed max-w-3xl">
            Descubre artículos sobre tendencias arquitectónicas, sostenibilidad, innovación y consejos prácticos para tus proyectos.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full px-6 py-4 pr-14 rounded-lg font-body text-base font-body-regular text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-primary hover:text-accent transition-smooth"
              aria-label="Search"
            >
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;