
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Check, ChefHat, Info, Activity, Star, Plus, Minus, UserCheck, Microscope, Utensils, Wheat } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useData();
  const blend = products.find(b => b.id === Number(id));
  const { cart, addToCart, updateQuantity } = useCart();
  const activeTabDefault = 'overview'; 
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'usage'>(activeTabDefault);

  if (!blend) {
    return <div className="p-20 text-center font-serif text-xl">Product not found. <Link to="/shop" className="underline text-brand-700">Return to shop</Link></div>;
  }

  // Find cart item status
  const cartItem = cart.find(item => item.id === blend.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Data for chart
  const macroData = [
    { name: 'Carbs', value: blend.carbs, color: '#e0d2bc' },
    { name: 'Protein', value: blend.protein, color: '#8c603b' },
    { name: 'Fiber', value: blend.fiber, color: '#5c3d2a' },
    { name: 'Fat', value: blend.fat, color: '#b5926b' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-brand-50 border-b border-brand-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/shop" className="inline-flex items-center text-slate-500 hover:text-brand-800 transition-colors font-medium text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Side */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-brand-100 relative group aspect-square">
              <img src={blend.image.replace('&w=600', '&w=1200')} alt={blend.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                 <span className="bg-brand-700 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg tracking-wide">
                   GI: {blend.gi}
                 </span>
                 {blend.certifications.split(',').map((cert, i) => (
                   <span key={i} className="bg-white/95 backdrop-blur text-brand-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-brand-100 uppercase tracking-wider">
                     {cert.trim()}
                   </span>
                 ))}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 text-brand-600 font-bold tracking-widest uppercase text-xs">{blend.segment}</div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">{blend.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="text-3xl font-bold text-slate-900 font-serif">₹{blend.price}<span className="text-lg font-normal text-slate-500 font-sans">/kg</span></div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center text-brand-700 bg-brand-50 px-4 py-2 rounded-lg border border-brand-100">
                <span className="font-bold text-lg mr-1">{blend.rotiQualityScore}</span> 
                <Star className="w-4 h-4 fill-brand-600 text-brand-600 mr-2" /> 
                <span className="text-slate-600 text-sm">Roti Score</span>
              </div>
            </div>

            <p className="text-xl text-slate-600 mb-10 font-serif italic leading-relaxed text-brand-800">
              "{blend.heroClaim}"
            </p>

            <div className="mb-10">
              {quantity > 0 ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-xl border border-brand-200 p-1 shadow-sm w-48">
                    <button 
                      onClick={() => updateQuantity(blend.id, quantity - 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-100 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="flex-1 text-center font-bold text-xl text-brand-900">{quantity}</span>
                    <button 
                      onClick={() => updateQuantity(blend.id, quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-green-600 font-medium flex items-center bg-green-50 px-3 py-1 rounded-full"><Check className="w-4 h-4 mr-1"/> Added to cart</span>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(blend)}
                  className="w-full sm:w-auto bg-brand-900 hover:bg-brand-800 text-white px-10 py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-8">
              <nav className="-mb-px flex space-x-8 overflow-x-auto custom-scrollbar">
                {['overview', 'nutrition', 'usage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 px-1 border-b-2 font-bold text-sm tracking-wide uppercase transition-colors ${
                      activeTab === tab
                        ? 'border-brand-600 text-brand-800'
                        : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {tab === 'usage' ? 'Usage & Cooking' : tab === 'nutrition' ? 'Nutrition Facts' : 'Overview & Benefits'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Ingredients Section */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <Wheat className="w-5 h-5 text-brand-500"/> Key Ingredients
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-brand-50 p-4 rounded-lg border border-brand-100 font-medium shadow-sm">
                      {blend.composition.split('|').join(' • ')}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 italic flex items-center gap-1">
                      <Info className="w-3 h-3"/> Exact ingredient ratios are proprietary to ensure optimal bioavailability.
                    </p>
                  </div>

                  {/* Target Demographic & Science */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      <h3 className="text-md font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-brand-500"/> Who is this for?
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{blend.targetDemographic}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      <h3 className="text-md font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Microscope className="w-4 h-4 text-brand-500"/> The Science
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{blend.bioavailabilityNotes}</p>
                    </div>
                  </div>

                  {/* Sensory Profile */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">Sensory Experience</h3>
                    <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-brand-300 pl-4">
                      {blend.sensoryExpectations}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="animate-fadeIn space-y-8">
                   
                   {/* Macro Overview */}
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1 w-full h-72 bg-slate-50 rounded-xl p-4 border border-slate-100 relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={macroData}
                                cx="50%"
                                cy="55%"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={4}
                                dataKey="value"
                              >
                                {macroData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#475569', fontSize: '13px', fontWeight: '600' }}
                              />
                              <Legend 
                                verticalAlign="bottom" 
                                height={36} 
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: '10px' }}
                                formatter={(value) => <span className="text-xs font-bold text-slate-600 uppercase tracking-wide ml-1">{value}</span>}
                              />
                            </PieChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="flex-1 w-full grid grid-cols-2 gap-4">
                         <div className="bg-brand-50 p-5 rounded-xl border border-brand-100 text-center flex flex-col justify-center">
                           <div className="text-3xl font-serif font-bold text-brand-800">{blend.protein}g</div>
                           <div className="text-xs text-brand-600 uppercase font-bold tracking-wider mt-1">Protein</div>
                         </div>
                         <div className="bg-brand-50 p-5 rounded-xl border border-brand-100 text-center flex flex-col justify-center">
                           <div className="text-3xl font-serif font-bold text-brand-800">{blend.fiber}g</div>
                           <div className="text-xs text-brand-600 uppercase font-bold tracking-wider mt-1">Fiber</div>
                         </div>
                         <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm flex flex-col justify-center">
                           <div className="text-xl font-bold text-slate-700">{blend.iron}mg</div>
                           <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">Iron</div>
                         </div>
                         <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm flex flex-col justify-center">
                           <div className="text-xl font-bold text-slate-700">{blend.calcium}mg</div>
                           <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">Calcium</div>
                         </div>
                      </div>
                   </div>

                   {/* Glycemic Profile */}
                   <div>
                     <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">Glycemic Profile</h3>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                          <span className="block text-2xl font-bold text-slate-900">{blend.gi}</span>
                          <span className="text-xs text-slate-500 uppercase">Glycemic Index</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                          <span className="block text-2xl font-bold text-slate-900">{blend.gl}</span>
                          <span className="text-xs text-slate-500 uppercase">Glycemic Load</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                          <span className="block text-2xl font-bold text-slate-900">{blend.calories}</span>
                          <span className="text-xs text-slate-500 uppercase">Kcal / 100g</span>
                        </div>
                     </div>
                   </div>

                   <div className="text-xs text-slate-400 text-center italic border-t border-slate-100 pt-4">
                     * Nutritional values are approximate per 100g serving and may vary slightly due to natural variations in crops.
                   </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Instructions */}
                  <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                    <h3 className="text-lg font-serif font-bold text-brand-900 mb-6 flex items-center gap-2">
                      <ChefHat className="w-5 h-5" /> Master the Perfect Roti
                    </h3>
                    <div className="space-y-6 relative">
                      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-brand-200"></div>
                      
                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-brand-600 border-4 border-brand-50 z-10 flex-shrink-0"></div>
                        <div>
                           <h4 className="font-bold text-brand-800 text-sm uppercase mb-1">Knead</h4>
                           <p className="text-slate-700 text-sm">{blend.kneadingInstructions}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-brand-400 border-4 border-brand-50 z-10 flex-shrink-0"></div>
                        <div>
                           <h4 className="font-bold text-brand-800 text-sm uppercase mb-1">Roll</h4>
                           <p className="text-slate-700 text-sm">{blend.rollingInstructions}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 relative">
                         <div className="w-6 h-6 rounded-full bg-brand-300 border-4 border-brand-50 z-10 flex-shrink-0"></div>
                        <div>
                           <h4 className="font-bold text-brand-800 text-sm uppercase mb-1">Cook</h4>
                           <p className="text-slate-700 text-sm">{blend.cookingInstructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Perfect Pairings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Utensils className="w-4 h-4 text-green-600"/> Best Vegetable Pairings
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{blend.pairsWithVeg}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Utensils className="w-4 h-4 text-orange-600"/> Protein Combinations
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{blend.pairsWithProtein}</p>
                    </div>
                  </div>

                  {/* Meal Idea */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-brand-500" /> Complete Meal Idea
                    </h3>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-brand-800 text-lg mb-1">{blend.mealIdeaTitle}</h4>
                      <p className="text-sm text-slate-600 italic mb-3">{blend.mealIngredients}</p>
                      <div className="flex items-start gap-2 text-sm text-brand-700 bg-brand-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" /> 
                        <span>{blend.mealBenefits}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
