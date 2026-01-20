import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoCard } from './VideoCard';
import { videos } from '../data/mockData';

export function StandardPlayer({ video, onClose }) {
  const recommended = videos.filter(v => v.id !== video.id).slice(0, 10);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-0 z-[100] bg-youtube-black overflow-y-auto"
    >
        {/* Simple Header for Close */}
        <div className="sticky top-0 h-14 bg-youtube-black/95 backdrop-blur flex items-center justify-between px-4 border-b border-gray-800 z-50">
           <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-youtube-red rounded-lg flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                </div>
                <span className="font-bold text-xl tracking-tighter">YouTube <sup className="font-normal text-xs text-gray-400">IN</sup></span>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
               <X size={24} />
           </button>
        </div>

        <div className="max-w-[1700px] mx-auto p-4 md:p-6 lg:flex gap-6">
            {/* Left Column: Video & Comments */}
            <div className="flex-1">
                {/* Video Player */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>

                {/* Info */}
                <h1 className="text-xl font-bold mb-2 line-clamp-2">{video.title}</h1>
                
                {/* Channel & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                     <div className="flex items-center gap-3">
                         <img src={video.avatar} className="w-10 h-10 rounded-full" alt="" />
                         <div>
                             <h3 className="font-semibold text-base">{video.channel}</h3>
                             <p className="text-xs text-gray-400">1.2M subscribers</p>
                         </div>
                         <button className="ml-4 bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200">
                             Subscribe
                         </button>
                     </div>

                     <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                         <div className="flex bg-[#222] rounded-full overflow-hidden">
                             <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#333] border-r border-[#333]">
                                 <ThumbsUp size={18} /> 
                                 <span className="text-sm font-medium">12K</span>
                             </button>
                             <button className="flex items-center px-3 py-2 hover:bg-[#333]">
                                 <ThumbsDown size={18} />
                             </button>
                         </div>
                         <button className="flex items-center gap-2 bg-[#222] px-3 py-2 rounded-full hover:bg-[#333]">
                             <Share2 size={18} /> <span className="text-sm font-medium">Share</span>
                         </button>
                         <button className="flex items-center gap-2 bg-[#222] px-3 py-2 rounded-full hover:bg-[#333]">
                             <Download size={18} /> <span className="text-sm font-medium">Download</span>
                         </button>
                         <button className="flex items-center justify-center bg-[#222] w-9 h-9 rounded-full hover:bg-[#333]">
                             <MoreHorizontal size={18} />
                         </button>
                     </div>
                </div>

                {/* Description Box */}
                <div className="bg-[#222] rounded-xl p-3 text-sm mb-6 cursor-pointer hover:bg-[#333]">
                    <div className="flex gap-2 font-medium mb-1">
                        <span>{video.views}</span>
                        <span>{video.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-line">
                        This is the description of the video. In normal mode, you can see all the details, links, and timestamps just like the real YouTube experience.
                        <br/><br/>
                        ...more
                    </p>
                </div>

                {/* Comments Section */}
                <div className="hidden md:block">
                    <div className="flex items-center gap-8 mb-6">
                        <h2 className="text-xl font-bold">482 Comments</h2>
                        <div className="flex items-center gap-2">
                             <MoreHorizontal size={20} className="rotate-90" />
                             <span className="font-medium text-sm">Sort by</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                         <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium shrink-0">M</div>
                         <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-gray-700 focus:border-white outline-none pb-1 text-sm" />
                    </div>

                    {/* Fake Comments */}
                    {[1,2,3,4].map(i => (
                        <div key={i} className="flex gap-4 mb-5">
                             <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
                                 <User size={20} />
                             </div>
                             <div>
                                 <div className="flex items-center gap-2 mb-1">
                                     <span className="font-semibold text-xs">@user{i}</span>
                                     <span className="text-xs text-gray-400">2 months ago</span>
                                 </div>
                                 <p className="text-sm">Great video! Really helped me understand the concept. Unlike Zen mode, I can actually read this.</p>
                                 <div className="flex items-center gap-4 mt-2">
                                     <button className="flex items-center gap-1 hover:bg-gray-800 p-1 rounded-full"><ThumbsUp size={14} /><span className="text-xs text-gray-400">12</span></button>
                                     <button className="p-1 hover:bg-gray-800 rounded-full"><ThumbsDown size={14} /></button>
                                     <span className="text-xs font-medium hover:bg-gray-800 px-3 py-1 rounded-full cursor-pointer">Reply</span>
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Recommendations */}
            <div className="w-full lg:w-[400px] shrink-0">
                 {recommended.map(rec => (
                     <div key={rec.id} className="flex gap-2 mb-3 cursor-pointer group">
                          <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 relative">
                               <img src={rec.thumbnail} className="w-full h-full object-cover" alt="" />
                               <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded text-white">4:20</div>
                          </div>
                          <div>
                               <h4 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-blue-400 mb-1">{rec.title}</h4>
                               <p className="text-xs text-gray-400 hover:text-white">{rec.channel}</p>
                               <p className="text-xs text-gray-400">{rec.views} • {rec.timestamp}</p>
                          </div>
                     </div>
                 ))}
            </div>
        </div>
    </motion.div>
  );
}
