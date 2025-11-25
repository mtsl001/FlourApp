import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Plus, Minus } from 'lucide-react';
import { Blend } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  blend: Blend;
}

const ProductCard: React.FC<ProductCardProps> = ({ blend }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  
  // Find if item is in cart
  const cartItem = cart.find(item => item.id === blend.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-slate-100 hover:shadow-xl transition-all duration-300 group">
      <Link to={`/product/${blend.id}`} className="relative overflow-hidden block">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={blend.image} 
            alt={blend.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-brand-800 shadow-sm border border-brand-100">
          ₹{blend.price}/kg
        </div>
        {blend.gi < 50 && (
          <div className="absolute top-3 left-3 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm tracking-wide">
            Low GI
          </div>
        )}
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-xs text-brand-600 font-bold mb-2 uppercase tracking-wider truncate">
          {blend.segment}
        </div>
        <Link to={`/product/${blend.id}`} className="block mb-2">
          <h3 className="text-xl font-serif font-semibold text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">
            {blend.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow font-light leading-relaxed">
          {blend.heroClaim}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 bg-brand-50 p-3 rounded-lg border border-brand-100">
          <div className="flex flex-col items-center">
            <span className="font-bold text-brand-800 text-sm">{blend.protein}g</span>
            <span className="text-[10px] uppercase tracking-wide mt-0.5">Protein</span>
          </div>
          <div className="w-px h-8 bg-brand-200"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-brand-800 text-sm">{blend.fiber}g</span>
            <span className="text-[10px] uppercase tracking-wide mt-0.5">Fiber</span>
          </div>
          <div className="w-px h-8 bg-brand-200"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-brand-800 text-sm flex items-center gap-1">
              {blend.rotiQualityScore} <Star className="w-3 h-3 fill-accent-500 text-accent-500"/>
            </span>
            <span className="text-[10px] uppercase tracking-wide mt-0.5">Score</span>
          </div>
        </div>
        
        {quantity > 0 ? (
          <div className="flex items-center justify-between bg-brand-50 rounded-lg border border-brand-200 p-1">
            <button 
              onClick={(e) => {
                e.preventDefault();
                updateQuantity(blend.id, quantity - 1);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-brand-800 hover:bg-brand-100 transition-colors shadow-sm"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-brand-900 w-8 text-center">{quantity}</span>
            <button 
              onClick={(e) => {
                e.preventDefault();
                updateQuantity(blend.id, quantity + 1);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-brand-800 hover:bg-brand-100 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(blend);
            }}
            className="w-full bg-slate-900 hover:bg-brand-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium text-sm tracking-wide shadow-md hover:shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;