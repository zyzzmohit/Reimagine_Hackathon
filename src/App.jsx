import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CategoryBar } from './components/CategoryBar';
import { VideoCard } from './components/VideoCard';
import { ShortsShelf } from './components/ShortsShelf';
import { videos } from './data/mockData';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';


import { FocusWizard } from './components/FocusWizard';
import { LectureHallPlayer } from './components/LectureHallPlayer';
import { StandardPlayer } from './components/StandardPlayer';
import { Play, RotateCcw, X as XIcon } from 'lucide-react';

function App() {
  const [isZenMode, setIsZenMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Focus Session State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [focusFilter, setFocusFilter] = useState(null);
  
  // Video Player State
  const [activeVideo, setActiveVideo] = useState(null);
  
  // Global Search State
  const [searchTerm, setSearchTerm] = useState('');

  const toggleZenMode = () => {
      const newMode = !isZenMode;
      setIsZenMode(newMode);
      if (!newMode) {
          setFocusFilter(null);
          setSearchTerm(''); 
      }
  };
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleApplyFocus = (filter) => {
      setFocusFilter(filter);
      setSearchTerm(''); 
  };
  
  const handleGlobalSearch = (query) => {
      setSearchTerm(query);
      if (query.length > 0) {
          setFocusFilter(null); 
      }
  };

  // Filter Logic
  const displayVideos = videos.filter(v => {
      // 1. Initial Set: Focus Filter OR All Videos
      let matchesFocus = true;
      if (focusFilter) {
          const topicLower = focusFilter.topic.toLowerCase();
          const matchesTopic = v.title.toLowerCase().includes(topicLower) || 
                               v.category.toLowerCase().includes(topicLower);
          
          let matchesChannel = true;
          if (focusFilter.channel && focusFilter.channel.trim() !== '') {
               const inputChannels = focusFilter.channel.split(',').map(c => c.trim().toLowerCase());
               const videoChannel = v.channel.toLowerCase();
               matchesChannel = inputChannels.some(ic => videoChannel.includes(ic));
          }
           matchesFocus = matchesTopic && matchesChannel;
      }
      
      // 2. Secondary Filter: Global Search
      let matchesSearch = true;
      if (searchTerm) {
          const q = searchTerm.toLowerCase();
          matchesSearch = v.title.toLowerCase().includes(q) || 
                          v.channel.toLowerCase().includes(q) ||
                          v.category.toLowerCase().includes(q);
      }

      return matchesFocus && matchesSearch;
  });

  const handleVideoClick = (video) => {
      // Guardrails Logic
      if (focusFilter) {
          const topicLower = focusFilter.topic.toLowerCase();
          const matchesTopic = video.title.toLowerCase().includes(topicLower) || 
                               video.category.toLowerCase().includes(topicLower);
          
          // Strict Whitelist Mode: If doesn't match topic/goal, BLOCK IT.
          if (!matchesTopic) {
              alert(`🚫 Focus Guardrail Active!\n\nThis video doesn't match your goal: "${focusFilter.topic}".\nStay focused!`);
              return;
          }
      }
      setActiveVideo(video);
  };

  return (
    <div className="bg-youtube-black min-h-screen text-white font-sans relative">
      <Navbar 
        isZenMode={isZenMode} 
        toggleZenMode={toggleZenMode} 
        toggleSidebar={toggleSidebar} 
        onSearch={handleGlobalSearch}
      />

      <FocusWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        onApplyFocus={handleApplyFocus} 
      />
      
      {/* Video Player Overlay - Logic Switch */}
      <AnimatePresence>
        {activeVideo && (
            isZenMode ? (
                <LectureHallPlayer 
                    video={activeVideo} 
                    onClose={() => setActiveVideo(null)} 
                    focusGoal={focusFilter?.topic}
                    initialDuration={focusFilter?.duration}
                />
            ) : (
                <StandardPlayer
                    video={activeVideo} 
                    onClose={() => setActiveVideo(null)} 
                />
            )
        )}
      </AnimatePresence>

      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar isZenMode={isZenMode} isSidebarOpen={isSidebarOpen} />
        
        {/* Main Content Area */}
        <main className={clsx(
          "flex-1 p-4 transition-all duration-300",
          (!isZenMode && isSidebarOpen) ? "md:ml-60" : "md:ml-0"
        )}>
          <CategoryBar isZenMode={isZenMode} />
          
          <div className="max-w-[1800px] mx-auto min-h-[calc(100vh-100px)]">
             
             {/* Focus Mode Banner */}
             {isZenMode && (
                 <div className="mb-6 flex items-center justify-between bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                             <Play size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-blue-100">
                                {focusFilter ? `Focusing on: "${focusFilter.topic}"` : "Zen Mode Active"}
                            </h2>
                            <p className="text-xs text-blue-300/70">
                                {focusFilter ? "Showing relevant content only" : "Distractions hidden. Thumbs blurred."}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        {focusFilter && (
                             <button 
                                onClick={() => setFocusFilter(null)}
                                className="px-4 py-2 text-sm font-medium text-blue-300 hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <RotateCcw size={16} /> Reset
                            </button>
                        )}
                        <button 
                            onClick={() => setIsWizardOpen(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                        >
                            {focusFilter ? "Change Filter" : "Start Focus Session"}
                        </button>
                    </div>
                 </div>
             )}

             {/* Main Video Grid */}
             {displayVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-4">
                    {displayVideos.map(video => (
                        <div key={video.id} onClick={() => handleVideoClick(video)}>
                           <VideoCard video={video} isZenMode={isZenMode} />
                        </div>
                    ))}
                    {/* Filler content */}
                     {!focusFilter && videos.slice(0,4).map((_, i) => {
                        const fillerVideo = videos[videos.length - 1 - i];
                        if (!fillerVideo) return null;
                        return (
                            <div key={`dup-${i}`} onClick={() => handleVideoClick(fillerVideo)}>
                                <VideoCard video={fillerVideo} isZenMode={isZenMode} />
                            </div>
                        );
                     })}
                </div>
             ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                     <div className="mb-4 text-gray-500">
                        <RotateCcw size={48} />
                     </div>
                     <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                     <p className="text-gray-400">Try searching for "Education" or "Music"</p>
                     <button onClick={() => setFocusFilter(null)} className="mt-4 text-blue-400 hover:underline">Clear Filters</button>
                 </div>
             )}

             {/* Shorts Section */}
             <ShortsShelf isZenMode={isZenMode} />

             {/* More Videos Section */}
             {!focusFilter && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-4">
                    {videos.slice(2, 5).map(video => (
                        <div key={`more-${video.id}`} onClick={() => setActiveVideo(video)}>
                             <VideoCard video={video} isZenMode={isZenMode} />
                        </div>
                    ))}
                </div>
             )}
          </div>
        </main>
      </div>

       {/* Focus Overlay */}
       {isZenMode && !focusFilter && (
          <div className="fixed inset-0 pointer-events-none z-0 bg-blue-900/5 mix-blend-overlay"></div>
       )}
    </div>
  );
}

export default App;
