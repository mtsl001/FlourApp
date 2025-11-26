import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import { Blend } from '../types';

// --- Filter Configuration ---

type FilterCategory = 'goals' | 'stages' | 'diet' | 'price';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

const filterConfig: Record<FilterCategory, { title: string; options: FilterOption[] }> = {
  goals: {
    title: 'Health Goals',
    options: [
      { label: 'Diabetes & Blood Sugar', value: 'diabetes' },
      { label: 'Weight Management', value: 'weight' },
      { label: 'Digestion & Gut', value: 'digest' },
      { label: 'Heart Health', value: 'heart' },
      { label: 'Muscle & Energy', value: 'energy' },
      { label: 'General Wellness', value: 'wellness' },
    ]
  },
  stages: {
    title: 'Life Stage',
    options: [
      { label: 'Kids & Teens', value: 'kids' },
      { label: 'Women\'s Health', value: 'women' },
      { label: 'Men\'s Health', value: 'men' },
      { label: 'Seniors', value: 'senior' },
      { label: 'Family / Everyday', value: 'family' },
    ]
  },
  diet: {
    title: 'Dietary Needs',
    options: [
      { label: 'Gluten-Free', value: 'gluten' },
      { label: 'High Protein (>18g)', value: 'protein' },
      { label: 'Vegan', value: 'vegan' },
      { label: 'Low GI (<50)', value: 'lowgi' },
    ]
  },
  price: {
    title: 'Price Range',
    options: [
      { label: 'Budget Friendly (< ₹100)', value: 'budget' },
      { label: 'Standard (₹100 - ₹140)', value: 'standard' },
      { label: 'Premium (> ₹140)', value: 'premium' },
    ]
  }
};

