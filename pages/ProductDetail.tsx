import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Check, ChefHat, Info, Activity, Star, Plus, Minus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useData();
  const blend = products.find(b => b.id === Number(id));
  const { cart, addToCart, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'usage'>('overview');

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
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <Info className="w-5 h-5 text-brand-500"/> Composition
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-brand-50 p-4 rounded-lg border border-brand-100 font-medium">
                      {blend.composition.split('|').join(' • ')}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Why It Works</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{blend.bioavailabilityNotes}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Sensory Profile</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{blend.sensoryExpectations}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="animate-fadeIn">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
                      <div className="w-full h-64 bg-slate-50 rounded-xl p-4 border border-slate-100">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={macroData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {macroData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-4">
                         <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 text-center">
                           <div className="text-3xl font-serif font-bold text-brand-800">{blend.protein}g</div>
                           <div className="text-xs text-brand-600 uppercase font-bold tracking-wider mt-1">Protein</div>
                         </div>
                         <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 text-center">
                           <div className="text-3xl font-serif font-bold text-brand-800">{blend.fiber}g</div>
                           <div className="text-xs text-brand-600 uppercase font-bold tracking-wider mt-1">Fiber</div>
                         </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                           <div className="text-xl font-bold text-slate-700">{blend.iron}mg</div>
                           <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">Iron</div>
                         </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                           <div className="text-xl font-bold text-slate-700">{blend.calcium}mg</div>
                           <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">Calcium</div>
                         </div>
                      </div>
                   </div>
                   <div className="text-xs text-slate-400 text-center italic">* Nutritional values per 100g serving</div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                    <h3 className="text-lg font-serif font-bold text-brand-900 mb-4 flex items-center gap-2">
                      <ChefHat className="w-5 h-5" /> Master the Perfect Roti
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-sm text-brand-900">
                        <span className="font-bold uppercase text-brand-500 w-20 flex-shrink-0">Knead</span>
                        <span>{blend.kneadingInstructions}</span>
                      </li>
                      <li className="flex gap-3 text-sm text-brand-900">
                        <span className="font-bold uppercase text-brand-500 w-20 flex-shrink-0">Roll</span>
                        <span>{blend.rollingInstructions}</span>
                      </li>
                      <li className="flex gap-3 text-sm text-brand-900">
                        <span className="font-bold uppercase text-brand-500 w-20 flex-shrink-0">Cook</span>
                        <span>{blend.cookingInstructions}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-brand-500" /> Meal Pairing Idea
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
