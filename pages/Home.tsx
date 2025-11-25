import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Leaf, Wheat, Search, Microscope, Truck } from 'lucide-react';
import { blends } from '../data/blends';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredBlends = blends.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern/Texture */}
        <div className="absolute inset-0 bg-brand-50">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-100/50 skew-x-12 transform origin-top-right hidden lg:block"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 pr-0 lg:pr-12 mt-12 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-brand-200 text-brand-800 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <Wheat className="w-4 h-4 text-accent-600" />
              <span>Ancient Wisdom • Modern Science</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-900 leading-[1.1] mb-8">
              Honoring Wisdom. <br/>
              <span className="text-accent-600 italic">Purifying Life.</span>
            </h1>
            <p className="text-xl text-slate-700 mb-10 max-w-lg leading-relaxed font-light font-serif">
              "Food is the most primitive form of comfort, and the most powerful form of medicine."
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-brand-800 text-white text-base font-bold rounded-lg shadow-lg hover:bg-brand-900 hover:shadow-xl transition-all duration-300 group">
                Shop Our Blends
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-800 text-brand-900 text-base font-bold rounded-lg hover:bg-brand-50 transition-colors">
                Our Philosophy
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-[10/12] md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl transform rotate-2 border-8 border-white/50 relative">
               <img 
                 src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80" 
                 alt="Ancient grains and flour" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"></div>
               <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="font-serif italic text-lg opacity-90">"When food is pure, the mind becomes pure..."</p>
                  <p className="text-xs uppercase tracking-widest mt-2 opacity-75">— Chandogya Upanishad</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Introduction Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg text-brand-700">
             <Leaf className="w-8 h-8" />
           </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-500 mb-4">Our Essence</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-8 leading-tight">
            Welcome to The Ancient Harvest Co.
          </h3>
          
          <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed font-light">
            <p className="mb-8">
              Here, we honor the wisdom of our ancestors and the purity of Bharat’s soil. Food, in its truest essence, has always been sacred. The sages taught us:
            </p>
            
            <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100 mb-10">
              <p className="font-serif text-2xl text-brand-800 font-bold mb-4 italic">
                आहार शुद्धौ सत्त्व शुद्धिः सत्त्वशुद्धौ ध्रुवा स्मृतिलम्भः ।<br/>
                स्मृतिलम्भे सर्वग्रन्थीनां विप्र मोक्षः ||
              </p>
              <p className="text-sm uppercase tracking-widest text-brand-500 mb-4 font-bold">Chandogya Upanishad 7.26.2</p>
              <p className="text-slate-700 italic border-t border-brand-200 pt-4">
                "When food is pure, the mind becomes pure; when the mind is pure, true remembrance arises; with remembrance, all knots of the heart are loosened and liberation follows."
              </p>
            </div>

            <p className="mb-6">
              Inspired by such timeless wisdom, we select only the most authentic, organic, and unadulterated foods. In a world of refined, bleached, and processed foods, we stand for a return to roots. We believe that the kitchen is the heart of health.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-10">
               <div className="flex items-start gap-3">
                 <div className="mt-1 bg-brand-100 p-1.5 rounded-full text-brand-700"><ShieldCheck className="w-4 h-4"/></div>
                 <div>
                   <h4 className="font-bold text-brand-900">Grown by dedicated families</h4>
                   <p className="text-sm">Sourced directly from villages of Bharat.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1 bg-brand-100 p-1.5 rounded-full text-brand-700"><Leaf className="w-4 h-4"/></div>
                 <div>
                   <h4 className="font-bold text-brand-900">Absolutely Pure</h4>
                   <p className="text-sm">Free from chemicals, preservatives, & artificial essence.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1 bg-brand-100 p-1.5 rounded-full text-brand-700"><Wheat className="w-4 h-4"/></div>
                 <div>
                   <h4 className="font-bold text-brand-900">Scientifically Balanced</h4>
                   <p className="text-sm">Forgotten grains like Millets & Amaranth brought back.</p>
                 </div>
               </div>
            </div>

            <p className="text-xl font-serif text-brand-900 italic">
              With every bite, discover the original joy, aroma, strength, and wellness that our Vedas so beautifully described.
            </p>

            <div className="mt-8 pt-8 border-t border-slate-100">
               <p className="font-serif text-brand-700 font-bold">ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।</p>
               <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">May all be happy, may all be healthy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blends */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-4">Our Harvest</h2>
            <div className="w-24 h-1 bg-brand-300 mx-auto"></div>
            <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto font-light">
              Hand-crafted blends designed for specific health goals, milled fresh upon order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlends.map(blend => (
              <ProductCard key={blend.id} blend={blend} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/shop" className="inline-flex items-center justify-center px-10 py-4 bg-brand-900 text-brand-50 font-medium rounded-full shadow-lg hover:bg-brand-800 hover:scale-105 transition-all duration-300 text-sm tracking-widest uppercase">
              View All Blends
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section (Anveshan style transparency) */}
      <section className="py-24 bg-white border-t border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1 grid grid-cols-2 gap-6">
                <div className="space-y-6 mt-12">
                   <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm"><Search className="w-6 h-6"/></div>
                      <h4 className="font-serif font-bold text-brand-900">Traceable</h4>
                      <p className="text-xs text-slate-600 mt-2">Source identified farms.</p>
                   </div>
                   <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm"><Microscope className="w-6 h-6"/></div>
                      <h4 className="font-serif font-bold text-brand-900">Lab Tested</h4>
                      <p className="text-xs text-slate-600 mt-2">Certified nutritional profile.</p>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm"><Wheat className="w-6 h-6"/></div>
                      <h4 className="font-serif font-bold text-brand-900">Fresh Milled</h4>
                      <p className="text-xs text-slate-600 mt-2">Milled only after you order.</p>
                   </div>
                   <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm"><Truck className="w-6 h-6"/></div>
                      <h4 className="font-serif font-bold text-brand-900">Sealed</h4>
                      <p className="text-xs text-slate-600 mt-2">Vacuum packed freshness.</p>
                   </div>
                </div>
             </div>
             <div className="order-1 md:order-2">
                <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3 block">From Farm to Fork</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6">Transparent. Authentic. Pure.</h2>
                <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">
                   We don't warehouse flour. Industrial flour sits on shelves for months, losing vital nutrients and flavor. At The Ancient Harvest Co., we Mill-to-Order. This ensures that the bioactive compounds, natural oils, and prana (life force) of the grain remain intact when they reach your kitchen.
                </p>
                <Link to="/about" className="text-brand-800 font-bold border-b-2 border-brand-300 hover:border-brand-600 transition-all pb-1 inline-flex items-center">
                  Learn about our sourcing <ArrowRight className="ml-2 w-4 h-4"/>
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;