const Shop: React.FC = () => {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    goals: true,
    stages: true,
    diet: false,
    price: false
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<FilterCategory, string[]>>({
    goals: [],
    stages: [],
    diet: [],
    price: []
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (category: FilterCategory, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({ goals: [], stages: [], diet: [], price: [] });
    setSearchTerm('');
  };

  // --- Filtering Logic ---

  const checkMatch = (blend: Blend, category: FilterCategory, values: string[]): boolean => {
    if (values.length === 0) return true; // No filter selected in this category = pass

    return values.some(val => {
      const segment = blend.segment.toLowerCase();
      const target = blend.targetDemographic.toLowerCase();
      const name = blend.name.toLowerCase();
      const certs = blend.certifications.toLowerCase();

      switch (category) {
        case 'goals':
          if (val === 'diabetes') return segment.includes('diabetes') || segment.includes('sugar');
          if (val === 'weight') return segment.includes('weight') || segment.includes('slim');
          if (val === 'digest') return segment.includes('digest') || segment.includes('gut') || segment.includes('ibs') || segment.includes('detox');
          if (val === 'heart') return segment.includes('heart') || segment.includes('cardio');
          if (val === 'energy') return segment.includes('energy') || segment.includes('muscle') || segment.includes('athlete') || segment.includes('sport');
          if (val === 'wellness') return segment.includes('wellness') || segment.includes('immunity') || segment.includes('sleep') || segment.includes('beauty');
          return false;
        
        case 'stages':
          if (val === 'kids') return target.includes('child') || target.includes('kid') || target.includes('student') || target.includes('adolescent');
          if (val === 'women') return target.includes('women') || target.includes('pregnan') || target.includes('nursing') || target.includes('mom') || segment.includes('pcos');
          if (val === 'men') return target.includes('men') && !target.includes('women');
          if (val === 'senior') return target.includes('senior') || target.includes('aging') || target.includes('arthritis');
          if (val === 'family') return target.includes('family') || target.includes('all ages') || segment.includes('everyday');
          return false;

        case 'diet':
          if (val === 'gluten') return certs.includes('gluten-free') || segment.includes('celiac');
          if (val === 'protein') return blend.protein >= 18;
          if (val === 'vegan') return certs.includes('vegan') || segment.includes('vegan');
          if (val === 'lowgi') return blend.gi < 50;
          return false;

        case 'price':
          if (val === 'budget') return blend.price < 100;
          if (val === 'standard') return blend.price >= 100 && blend.price <= 140;
          if (val === 'premium') return blend.price > 140;
          return false;
          
        default:
          return false;
      }
    });
  };

  const filteredBlends = useMemo(() => {
    return products.filter(blend => {
      // 1. Search Term
      const matchesSearch = 
        blend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        blend.heroClaim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blend.segment.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Category Filters (AND logic between categories, OR logic within category)
      const matchesGoals = checkMatch(blend, 'goals', selectedFilters.goals);
      const matchesStages = checkMatch(blend, 'stages', selectedFilters.stages);
      const matchesDiet = checkMatch(blend, 'diet', selectedFilters.diet);
      const matchesPrice = checkMatch(blend, 'price', selectedFilters.price);

      return matchesGoals && matchesStages && matchesDiet && matchesPrice;
    });
  }, [searchTerm, selectedFilters, products]);

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-brand-900 text-brand-50 py-12 shadow-md relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl font-serif font-bold mb-3">The Harvest Pantry</h1>
            <p className="text-brand-200 max-w-2xl text-lg font-light">
              Explore our collection of {products.length} scientifically balanced, fresh-milled blends.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className={`
            fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 lg:w-72 lg:bg-transparent lg:block
            ${showFilters ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="h-full overflow-y-auto bg-white lg:bg-transparent lg:h-auto lg:overflow-visible p-6 lg:p-0">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="font-bold text-xl text-slate-900">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                {(Object.keys(filterConfig) as FilterCategory[]).map(category => (
                  <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <button 
                      onClick={() => toggleSection(category)}
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-brand-900">{filterConfig[category].title}</span>
                      {openSections[category] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    
                    {openSections[category] && (
                      <div className="p-4 pt-0 border-t border-slate-50">
                        <div className="space-y-2 mt-3">
                          {filterConfig[category].options.map(option => {
                            const isSelected = selectedFilters[category].includes(option.value);
                            return (
                              <label key={option.value} className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className={`
                                  w-5 h-5 rounded border flex items-center justify-center transition-colors
                                  ${isSelected 
                                    ? 'bg-brand-600 border-brand-600' 
                                    : 'bg-white border-slate-300 group-hover:border-brand-400'}
                                `}>
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <input 
                                  type="checkbox" 
                                  className="hidden"
                                  checked={isSelected}
                                  onChange={() => toggleFilter(category, option.value)}
                                />
                                <span className={`text-sm ${isSelected ? 'text-brand-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                  {option.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={clearFilters}
                className="w-full mt-6 py-3 text-sm font-bold text-slate-500 hover:text-brand-700 border border-slate-200 rounded-xl hover:bg-white transition-colors lg:hidden"
              >
                Clear All Filters
              </button>
            </div>
            
            {/* Mobile Backdrop */}
            <div className="absolute inset-0 -z-10 bg-white lg:hidden"></div>
          </div>

          {/* Mobile Overlay */}
          {showFilters && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            ></div>
          )}

          {/* Main Content */}
          <div className="flex-1">
             {/* Search Bar & Actions */}
             <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <div className="relative flex-grow">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-5 w-5 text-slate-400" />
                 </div>
                 <input
                   type="text"
                   className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all"
                   placeholder="Search blends, ingredients, or health benefits..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button 
                 className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold shadow-sm active:scale-95 transition-transform"
                 onClick={() => setShowFilters(true)}
               >
                 <Filter className="w-5 h-5" /> Filters
                 {activeFilterCount > 0 && (
                   <span className="bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                     {activeFilterCount}
                   </span>
                 )}
               </button>
             </div>

             {/* Active Filters Display */}
             {activeFilterCount > 0 && (
               <div className="flex flex-wrap gap-2 mb-6">
                 {(Object.keys(selectedFilters) as FilterCategory[]).map(cat => 
                    selectedFilters[cat].map(val => {
                      const label = filterConfig[cat].options.find(o => o.value === val)?.label;
                      return (
                        <span key={`${cat}-${val}`} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-sm font-medium border border-brand-200">
                          {label}
                          <button onClick={() => toggleFilter(cat, val)} className="hover:text-brand-900"><X className="w-3 h-3"/></button>
                        </span>
                      );
                    })
                 )}
                 <button onClick={clearFilters} className="text-sm text-slate-500 hover:text-brand-700 underline px-2">
                   Clear all
                 </button>
               </div>
             )}

             {/* Results Grid */}
             {filteredBlends.length > 0 ? (
                <>
                  <p className="text-sm text-slate-500 mb-4">Showing {filteredBlends.length} blends</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredBlends.map(blend => (
                      <ProductCard key={blend.id} blend={blend} />
                    ))}
                  </div>
                </>
             ) : (
               <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="w-8 h-8 text-slate-300" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">No blends found</h3>
                 <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                   We couldn't find any blends matching your specific combination of filters.
                 </p>
                 <button 
                   onClick={clearFilters}
                   className="mt-6 px-6 py-2 bg-brand-100 text-brand-800 font-bold rounded-lg hover:bg-brand-200 transition-colors"
                 >
                   Clear Filters
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