import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sun, Heart, Users, Wheat, ShieldCheck, Truck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-brand-900 text-brand-50 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80" 
            alt="Farmer in field" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-accent-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Philosophy</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            Restoring the Sanctity <br/> of Food
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-brand-200 leading-relaxed max-w-2xl mx-auto">
            "Annad bhavanti bhutani..." <br/>
            <span className="text-base font-sans not-italic text-brand-300 mt-2 block">
              From food, all beings are born; by food, they are sustained.
              <br/>— Taittiriya Upanishad
            </span>
          </p>
        </div>
      </div>

      {/* The Mission / Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl rotate-2 border-8 border-brand-50">
               <img 
                 src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" 
                 alt="Hands holding grain" 
                 className="w-full h-full object-cover"
               />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-brand-50 p-8 rounded-xl shadow-lg max-w-xs hidden md:block border border-brand-100">
                <p className="font-serif text-brand-900 font-bold text-lg mb-2">"Purity is not a feature. It is the foundation."</p>
             </div>
          </div>
          
          <div className="prose prose-lg text-slate-600">
            <h2 className="text-3xl font-serif font-bold text-brand-900 mb-6">A Return to Roots</h2>
            <p>
              In the rush of modern life, we forgot what true nourishment feels like. Shelves are lined with bleached flours, stripped of their soul, engineered for shelf-life rather than human life.
            </p>
            <p>
              <strong>The Ancient Harvest Co.</strong> was born from a desire to turn back the clock. To a time when food was medicine. When grains were grown with reverence, milled with patience, and consumed with gratitude.
            </p>
            <p>
              We believe that the kitchen is the most sacred space in a home. What enters it should be pure, potent, and full of Prana (life force). By bringing back forgotten ancient grains like Millets, Amaranth, and Sorghum, we aren't just selling flour; we are reclaiming our heritage.
            </p>
            
            <div className="flex flex-col gap-4 mt-8 not-prose">
              <div className="flex items-center gap-4 bg-brand-50 p-4 rounded-lg border border-brand-100">
                <div className="bg-white p-2 rounded-full text-brand-600 shadow-sm"><Sun className="w-5 h-5"/></div>
                <div>
                  <h4 className="font-bold text-brand-900">Solar & Soul Powered</h4>
                  <p className="text-sm text-slate-600">Grown under the Indian sun, harvested by hands that care.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-brand-50 p-4 rounded-lg border border-brand-100">
                <div className="bg-white p-2 rounded-full text-brand-600 shadow-sm"><Users className="w-5 h-5"/></div>
                <div>
                  <h4 className="font-bold text-brand-900">Farmer First</h4>
                  <p className="text-sm text-slate-600">Fair trade pricing. We treat our farmers as partners, not vendors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vedic Connection */}
      <section className="bg-brand-900 text-brand-100 py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <Wheat className="w-12 h-12 mx-auto text-brand-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Guided by Ancient Wisdom</h2>
            <p className="text-lg leading-relaxed font-light opacity-90 mb-12">
              Our formulation philosophy is deeply rooted in Ayurveda and the Vedas. We don't randomly mix grains. We study their thermal nature (Virya), post-digestive effect (Vipaka), and how they interact with the body's constitution (Doshas).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-6 border border-brand-700 rounded-xl bg-brand-800/50">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Sattva (Purity)</h3>
                  <p className="text-sm text-brand-300">Ingredients that promote clarity, peace, and lightness in the body and mind.</p>
               </div>
               <div className="p-6 border border-brand-700 rounded-xl bg-brand-800/50">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Ahara (Diet)</h3>
                  <p className="text-sm text-brand-300">Food chosen not just for taste, but for its ability to heal and sustain.</p>
               </div>
               <div className="p-6 border border-brand-700 rounded-xl bg-brand-800/50">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Ojas (Vitality)</h3>
                  <p className="text-sm text-brand-300">Processing techniques that preserve the vital essence ensuring maximum immunity.</p>
               </div>
            </div>
         </div>
      </section>

      {/* The Modern Science (Process) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-serif font-bold text-brand-900">The Modern Method</h2>
             <div className="w-16 h-1 bg-brand-400 mx-auto mt-4 mb-4"></div>
             <p className="text-slate-600 max-w-2xl mx-auto">
               While our heart is ancient, our methods are rigorous. We use precision nutrition science to validate our traditions.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 transition-colors">
                    <Leaf className="w-8 h-8 text-brand-700" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">1. Sourcing</h3>
                 <p className="text-sm text-slate-500">We scout remote villages for heirloom seed varieties that haven't been genetically modified.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 transition-colors">
                    <ShieldCheck className="w-8 h-8 text-brand-700" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">2. Lab Testing</h3>
                 <p className="text-sm text-slate-500">Every batch is tested for heavy metals and pesticides. We ensure the nutrient density matches our claims.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 transition-colors">
                    <Wheat className="w-8 h-8 text-brand-700" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">3. Mill-to-Order</h3>
                 <p className="text-sm text-slate-500">We don't store flour. We store grain. We mill only when we receive your order to prevent oxidation.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 transition-colors">
                    <Truck className="w-8 h-8 text-brand-700" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">4. Doorstep Delivery</h3>
                 <p className="text-sm text-slate-500">Vacuum sealed immediately and shipped. From our chakki (mill) to your kitchen in days.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-6 fill-current" />
            <h2 className="text-3xl font-serif font-bold text-brand-900 mb-6">Join the Movement</h2>
            <p className="text-lg text-slate-600 mb-8">
              By choosing The Ancient Harvest Co., you are supporting a network of 500+ small organic farmers and gifting your family the health they deserve.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-900 text-white text-lg font-bold rounded-full shadow-xl hover:bg-brand-800 transition-all hover:scale-105"
            >
              Explore Our Blends
            </Link>
         </div>
      </section>
    </div>
  );
};

export default About;
