import React, { useState } from 'react';
import { Menu, Search, Mic, Video, Bell, User, X } from 'lucide-react';
import clsx from 'clsx';

export function Navbar({ isZenMode, toggleZenMode, toggleSidebar, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-youtube-black flex items-center justify-between px-4 z-50 border-b border-youtube-black">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-youtube-hover rounded-full">
          <Menu className="text-white" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer" title="YouTube Zen Home">
          <div className="relative flex items-center justify-center">
             <div className="w-8 h-5 bg-youtube-red rounded-lg flex items-center justify-center relative z-10">
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
             </div>
             {isZenMode && (
                 <div className="absolute -inset-1 bg-blue-500 rounded-lg blur-md animate-pulse opacity-50"></div>
             )}
          </div>
          <span className="text-white text-xl font-bold tracking-tighter relative">
            YouTube <sup className="text-gray-400 font-normal text-xs absolute -top-1 -right-6">IN</sup>
            {isZenMode && <span className="text-blue-400 ml-1 font-italic font-light">Zen</span>}
          </span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-[700px] ml-10 items-center gap-4">
         <div className="flex flex-1 items-center">
            <div className="flex flex-1 items-center relative">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-[#121212] border border-[#303030] rounded-l-full py-2 px-4 text-white focus:outline-none focus:border-blue-500 pl-10 h-10 shadow-inner"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className="absolute left-3 top-2.5 text-gray-400 opacity-0 focus-within:opacity-100">
                    <Search size={16} />
                </div>
            </div>
            <button className="h-10 px-5 bg-youtube-gray border border-l-0 border-[#303030] rounded-r-full hover:bg-youtube-hover">
                <Search size={20} className="text-white font-light" />
            </button>
         </div>
         <button className="p-2 bg-[#121212] hover:bg-youtube-hover rounded-full transition-colors flex items-center justify-center content-center h-10 w-10">
            <Mic size={20} />
         </button>
      </div>

      {/* Right: Actions & Toggle */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 bg-youtube-gray/50 p-1 pl-3 rounded-full border border-gray-700/50 hover:border-gray-500 transition-colors">
            <span className={clsx("text-xs font-semibold uppercase tracking-wider", isZenMode ? "text-blue-400" : "text-gray-400")}>
                {isZenMode ? "Focus ON" : "Zen Mode"}
            </span>
            <button
                onClick={toggleZenMode}
                className={clsx(
                "w-12 h-6 rounded-full p-1 transition-all duration-300 relative shadow-inner",
                isZenMode ? "bg-blue-600 shadow-blue-900/50" : "bg-gray-600"
                )}
            >
                <div
                className={clsx(
                    "w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 absolute top-1",
                    isZenMode ? "left-7" : "left-1"
                )}
                />
            </button>
        </div>

        <button className="hidden md:block p-2 hover:bg-youtube-hover rounded-full">
            <Video size={20} />
        </button>
        <button className="hidden md:block p-2 hover:bg-youtube-hover rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-youtube-red text-white text-[10px] px-1 rounded-full border border-youtube-black">9+</span>
        </button>
        <button className="p-1 hover:bg-youtube-hover rounded-full ml-1">
             <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                M
             </div>
        </button>
      </div>
    </nav>
  );
}
