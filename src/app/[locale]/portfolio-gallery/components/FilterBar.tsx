'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterBarProps {
  categories: FilterOption[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) => {
  const t = useTranslations('PortfolioGallery.filters');

  const sortOptions = [
    { value: 'recent', label: t('sort.recent') },
    { value: 'oldest', label: t('sort.oldest') },
    { value: 'name', label: t('sort.name') },
    { value: 'area', label: t('sort.area') },
  ];

  return (
    <div className="bg-card rounded-lg shadow-architectural p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 font-body text-sm font-body-semibold rounded-md transition-smooth ${selectedCategory === category.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-text-primary hover:bg-accent/10 hover:text-accent'
                }`}
            >
              {category.label}
              <span className="ml-2 opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="FunnelIcon" size={20} className="text-secondary" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 bg-muted text-text-primary font-body text-sm font-body-regular rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-smooth ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-text-secondary hover:text-accent'
                }`}
              aria-label={t('ariaGrid')}
            >
              <Icon name="Squares2X2Icon" size={20} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-smooth ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-text-secondary hover:text-accent'
                }`}
              aria-label={t('ariaList')}
            >
              <Icon name="ListBulletIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;