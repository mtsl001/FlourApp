import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Check, ChefHat, Info, Activity, Star } from 'lucide-react';
import { blends } from '../data/blends';
import { useCart } from '../context/CartContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blend = blends.find(b => b.id === Number(id));
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'usage'>('overview');

  if (!blend) {
    return <div className="p-10 text-center">Product not found. <Link to="/shop">Go back</Link></div>;
  }

  const imageUrl = `https://picsum.photos/seed/${blend.id + 50}/800/800`;

  // Data for chart
  const macroData = [
    { name: 'Carbs', value: blend.carbs, color: '#e0c09d' },
    { name: 'Protein', value: blend.protein, color: '#c5804b' },
    { name: 'Fiber', value: blend.fiber, color: '#7d412e' },
    { name: 'Fat', value: blend.fat, color: '#d19e70' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center text-slate-500 hover:text-brand-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Side */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative">
              <img src={imageUrl} alt={blend.name} className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                 <span className="bg-brand-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-md">
                   GI: {blend.gi}
                 </span>
                 {blend.certifications.split(',').map((cert, i) => (
                   <span key={i} className="bg-white/90 backdrop-blur text-brand-800 px-3 py-1 rounded-md text-xs font-semibold shadow-md border border-brand-100">
                     {cert.trim()}
                   </span>
                 ))}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div>
            <div className="mb-2 text-brand-600 font-semibold tracking-wide uppercase text-sm">{blend.segment}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{blend.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl font-bold text-slate-800">₹{blend.price}<span className="text-sm font-normal text-slate-500">/kg</span></div>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex items-center text-amber-500 font-medium">
                {blend.rotiQualityScore} <Star className="w-4 h-4 ml-1 fill-current" /> <span className="text-slate-400 ml-1 text-sm font-normal">(Roti Score)</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 mb-8 italic border-l-4 border-brand-300 pl-4 py-1 bg-brand-50 rounded-r-lg">
              "{blend.heroClaim}"
            </p>

            <button 
              onClick={() => addToCart(blend)}
              className="w-full md:w-auto bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-md mb-8 hover:shadow-lg active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </button>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Overview & Benefits
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'nutrition'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Nutrition Facts
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'usage'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Usage & Cooking
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                       <Info className="w-5 h-5 text-brand-500"/> Composition
                    </h3>
                    <p className="text-slate-700">{blend.composition.split('|').join(' • ')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Target Demographic</h3>
                    <p className="text-slate-700">{blend.targetDemographic}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Why It Works</h3>
                    <p className="text-slate-700">{blend.bioavailabilityNotes}</p>
                  </div>
                   <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Sensory Profile</h3>
                    <p className="text-slate-700">{blend.sensoryExpectations}</p>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
                      <div className="w-full h-64">
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
                              <Legend />
                            </PieChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-4">
                         <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                           <div className="text-2xl font-bold text-brand-700">{blend.protein}g</div>
                           <div className="text-xs text-slate-500 uppercase">Protein</div>
                         </div>
                         <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                           <div className="text-2xl font-bold text-brand-700">{blend.fiber}g</div>
                           <div className="text-xs text-slate-500 uppercase">Fiber</div>
                         </div>
                         <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                           <div className="text-2xl font-bold text-brand-700">{blend.iron}mg</div>
                           <div className="text-xs text-slate-500 uppercase">Iron</div>
                         </div>
                         <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                           <div className="text-2xl font-bold text-brand-700">{blend.calcium}mg</div>
                           <div className="text-xs text-slate-500 uppercase">Calcium</div>
                         </div>
                      </div>
                   </div>
                   <div className="text-sm text-slate-500 text-center">Values per 100g</div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-brand-500" /> Cooking Instructions
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 marker:text-brand-500">
                      <li><strong>Kneading:</strong> {blend.kneadingInstructions}</li>
                      <li><strong>Rolling:</strong> {blend.rollingInstructions}</li>
                      <li><strong>Cooking:</strong> {blend.cookingInstructions}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-brand-500" /> Meal Pairing Idea
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-brand-100 shadow-sm">
                      <h4 className="font-bold text-brand-800">{blend.mealIdeaTitle}</h4>
                      <p className="text-sm text-slate-600 mt-1 mb-2">{blend.mealIngredients}</p>
                      <div className="flex items-start gap-2 text-sm text-brand-600">
                        <Check className="w-4 h-4 mt-0.5" /> 
                        <span>{blend.mealBenefits}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Storage</h3>
                    <p className="text-slate-700 text-sm">{blend.storageInstructions}</p>
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
