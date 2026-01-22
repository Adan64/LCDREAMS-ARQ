import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6]?.map((item) => (
        <div key={item} className="bg-card rounded-lg overflow-hidden shadow-architectural animate-pulse">
          <div className="aspect-[4/3] bg-muted" />
          <div className="p-6">
            <div className="h-6 bg-muted rounded mb-3 w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;