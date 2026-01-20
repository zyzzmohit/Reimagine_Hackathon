import React, { useState } from 'react';
import { X, Sparkles, Tv, BookOpen, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FocusWizard({ isOpen, onClose, onApplyFocus }) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [channel, setChannel] = useState('');
  const [duration, setDuration] = useState(25);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFocus({ topic, channel, duration: parseInt(duration) || 25 });
    onClose();
    // Reset for next time after close animation
    setTimeout(() => setStep(1), 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#1e1e1e] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
               <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Focus Session</h2>
              <p className="text-gray-400 text-sm">Tailor your feed for productivity</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                
                {/* Topic Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <BookOpen size={16} /> What is your goal for this session?
                    </label>
                    <input 
                        type="text" 
                        required
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Learn React Hooks, Study Linear Algebra..." 
                        className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                    />
                </div>
                
                {/* Duration Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Timer size={16} /> Session Duration (Minutes)
                    </label>
                    <input 
                        type="number" 
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="25" 
                        className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                    />
                </div>

                {/* Channel Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Tv size={16} /> Preferred Channel (Optional)
                    </label>
                    <input 
                        type="text" 
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        placeholder="e.g. FreeCodeCamp, Veritasium..." 
                        className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                    />
                    <p className="text-xs text-gray-500">Leave empty to search all trusted channels.</p>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Start Session</span>
                        <Sparkles size={16} />
                    </button>
                </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
