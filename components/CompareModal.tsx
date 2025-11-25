import React from 'react';
import { X, Check, AlertCircle, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { Blend } from '../types';

const CompareModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, compareList, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isModalOpen) return null;

  // Helper to determine highlight color
  const getHighlightClass = (blends: Blend[], currentId: number, key: keyof Blend, type: 'high' | 'low') => {
    const values = blends.map(b => Number(b[key]));
    const currentValue = Number(blends.find(b => b.id === currentId)?.[key]);
    
    if (isNaN(currentValue)) return '';

    const bestValue = type === 'high' ? Math.max(...values) : Math.min(...values);
    
    if (currentValue === bestValue) {
      return 'bg-green-50 text-green-700 font-bold';
    }
    return '';
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-brand-900">Compare Blends</h2>
            <p className="text-slate-500 text-sm">Side-by-side nutritional analysis</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-auto custom-scrollbar flex-1 bg-slate-50/50">
          {compareList.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No items selected.</div>
          ) : (
            <div className="min-w-[600px] p-6">
               <table className="w-full border-collapse">
                 <thead>
                   <tr>
                     <th className="p-4 text-left w-48 bg-transparent"></th>
                     {compareList.map(blend => (
                       <th key={blend.id} className="p-4 w-64 align-top">
                         <div className="relative">
                            <button 
                              onClick={() => removeFromCompare(blend.id)}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-200 text-slate-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <img src={blend.image.replace('&w=600', '&w=200')} alt={blend.name} className="w-full h-32 object-cover rounded-xl shadow-sm mb-4" />
                            <h3 className="font-serif font-bold text-lg text-brand-900 leading-tight mb-1">{blend.name}</h3>
                            <div className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-3">{blend.segment}</div>
                            <button 
                              onClick={() => { addToCart(blend); setIsModalOpen(false); }}
                              className="w-full py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-sm font-bold shadow-sm"
                            >
                              Add to Cart
                            </button>
                         </div>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="text-sm text-slate-700">
                   {/* Overview Section */}
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50 rounded-l-lg">Price</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'price', 'low')}`}>
                          ₹{blend.price}/kg
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Roti Quality</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'rotiQualityScore', 'high')}`}>
                          <div className="flex items-center justify-center gap-1">
                            {blend.rotiQualityScore} <Star className="w-3 h-3 fill-current text-brand-500" />
                          </div>
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Hero Claim</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className="p-4 text-center border-b border-slate-100 italic text-slate-500">
                          "{blend.heroClaim}"
                        </td>
                      ))}
                   </tr>

                   {/* Nutrition Header */}
                   <tr>
                     <td colSpan={compareList.length + 1} className="p-4 pt-8">
                       <h4 className="font-serif font-bold text-brand-800 text-lg border-b border-brand-200 pb-2">Nutritional Profile (per 100g)</h4>
                     </td>
                   </tr>

                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50 rounded-l-lg">Protein</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'protein', 'high')}`}>
                          {blend.protein}g
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Fiber</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'fiber', 'high')}`}>
                          {blend.fiber}g
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Net Carbs</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'carbs', 'low')}`}>
                          {blend.carbs}g
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Glycemic Index (GI)</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'gi', 'low')}`}>
                          {blend.gi}
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50">Iron</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'iron', 'high')}`}>
                          {blend.iron}mg
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50 rounded-bl-lg">Calcium</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className={`p-4 text-center border-b border-slate-100 ${getHighlightClass(compareList, blend.id, 'calcium', 'high')}`}>
                          {blend.calcium}mg
                        </td>
                      ))}
                   </tr>

                   {/* Ingredients Header */}
                   <tr>
                     <td colSpan={compareList.length + 1} className="p-4 pt-8">
                       <h4 className="font-serif font-bold text-brand-800 text-lg border-b border-brand-200 pb-2">Ingredients & Info</h4>
                     </td>
                   </tr>

                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50 rounded-l-lg align-top">Composition</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className="p-4 text-center border-b border-slate-100 text-xs">
                          {blend.composition.split('|').join(' • ')}
                        </td>
                      ))}
                   </tr>
                   <tr>
                      <td className="p-4 font-bold text-slate-900 bg-slate-100/50 rounded-bl-lg align-top">Certifications</td>
                      {compareList.map(blend => (
                        <td key={blend.id} className="p-4 text-center border-b border-slate-100 text-xs">
                          {blend.certifications}
                        </td>
                      ))}
                   </tr>

                 </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;