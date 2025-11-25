import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, RefreshCcw, ShoppingBag, Plus, Minus, Star, ChevronRight, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Blend } from '../types';

// --- Quiz Configuration ---

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: { value: string; label: string; icon?: string }[];
}

const questions: Question[] = [
  {
    id: 'age',
    text: 'Who are we shopping for today?',
    type: 'single',
    options: [
      { value: 'child', label: 'Child / Teen (Growth & Focus)' },
      { value: 'adult', label: 'Adult (Active & Wellness)' },
      { value: 'woman', label: 'Woman (Hormonal/Iron Health)' },
      { value: 'pregnancy', label: 'Pregnant / Nursing Mom' },
      { value: 'senior', label: 'Senior (60+ Active Aging)' },
    ]
  },
  {
    id: 'goal',
    text: 'What is your primary health goal?',
    type: 'single',
    options: [
      { value: 'diabetes', label: 'Diabetes / Blood Sugar Control' },
      { value: 'weight', label: 'Weight Management / Satiety' },
      { value: 'muscle', label: 'Muscle Gain / Fitness' },
      { value: 'digestion', label: 'Gut Health / Digestion' },
      { value: 'heart', label: 'Heart Health / Cholesterol' },
      { value: 'energy', label: 'Energy & Stamina' },
      { value: 'general', label: 'General Daily Wellness' },
    ]
  },
  {
    id: 'diet',
    text: 'Do you have any dietary restrictions?',
    type: 'multiple',
    options: [
      { value: 'glutenfree', label: 'Gluten-Free / Celiac' },
      { value: 'vegan', label: 'Vegan / Plant-Based' },
      { value: 'none', label: 'No Specific Restrictions' },
    ]
  },
  {
    id: 'nutrients',
    text: 'Are you looking for specific nutrient boosts?',
    type: 'multiple',
    options: [
      { value: 'protein', label: 'High Protein' },
      { value: 'fiber', label: 'High Fiber' },
      { value: 'iron', label: 'Iron & Calcium' },
      { value: 'lowgi', label: 'Ultra Low GI' },
    ]
  },
  {
    id: 'budget',
    text: 'What is your preferred price range?',
    type: 'single',
    options: [
      { value: 'budget', label: 'Budget Friendly (< ₹90/kg)' },
      { value: 'mid', label: 'Mid-Range (₹90 - ₹130/kg)' },
      { value: 'premium', label: 'Premium / Specialized (> ₹130/kg)' },
    ]
  }
];

// --- Scoring Logic ---

interface ScoredBlend extends Blend {
  score: number;
  matchReasons: string[];
}

const calculateScores = (products: Blend[], answers: Record<string, any>): ScoredBlend[] => {
  return products.map(blend => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Age Match (+10)
    const age = answers['age'];
    const target = blend.targetDemographic.toLowerCase();
    const segment = blend.segment.toLowerCase();

    if (age === 'child' && (target.includes('child') || target.includes('kid') || segment.includes('growth'))) {
      score += 15;
      reasons.push('Designed for children\'s growth & development');
    }
    if (age === 'senior' && (target.includes('senior') || target.includes('aging') || segment.includes('joint'))) {
      score += 15;
      reasons.push('Tailored for active aging & digestion');
    }
    if ((age === 'pregnancy') && (target.includes('pregnan') || target.includes('nursing') || target.includes('lactat'))) {
      score += 20; // High priority match
      reasons.push('Safe & nourishing for pregnancy/nursing');
    }
    if (age === 'woman' && (target.includes('women') || segment.includes('pcos') || segment.includes('beauty'))) {
      score += 10;
      reasons.push('Supports women\'s hormonal health');
    }
    if (age === 'adult' && (blend.id === 22 || blend.id === 30 || segment.includes('wellness'))) {
      score += 5; // General match
    }

    // 2. Goal Match (+15)
    const goal = answers['goal'];
    if (goal === 'diabetes' && (segment.includes('diabetes') || segment.includes('sugar') || blend.gi < 50)) {
      score += 15;
      reasons.push('Low GI for blood sugar management');
    }
    if (goal === 'weight' && (segment.includes('weight') || segment.includes('slim') || blend.fiber > 11)) {
      score += 15;
      reasons.push('High fiber content keeps you full longer');
    }
    if (goal === 'muscle' && (segment.includes('muscle') || segment.includes('athlete') || blend.protein > 19)) {
      score += 15;
      reasons.push('High protein supports muscle synthesis');
    }
    if (goal === 'digestion' && (segment.includes('gut') || segment.includes('digest') || segment.includes('ibs'))) {
      score += 15;
      reasons.push('Gentle on stomach & improves digestion');
    }
    if (goal === 'heart' && (segment.includes('heart') || segment.includes('cardio'))) {
      score += 15;
      reasons.push('Ingredients chosen for heart health');
    }
    if (goal === 'energy' && (segment.includes('energy') || segment.includes('vitality'))) {
      score += 15;
      reasons.push('Sustained energy release');
    }

    // 3. Dietary Restrictions (+10 or Filter)
    const restrictions = answers['diet'] || [];
    if (restrictions.includes('glutenfree')) {
      if (blend.certifications.toLowerCase().includes('gluten-free')) {
        score += 15;
        reasons.push('Certified Gluten-Free');
      } else {
        score -= 100; // Penalize heavy if GF is needed but not present
      }
    }
    if (restrictions.includes('vegan')) {
      // Assuming all are vegan unless specified (most flours are, but lets check fortification source logic if strictly applied. 
      // For now, simple logic: if it specifically claims vegan or is plant based)
      if (blend.certifications.toLowerCase().includes('vegan') || blend.composition.toLowerCase().includes('plant')) {
        score += 5;
      }
    }

    // 4. Nutrient Boosts (+12)
    const nutrients = answers['nutrients'] || [];
    if (nutrients.includes('protein') && blend.protein >= 18) {
      score += 12;
      reasons.push(`Excellent protein source (${blend.protein}g)`);
    }
    if (nutrients.includes('fiber') && blend.fiber >= 10) {
      score += 12;
      reasons.push(`High fiber content (${blend.fiber}g)`);
    }
    if (nutrients.includes('iron') && (blend.iron >= 5 || blend.calcium >= 120)) {
      score += 12;
      reasons.push('Rich in Iron and Calcium');
    }
    if (nutrients.includes('lowgi') && blend.gi <= 50) {
      score += 12;
      reasons.push(`Ultra-Low Glycemic Index (${blend.gi})`);
    }

    // 5. Budget (+5)
    const budget = answers['budget'];
    if (budget === 'budget' && blend.price <= 90) {
      score += 5;
      reasons.push('Fits your budget preference');
    }
    if (budget === 'premium' && blend.price > 130) {
      score += 5; // Preference for premium quality
    }
    // No penalty for premium if budget is mid, just less bonus.

    return { ...blend, score, matchReasons: reasons.slice(0, 4) }; // Top 4 reasons
  }).sort((a, b) => b.score - a.score);
};


// --- Component ---

const Quiz: React.FC = () => {
  const { products } = useData();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<ScoredBlend[]>([]);
  const { cart, addToCart, updateQuantity } = useCart();

  const handleOptionSelect = (value: string) => {
    const currentQ = questions[step];
    
    if (currentQ.type === 'single') {
      setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
      // Auto advance for single select
      if (step < questions.length - 1) {
        setTimeout(() => setStep(prev => prev + 1), 300);
      } else {
        finishQuiz({ ...answers, [currentQ.id]: value });
      }
    } else {
      // Multiple select
      const currentValues = answers[currentQ.id] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];
      setAnswers(prev => ({ ...prev, [currentQ.id]: newValues }));
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      finishQuiz(answers);
    }
  };

  const finishQuiz = (finalAnswers: Record<string, any>) => {
    const scored = calculateScores(products, finalAnswers);
    setResults(scored);
    setIsFinished(true);
    window.scrollTo(0,0);
  };

  const retakeQuiz = () => {
    setStep(0);
    setAnswers({});
    setIsFinished(false);
    setResults([]);
  };

  // --- Render Results View ---
  if (isFinished) {
    const topMatch = results[0];
    const runnersUp = results.slice(1, 3);

    return (
      <div className="bg-brand-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-2 block">Your Personal Blend Analysis</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-6">We found your perfect match</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Based on your needs for <span className="font-bold text-brand-700">{questions[1].options.find(o => o.value === answers['goal'])?.label}</span>, 
              we've identified the scientifically balanced blends for you.
            </p>
          </div>

          {/* Top Recommendation Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-200 mb-12 transform transition-all hover:shadow-2xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <img src={topMatch.image.replace('&w=600', '&w=800')} alt={topMatch.name} className="w-full h-full object-cover min-h-[300px]" />
                <div className="absolute top-4 left-4 bg-brand-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" /> Top Match (98% Fit)
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <div className="text-sm text-brand-500 font-bold uppercase tracking-wider mb-2">{topMatch.segment}</div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{topMatch.name}</h2>
                <p className="text-slate-600 mb-6 text-lg italic">"{topMatch.heroClaim}"</p>
                
                <div className="bg-brand-50 rounded-xl p-6 mb-8 border border-brand-100">
                  <h4 className="font-bold text-brand-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> Why this fits you:
                  </h4>
                  <ul className="space-y-2">
                    {topMatch.matchReasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                         <span className="text-brand-400 mt-1">•</span> {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-slate-900 font-serif">₹{topMatch.price}<span className="text-sm text-slate-500 font-sans font-normal">/kg</span></div>
                  {(() => {
                    const cartItem = cart.find(i => i.id === topMatch.id);
                    const qty = cartItem?.quantity || 0;
                    if (qty > 0) {
                      return (
                         <div className="flex items-center bg-white border border-brand-200 rounded-lg shadow-sm h-12">
                            <button onClick={() => updateQuantity(topMatch.id, qty - 1)} className="px-4 text-brand-800 hover:bg-brand-50 h-full rounded-l-lg"><Minus className="w-4 h-4"/></button>
                            <span className="w-8 text-center font-bold">{qty}</span>
                            <button onClick={() => updateQuantity(topMatch.id, qty + 1)} className="px-4 text-brand-800 hover:bg-brand-50 h-full rounded-r-lg"><Plus className="w-4 h-4"/></button>
                         </div>
                      );
                    }
                    return (
                      <button 
                        onClick={() => addToCart(topMatch)}
                        className="flex-1 bg-brand-900 hover:bg-brand-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                      >
                        <ShoppingBag className="w-5 h-5" /> Add to Cart
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Runners Up */}
          <h3 className="text-2xl font-serif font-bold text-brand-900 mb-6 pl-2">Other Great Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {runnersUp.map(blend => (
              <div key={blend.id} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                  <img src={blend.image} alt={blend.name} className="w-24 h-24 rounded-lg object-cover bg-slate-100" />
                  <div>
                    <div className="text-xs text-brand-600 font-bold uppercase mb-1">{blend.segment}</div>
                    <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight mb-1">{blend.name}</h4>
                    <div className="text-sm text-slate-500">{blend.protein}g Protein • {blend.fiber}g Fiber</div>
                  </div>
                </div>
                <div className="flex-grow">
                   <ul className="space-y-1 mb-4">
                     {blend.matchReasons.slice(0, 2).map((r, i) => (
                       <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                         <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 mt-0.5 flex-shrink-0"/> {r}
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <span className="font-bold text-slate-900">₹{blend.price}</span>
                  <Link to={`/product/${blend.id}`} className="text-sm font-medium text-brand-700 hover:text-brand-900 flex items-center">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={retakeQuiz} className="text-slate-500 hover:text-brand-700 flex items-center justify-center gap-2 mx-auto transition-colors">
              <RefreshCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Question View ---
  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
           <div className="flex justify-between text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
             <span>Question {step + 1}/{questions.length}</span>
             <span>{Math.round(progress)}%</span>
           </div>
           <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
             <div 
               className="h-full bg-brand-600 transition-all duration-500 ease-out"
               style={{ width: `${progress}%` }}
             ></div>
           </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
           <h2 className="text-3xl font-serif font-bold text-brand-900 mb-8 leading-tight">
             {currentQ.text}
           </h2>
           
           <div className="space-y-3">
             {currentQ.options.map(option => {
               const isSelected = currentQ.type === 'multiple' 
                  ? (answers[currentQ.id] || []).includes(option.value)
                  : answers[currentQ.id] === option.value;
                  
               return (
                 <button
                   key={option.value}
                   onClick={() => handleOptionSelect(option.value)}
                   className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                     isSelected 
                       ? 'border-brand-600 bg-brand-50 text-brand-900' 
                       : 'border-slate-100 hover:border-brand-300 hover:bg-white text-slate-700'
                   }`}
                 >
                   <span className="font-medium text-lg">{option.label}</span>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                     isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300 group-hover:border-brand-400'
                   }`}>
                     {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                   </div>
                 </button>
               );
             })}
           </div>

           {/* Navigation Actions */}
           <div className="mt-8 flex justify-between items-center">
             {step > 0 ? (
               <button 
                 onClick={() => setStep(prev => prev - 1)}
                 className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
               >
                 Back
               </button>
             ) : <div></div>}

             {currentQ.type === 'multiple' && (
               <button 
                 onClick={handleNext}
                 className="bg-brand-900 hover:bg-brand-800 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
               >
                 {step === questions.length - 1 ? 'See Results' : 'Next Question'}
                 <ArrowRight className="w-4 h-4" />
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
