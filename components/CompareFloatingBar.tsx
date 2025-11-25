import React from 'react';
import { X, Scale } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareFloatingBar: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, setIsModalOpen } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-sm font-bold text-brand-800 hidden md:block">
              Compare ({compareList.length}/3):
            </span>
            {compareList.map(blend => (
              <div key={blend.id} className="relative flex-shrink-0 group">
                <img 
                  src={blend.image.replace('&w=600', '&w=100')} 
                  alt={blend.name} 
                  className="w-12 h-12 rounded-lg object-cover border border-brand-100 shadow-sm"
                />
                <button 
                  onClick={() => removeFromCompare(blend.id)}
                  className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={clearCompare}
               className="text-sm text-slate-500 hover:text-red-600 font-medium px-3"
             >
               Clear
             </button>
             <button 
               onClick={() => setIsModalOpen(true)}
               disabled={compareList.length < 2}
               className="flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <Scale className="w-4 h-4" /> 
               Compare Now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareFloatingBar;