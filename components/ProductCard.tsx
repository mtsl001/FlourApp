import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Blend } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  blend: Blend;
}

const ProductCard: React.FC<ProductCardProps> = ({ blend }) => {
  const { addToCart } = useCart();
  const imageUrl = `https://picsum.photos/seed/${blend.id + 50}/400/300`;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-slate-100">
      <Link to={`/product/${blend.id}`} className="relative group">
        <img 
          src={imageUrl} 
          alt={blend.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-brand-700">
          ₹{blend.price}/kg
        </div>
        <div className="absolute top-2 left-2 bg-brand-600 text-white px-2 py-1 rounded text-xs font-medium">
          {blend.gi < 55 ? 'Low GI' : 'Medium GI'}
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="text-xs text-brand-500 font-medium mb-1 uppercase tracking-wide truncate">
          {blend.segment}
        </div>
        <Link to={`/product/${blend.id}`} className="block">
          <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight hover:text-brand-700 transition-colors">
            {blend.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {blend.heroClaim}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded">
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-700">{blend.protein}g</span>
            <span>Protein</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-700">{blend.fiber}g</span>
            <span>Fiber</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              {blend.rotiQualityScore} <Star className="w-3 h-3 fill-amber-400 text-amber-400"/>
            </span>
            <span>Score</span>
          </div>
        </div>
        
        <button 
          onClick={() => addToCart(blend)}
          className="w-full bg-slate-900 hover:bg-brand-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
