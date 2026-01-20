import React from 'react';
import { categories } from '../data/mockData';
import clsx from 'clsx';

export function CategoryBar({ isZenMode }) {
  if (isZenMode) return null;

  return (
    <div className="sticky top-14 bg-youtube-black z-30 pb-3 pt-3 px-4 flex gap-3 overflow-x-auto no-scrollbar w-full">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={clsx(
            "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            idx === 0
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-youtube-gray text-white hover:bg-youtube-hover"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
