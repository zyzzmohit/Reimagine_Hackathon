import React, { useState, useEffect } from 'react';
import { X, MessageSquareOff, PenTool, Maximize2, Timer, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LectureHallPlayer({ video, onClose, focusGoal, initialDuration = 25 }) {
  const [note, setNote] = useState('');
  
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(initialDuration * 60);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsBreakTime(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
        {/* Header */}
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f0f0f]">
            <div className="flex items-center gap-4">
                <h2 className="text-white font-semibold truncate max-w-xl">{video.title}</h2>
                {focusGoal && (
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-800/50">
                        Goal: {focusGoal}
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-4">
                 {/* Pomodoro Timer Display */}
                 <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-900/50 text-red-400' : 'bg-gray-800 text-gray-300'}`}>
                    <Timer size={16} />
                    <span className="font-mono text-sm font-medium">{formatTime(timeLeft)}</span>
                 </div>

                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>
        </div>

        {/* Main Content: Lecture Layout */}
        <div className="flex-1 flex overflow-hidden relative">
            
            {/* Break Overlay */}
            <AnimatePresence>
                {isBreakTime && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#1e1e1e] border border-gray-700 p-8 rounded-2xl max-w-md shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
                                <Coffee size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Time for a Break!</h2>
                            <p className="text-gray-400 mb-8">
                                You've focused for 25 minutes. Step away, stretch, and refresh your mind.
                                The video has been paused.
                            </p>
                            <button 
                                onClick={onClose} 
                                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                End Session
                            </button>
                            <button 
                                onClick={() => { setIsBreakTime(false); setTimeLeft(5 * 60); }} 
                                className="block mt-4 text-gray-500 hover:text-white text-sm mx-auto"
                            >
                                Take 5 min break (Reset)
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left: Cinema Mode Player */}
            <div className="flex-1 flex flex-col bg-black relative">
                <div className="flex-1 flex items-center justify-center p-4">
                     {/* We hide the iframe during break to "Stop" it effectively */}
                     <div className="w-full h-full max-h-[85vh] aspect-video bg-black shadow-2xl relative">
                        {!isBreakTime && (
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1" 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        )}
                        {isBreakTime && (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
                                <Coffee size={48} className="opacity-50" />
                            </div>
                        )}
                     </div>
                </div>
                
                {/* Visual Cue for Comments Hidden */}
                <div className="h-10 border-t border-gray-900 bg-[#0f0f0f] flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <MessageSquareOff size={16} />
                    <span>Comments hidden for focus</span>
                    <Maximize2 size={16} className="ml-4" />
                    <span>Cinema Mode Locked</span>
                </div>
            </div>

            {/* Right: Notes Board (Replaces Recommendations) */}
            <div className="w-[350px] border-l border-gray-800 bg-[#121212] flex flex-col">
                <div className="p-4 border-b border-gray-800 flex items-center gap-2 text-gray-300">
                    <PenTool size={18} />
                    <span className="font-medium">Lecture Notes</span>
                </div>
                <textarea 
                    className="flex-1 bg-transparent p-4 text-gray-300 focus:outline-none resize-none placeholder:text-gray-700 font-mono text-sm leading-relaxed"
                    placeholder="Type your notes here... (Layout mimics a classroom notebook)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <div className="p-3 border-t border-gray-800 text-xs text-center text-gray-600">
                    Notes are local to this session
                </div>
            </div>
        </div>
    </motion.div>
  );
}
