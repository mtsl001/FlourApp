import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Package, User as UserIcon, LogOut, ShoppingBag } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

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
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
