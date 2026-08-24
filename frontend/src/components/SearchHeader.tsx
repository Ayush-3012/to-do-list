import { useState } from 'react';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchHeaderProps {
  onSearch: (keyword: string) => void;
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col py-4 px-1">
      {/* Top Icons Row */}
      <div className="flex justify-between items-center w-full text-slate-800">
        <button className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
          <FiSettings className="text-xl" />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-full cursor-pointer transition-colors ${isSearchOpen ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100'}`}
          >
            <FiSearch className="text-xl" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
            <FiBell className="text-xl" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="w-full relative overflow-hidden"
          >
            <input
              type="text"
              autoFocus
              placeholder="Search for a task"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-all"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
