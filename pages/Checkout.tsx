
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Home, CreditCard, Lock, Smartphone, Loader2, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated, addOrder, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  // Pre-fill form from user profile
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || ''
      });
    }
  }, [user]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePayment = async () => {
    setStep('processing');
    
    // Auto-save address to profile if logged in
    if (isAuthenticated) {
      try {
        await updateProfile({
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        });
      } catch (err) {
        console.error("Failed to update profile", err);
      }
    }

    // Simulate payment gateway delay
    setTimeout(async () => {
      const newOrder: Order = {
        id: `AHC-${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: [...cart],
        total: cartTotal,
        status: 'Processing',
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}`,
        customerName: formData.name,
        customerEmail: formData.email
      };

      if (isAuthenticated) {
        await addOrder(newOrder);
      }
      
      clearCart();
      setStep('success');
      window.scrollTo(0, 0);
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-50 px-4 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-brand-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Harvest Secured!</h1>
          <p className="text-slate-600 mb-6">
            Thank you, {formData.name}. Your freshly milled blend order has been confirmed.
            {isAuthenticated ? ' You can track this in your profile.' : ' A confirmation email has been sent.'}
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-8 text-sm text-slate-500 border border-slate-200">
            Order ID: <span className="font-mono font-bold text-slate-700">#AHC-{Date.now().toString().slice(-6)}</span>
          </div>
          <div className="space-y-3">
             {isAuthenticated ? (
               <Link to="/profile" className="block w-full bg-brand-800 text-white py-3 rounded-lg font-medium hover:bg-brand-900 transition-colors">
                 View Order History
               </Link>
             ) : (
               <Link to="/signup" className="block w-full bg-brand-100 text-brand-800 py-3 rounded-lg font-medium hover:bg-brand-200 transition-colors">
                 Create Account to Track Order
               </Link>
             )}
             <Link to="/" className="block w-full text-slate-500 hover:text-brand-700 py-2 text-sm">
               Return Home
             </Link>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
         <Loader2 className="w-16 h-16 text-brand-600 animate-spin mb-6" />
         <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Processing Payment...</h2>
         <p className="text-slate-500">Please do not refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
           <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-brand-800 font-bold' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-brand-800 text-white' : 'bg-green-100 text-green-600'}`}>1</div>
                <span>Details</span>
              </div>
              <div className="w-12 h-px bg-slate-300"></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-brand-800 font-bold' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-brand-800 text-white' : 'bg-slate-200'}`}>2</div>
                <span>Payment</span>
              </div>
           </div>
        </div>

        {!isAuthenticated && step === 'details' && (
          <div className="bg-brand-100 border border-brand-200 rounded-xl p-4 mb-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="bg-white p-2 rounded-full"><LogIn className="w-5 h-5 text-brand-700"/></div>
               <div className="text-brand-900 text-sm">
                 <span className="font-bold">Have an account?</span> Log in to save this order to your history.
               </div>
             </div>
             <Link to="/login" className="px-4 py-2 bg-white text-brand-800 text-sm font-bold rounded-lg hover:bg-brand-50 shadow-sm">
               Log In
             </Link>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {step === 'details' ? (
            <form onSubmit={handleDetailsSubmit} className="p-8">
              <h1 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-2">
                <Home className="w-6 h-6 text-brand-600" /> Shipping Details
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="+91 98765 43210" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="123 Wellness St"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                  <select required name="state" value={formData.state} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                  <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                 <div className="text-slate-500 text-sm">
                   Total: <span className="font-bold text-slate-900 text-lg">₹{cartTotal}</span>
                 </div>
                 <button type="submit" className="bg-brand-800 hover:bg-brand-900 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md">
                   Continue to Payment
                 </button>
              </div>
            </form>
          ) : (
            <div className="p-8">
               <button onClick={() => setStep('details')} className="text-sm text-slate-500 hover:text-brand-700 mb-6 flex items-center gap-1">
                 ← Back to Details
               </button>

               <h1 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-brand-600" /> Secure Payment
               </h1>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Payment Options */}
                  <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`} onClick={() => setPaymentMethod('card')}>
                     <div className="flex items-center justify-between mb-4">
                        <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-brand-700' : 'text-slate-400'}`}/>
                        {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                     </div>
                     <h3 className="font-bold text-slate-900">Credit / Debit Card</h3>
                     <p className="text-xs text-slate-500 mt-1">Visa, Mastercard, RuPay</p>
                  </div>

                  <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`} onClick={() => setPaymentMethod('upi')}>
                     <div className="flex items-center justify-between mb-4">
                        <Smartphone className={`w-8 h-8 ${paymentMethod === 'upi' ? 'text-brand-700' : 'text-slate-400'}`}/>
                        {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                     </div>
                     <h3 className="font-bold text-slate-900">UPI / BHIM</h3>
                     <p className="text-xs text-slate-500 mt-1">GPay, PhonePe, Paytm</p>
                  </div>
               </div>

               {/* Mock Forms */}
               <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4 animate-fadeIn">
                       <input className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:outline-brand-500" placeholder="Card Number (4242 4242...)" />
                       <div className="grid grid-cols-2 gap-4">
                          <input className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:outline-brand-500" placeholder="MM / YY" />
                          <input className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:outline-brand-500" placeholder="CVV" type="password" />
                       </div>
                       <input className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:outline-brand-500" placeholder="Cardholder Name" />
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                       <p className="text-sm text-slate-600 mb-2">Enter your VPA / UPI ID</p>
                       <input className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:outline-brand-500" placeholder="username@upi" />
                       <button className="text-brand-700 text-sm font-bold">Verify VPA</button>
                    </div>
                  )}
               </div>

               <button onClick={handlePayment} className="w-full bg-brand-800 hover:bg-brand-900 text-white py-4 rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                 <Lock className="w-4 h-4" /> Pay ₹{cartTotal} Securely
               </button>
               <div className="text-center mt-4">
                 <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                   <Lock className="w-3 h-3" /> 256-bit SSL Encrypted Payment
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
