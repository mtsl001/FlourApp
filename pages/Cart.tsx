import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any nutrition blends yet.</p>
        <Link to="/shop" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <img 
                  src={`https://picsum.photos/seed/${item.id + 50}/150/150`} 
                  alt={item.name} 
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-lg text-slate-900">{item.name}</h3>
                  <p className="text-slate-500 text-sm">{item.priceString}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-right w-24">
                  <div className="font-bold text-lg text-slate-900">₹{item.price * item.quantity}</div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <div className="flex justify-end pt-4">
              <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800 underline">
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-xl text-brand-900">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                Secure checkout powered by Stripe (Demo Mode).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
