import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique segments for filter
  const segments = useMemo(() => {
    const allSegments = products.map(b => b.segment);
    return ['All', ...Array.from(new Set(allSegments))];
  }, [products]);

  const filteredBlends = useMemo(() => {
    return products.filter(blend => {
      const matchesSearch = blend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            blend.heroClaim.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSegment = selectedSegment === 'All' || blend.segment === selectedSegment;
      return matchesSearch && matchesSegment;
    });
  }, [searchTerm, selectedSegment, products]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-brand-800 text-brand-50 py-10 shadow-lg">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Shop Premium Blends</h1>
            <p className="text-brand-200 max-w-2xl">Discover nutrition tailored to your specific health goals.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar (Desktop) / Drawer (Mobile) */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6 lg:mb-4">
                 <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                   <Filter className="w-5 h-5" /> Filters
                 </h2>
                 <button onClick={() => setShowFilters(false)} className="lg:hidden text-slate-500">
                   <X className="w-5 h-5"/>
                 </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Health Goal / Segment</label>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {segments.map(segment => (
                    <label key={segment} className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="segment"
                        className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                        checked={selectedSegment === segment}
                        onChange={() => setSelectedSegment(segment)}
                      />
                      <span className={`text-sm ${selectedSegment === segment ? 'text-brand-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {segment}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 flex-1">
             {/* Search Bar & Mobile Filter Toggle */}
             <div className="flex flex-col sm:flex-row gap-4 mb-6">
               <div className="relative flex-grow">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-5 w-5 text-slate-400" />
                 </div>
                 <input
                   type="text"
                   className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm shadow-sm"
                   placeholder="Search for diabetes, weight loss, protein..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button 
                 className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium shadow-sm"
                 onClick={() => setShowFilters(true)}
               >
                 <Filter className="w-5 h-5" /> Filters
               </button>
             </div>

             {/* Results Grid */}
             {filteredBlends.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBlends.map(blend => (
                    <ProductCard key={blend.id} blend={blend} />
                  ))}
                </div>
             ) : (
               <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                 <div className="text-5xl mb-4">🔍</div>
                 <h3 className="text-xl font-medium text-slate-900">No blends found</h3>
                 <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                 <button 
                   onClick={() => { setSearchTerm(''); setSelectedSegment('All'); }}
                   className="mt-6 text-brand-600 font-medium hover:underline"
                 >
                   Clear all filters
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
