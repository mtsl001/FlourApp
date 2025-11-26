import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Package, User as UserIcon, LogOut, ShoppingBag, Settings, MapPin, Save, Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  
  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zip: user?.zip || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    try {
      await updateProfile(formData);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-brand-100 p-3 rounded-full text-brand-800">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">{user.name}</h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'orders' ? 'bg-brand-50 text-brand-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Package className="w-4 h-4" /> Order History
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-brand-50 text-brand-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Settings className="w-4 h-4" /> Account Settings
                </button>
              </div>

              <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-medium border-t border-slate-100 mt-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === 'orders' ? (
              <>
                <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Order History</h1>
                {user.orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-100 text-center">
                    <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                    <p className="text-slate-500 mb-6">Once you place an order, you'll see the details here.</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-2 rounded-lg hover:bg-brand-800 transition-colors">
                      <ShoppingBag className="w-4 h-4" /> Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider block">Order Placed</span>
                            <span className="text-sm font-medium text-slate-900">{order.date}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider block">Total</span>
                            <span className="text-sm font-medium text-slate-900">₹{order.total}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider block">Ship To</span>
                            <span className="text-sm font-medium text-slate-900 truncate max-w-[150px]">{order.shippingAddress}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Order # {order.id}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-4">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex items-center gap-4">
                                <img 
                                  src={item.image.replace('&w=600', '&w=100')} 
                                  alt={item.name} 
                                  className="w-16 h-16 object-cover rounded-md border border-slate-100"
                                />
                                <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                                  <p className="text-xs text-brand-600">{item.segment}</p>
                                </div>
                                <div className="text-sm text-slate-600">
                                  Qty: {item.quantity}
                                </div>
                                <div className="text-sm font-medium text-slate-900">
                                  ₹{item.price * item.quantity}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Account Settings</h1>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                  <form onSubmit={handleSaveProfile}>
                    <div className="mb-6 pb-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                         <UserIcon className="w-5 h-5 text-brand-600"/> Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                          <input 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                          <input 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            placeholder="+91"
                            className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                         <MapPin className="w-5 h-5 text-brand-600"/> Shipping Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="col-span-1 md:col-span-2">
                           <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                           <textarea 
                             name="address" 
                             rows={2} 
                             value={formData.address} 
                             onChange={handleInputChange} 
                             className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" 
                             placeholder="Apartment, Street Name"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                           <input 
                             name="city" 
                             value={formData.city} 
                             onChange={handleInputChange} 
                             className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" 
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                           <select 
                             name="state" 
                             value={formData.state} 
                             onChange={handleInputChange} 
                             className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                           >
                             <option value="">Select State</option>
                             {indianStates.map(state => (
                               <option key={state} value={state}>{state}</option>
                             ))}
                           </select>
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">ZIP / Postal Code</label>
                           <input 
                             name="zip" 
                             value={formData.zip} 
                             onChange={handleInputChange} 
                             className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" 
                           />
                         </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button 
                        type="submit" 
                        disabled={isSaving}
                        className="bg-brand-800 hover:bg-brand-900 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md flex items-center gap-2 disabled:bg-brand-400"
                      >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5"/> Save Changes</>}
                      </button>
                      {saveMessage && (
                        <span className={`text-sm font-medium ${saveMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                          {saveMessage}
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;