import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wheat } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-700 font-semibold' : 'text-slate-600 hover:text-brand-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <Wheat className="h-8 w-8 text-brand-600" />
              <span className="font-bold text-xl text-brand-800 tracking-tight">FlouRblend</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/shop" className={isActive('/shop')}>Shop Blends</Link>
            <Link to="/about" className={isActive('/about')}>About Process</Link>
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-brand-600">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-4 text-slate-600">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-slate-600 hover:text-brand-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-50 border-t border-brand-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-brand-100">Home</Link>
            <Link to="/shop" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-brand-100">Shop Blends</Link>
            <Link to="/about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-brand-100">About Process</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
