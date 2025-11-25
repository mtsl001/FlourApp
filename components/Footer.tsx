import React from 'react';
import { Wheat, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Wheat className="h-6 w-6 text-brand-300" />
              <span className="font-bold text-xl text-white">FlouRblend</span>
            </div>
            <p className="text-sm text-brand-200">
              Precision nutrition tailored for your health needs. Preservative-free, science-backed ancient grain blends.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-brand-200">
              <li><a href="#/shop" className="hover:text-white">All Blends</a></li>
              <li><a href="#/shop" className="hover:text-white">Diabetic Care</a></li>
              <li><a href="#/shop" className="hover:text-white">Weight Management</a></li>
              <li><a href="#/shop" className="hover:text-white">Kids Nutrition</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-brand-200">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Quality Promise</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Wholesale</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-300 hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-brand-300 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-brand-300 hover:text-white"><Facebook className="h-5 w-5" /></a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-brand-400">FSSAI Lic No: 1234567890</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-800 mt-8 pt-8 text-center text-xs text-brand-400">
          © {new Date().getFullYear()} FlouRblend. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
