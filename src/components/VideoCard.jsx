import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function VideoCard({ video, isZenMode }) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      {/* Thumbnail Container - Enforced Height */}
      <div className="relative rounded-xl overflow-hidden w-full h-48 bg-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={clsx(
            "w-full h-full object-cover zen-blur-transition",
            isZenMode ? "blur-xl opacity-20 grayscale brightness-50" : "group-hover:scale-105"
          )}
        />
        {!isZenMode && (
             <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                12:34
             </div>
        )}
      </div>

      {/* Meta Data */}
      <div className="flex gap-3 items-start">
        <img 
            src={video.avatar} 
            className={clsx("w-9 h-9 rounded-full mt-1", isZenMode && "opacity-50 grayscale")} 
            alt="avatar" 
        />
        <div className="flex flex-col">
          {/* Text is NOT blurred in Zen Mode, only dimmed slightly if needed, but requirements say allow reading */}
          <h3 className={clsx("text-white font-semibold line-clamp-2 text-sm md:text-base transition-colors", isZenMode && "text-gray-300")}>
            {video.title}
          </h3>
          <div className="text-gray-400 text-sm mt-1 flex items-center">
             <span>{video.channel}</span>
             {!isZenMode && <CheckCircle2 size={12} className="ml-1 fill-gray-400 text-black" />}
          </div>
          <div className="text-gray-400 text-sm">
            {video.views} • {video.timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}
