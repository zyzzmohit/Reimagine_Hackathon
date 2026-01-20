import React from 'react';
import { MoreVertical } from 'lucide-react';
import { shorts } from '../data/mockData';

export function ShortsShelf({ isZenMode }) {
  if (isZenMode) return null;

  return (
    <div className="py-8 border-t border-b border-gray-800 my-4">
      <div className="flex items-center gap-2 mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Youtube_shorts_icon.svg" alt="Shorts" className="w-6 h-6" />
        <h2 className="text-xl font-bold">Shorts</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {shorts.map((short) => (
          <div key={short.id} className="cursor-pointer group">
            <div className="relative rounded-xl overflow-hidden aspect-[9/16]">
              <img 
                src={short.thumbnail} 
                alt={short.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                 <MoreVertical className="text-white drop-shadow-md" size={20}/>
              </div>
               <div className="absolute bottom-4 left-2 right-2 text-white">
                 <h3 className="font-semibold line-clamp-2 shadow-black drop-shadow-md text-sm">{short.title}</h3>
                 <p className="text-xs font-medium mt-1 shadow-black drop-shadow-md">{short.views}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
