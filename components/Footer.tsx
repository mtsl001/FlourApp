import React from 'react';
import { Wheat, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-800 p-2 rounded-full">
                <Wheat className="h-6 w-6 text-brand-200" />
              </div>
              <span className="font-serif font-bold text-xl text-white">The Ancient Harvest Co.</span>
            </div>
            <p className="text-sm text-brand-200 leading-relaxed">
              We honor the wisdom of our ancestors and the purity of Bharat’s soil. Hand-picked, stone-ground, and scientifically balanced nutrition for the modern family.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-serif font-semibold mb-4 text-lg">Shop</h3>
            <ul className="space-y-2 text-sm text-brand-200">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Blends</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Diabetic Care</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Weight Management</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Kids Nutrition</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-4 text-lg">Philosophy</h3>
            <ul className="space-y-2 text-sm text-brand-200">
              <li><Link to="/about" className="hover:text-white transition-colors">Vedic Wisdom</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Farm to Fork</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-4 text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-300 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-brand-300 hover:text-white transition-colors"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-brand-300 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-brand-400">FSSAI Lic No: 1234567890</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-800 mt-10 pt-8 text-center text-xs text-brand-400 flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} The Ancient Harvest Co. All rights reserved.</span>
          <span className="mt-2 md:mt-0 italic font-serif">Survey Bhavantu Sukhinah</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
