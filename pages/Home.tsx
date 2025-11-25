import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';
import { blends } from '../data/blends';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredBlends = blends.slice(0, 3); // Just show first 3 for now

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 z-10">
            <span className="inline-block px-3 py-1 bg-brand-200 text-brand-800 rounded-full text-sm font-semibold mb-6">
              Science-Backed Nutrition
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Precision Flours for <br/>
              <span className="text-brand-600">Better Living</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Customized, preservative-free ancient grain blends tailored for diabetes, immunity, kids' growth, and active lifestyles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-700 hover:bg-brand-800 md:text-lg transition-colors">
                Shop All Blends
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-colors">
                How It Works
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-600"/> FSSAI Certified</div>
              <div className="flex items-center gap-2"><Leaf className="w-5 h-5 text-green-600"/> Preservative Free</div>
            </div>
          </div>
          <div className="lg:w-1/2 mb-10 lg:mb-0 relative">
             <img 
               src="https://picsum.photos/seed/flourhero/800/600" 
               alt="Healthy Flour Blend" 
               className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
               <p className="text-brand-800 font-bold text-xl">30+ Blends</p>
               <p className="text-slate-500 text-sm">For every health need</p>
             </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose FlouRblend?</h2>
            <p className="mt-4 text-slate-600">We don't just sell flour; we deliver precision nutrition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Freshly Milled", desc: "Milled only after you order to retain maximum nutrients and aroma.", icon: "🌾" },
              { title: "Science-Backed", desc: "Formulated by nutritionists for specific health outcomes like diabetes control.", icon: "🔬" },
              { title: "Ancient Grains", desc: "Powered by Millets, Amaranth, and Quinoa—naturally rich in fiber & minerals.", icon: "🏛️" }
            ].map((item, idx) => (
              <div key={idx} className="bg-brand-50 p-6 rounded-xl text-center hover:bg-brand-100 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blends */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Popular Blends</h2>
              <p className="mt-2 text-slate-600">Our customers' favorites for daily wellness.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-brand-700 font-medium hover:text-brand-900">
              View all <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlends.map(blend => (
              <ProductCard key={blend.id} blend={blend} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Link to="/shop" className="inline-flex items-center text-brand-700 font-medium">
              View all blends <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
          </div>
        </div>
      </section>

       {/* How It Works */}
       <section className="py-16 bg-brand-900 text-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
             <div className="relative">
               <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold border-2 border-brand-500">1</div>
               <h3 className="font-semibold text-lg mb-2">Choose Your Goal</h3>
               <p className="text-brand-200 text-sm">Select a blend based on your health needs (Diabetes, Weight Loss, Kids).</p>
             </div>
             <div className="relative">
               <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold border-2 border-brand-500">2</div>
               <h3 className="font-semibold text-lg mb-2">We Mill Fresh</h3>
               <p className="text-brand-200 text-sm">We process your order immediately using cold-milling technology.</p>
             </div>
             <div className="relative">
               <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold border-2 border-brand-500">3</div>
               <h3 className="font-semibold text-lg mb-2">Vacuum Sealed</h3>
               <p className="text-brand-200 text-sm">Packed in airtight pouches to lock in freshness and nutrients.</p>
             </div>
             <div className="relative">
               <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold border-2 border-brand-500">4</div>
               <h3 className="font-semibold text-lg mb-2">Delivered</h3>
               <p className="text-brand-200 text-sm">Shipped directly to your doorstep within 3-5 days.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
