import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wheat, Sparkles, User, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path 
    ? 'text-brand-800 font-bold border-b-2 border-brand-600' 
    : 'text-slate-600 hover:text-brand-700 hover:bg-brand-50 font-medium transition-all';

  return (
    <nav className="bg-white border-b border-brand-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" onClick={closeMenu}>
              <div className="bg-brand-900 text-brand-50 p-2.5 rounded-full group-hover:bg-brand-800 transition-colors shadow-md">
                 <Wheat className="h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl md:text-2xl text-brand-900 tracking-tight leading-none">The Ancient Harvest Co.</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-600 font-bold mt-1">Wisdom • Purity • Health</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`px-3 py-2 ${isActive('/')}`}>Home</Link>
            <Link to="/shop" className={`px-3 py-2 ${isActive('/shop')}`}>Shop Blends</Link>
            <Link to="/about" className={`px-3 py-2 ${isActive('/about')}`}>Our Philosophy</Link>
            
            <Link to="/quiz" className="flex items-center gap-2 bg-brand-100 hover:bg-brand-200 text-brand-800 px-4 py-2 rounded-full font-bold text-sm transition-colors border border-brand-200">
               <Sparkles className="w-4 h-4" /> Find My Blend
            </Link>

            <Link to="/cart" className="relative p-3 text-brand-900 hover:bg-brand-50 rounded-full transition-colors group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform bg-brand-700 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2 text-slate-700 hover:text-brand-800">
                <div className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center border border-brand-200">
                  <User className="w-5 h-5" />
                </div>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-slate-600 hover:text-brand-800 font-medium text-sm">
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-2 text-brand-900">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform bg-brand-700 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-slate-600 hover:text-brand-600 focus:outline-none p-2 hover:bg-slate-50 rounded-lg">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-100 shadow-xl absolute w-full z-50">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-900 hover:bg-brand-50 border-l-4 border-transparent hover:border-brand-500">Home</Link>
            <Link to="/quiz" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border-l-4 border-brand-500">✨ Find My Blend</Link>
            <Link to="/shop" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-900 hover:bg-brand-50 border-l-4 border-transparent hover:border-brand-500">Shop Blends</Link>
            <Link to="/about" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-900 hover:bg-brand-50 border-l-4 border-transparent hover:border-brand-500">Our Philosophy</Link>
            <div className="border-t border-slate-100 my-2 pt-2">
              {isAuthenticated ? (
                <Link to="/profile" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-900 hover:bg-brand-50">My Profile</Link>
              ) : (
                <Link to="/login" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-900 hover:bg-brand-50">Login / Sign Up</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
