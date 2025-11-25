import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Home, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-50 px-4 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-slate-600 mb-6">
            Thank you, {formData.name}. Your freshly milled blends will be on their way soon. We've sent a receipt to {formData.email}.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-8 text-sm text-slate-500">
            Order ID: #FLB-{Math.floor(Math.random() * 10000)}
          </div>
          <Link to="/" className="block w-full bg-brand-700 text-white py-3 rounded-lg font-medium hover:bg-brand-800 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-brand-600" /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required name="name" onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John Doe" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input required name="email" type="email" onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <textarea required name="address" onChange={handleChange} rows={2} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="123 Wellness St"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input required name="city" onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                <input required name="zip" onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="mb-8 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" /> Payment (Demo)
            </h2>
            <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
              <p className="text-sm text-brand-800">No payment required for this demo. Just click "Place Order" to finish.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex justify-between font-bold text-xl text-slate-900 border-t border-slate-200 pt-4">
               <span>Total to Pay</span>
               <span>₹{cartTotal}</span>
             </div>
             <button type="submit" className="w-full bg-brand-700 hover:bg-brand-800 text-white py-4 rounded-xl font-bold shadow-md transition-transform active:scale-95">
               Place Order
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
