import React from 'react';
import { useData } from '../../context/DataContext';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useData();

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Order Management</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  {order.id}
                  <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {order.date}
                  </span>
                </h3>
                <p className="text-sm text-slate-500 mt-1">Customer: {order.customerName || 'Guest'} ({order.customerEmail || 'No email'})</p>
                <p className="text-sm text-slate-500">Ship to: {order.shippingAddress}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-xl text-slate-900">₹{order.total}</p>
                  <p className="text-xs text-slate-400">{order.items.length} Items</p>
                </div>
                <select 
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                  className={`border rounded-lg px-3 py-2 text-sm font-bold ${
                    order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    'bg-yellow-50 border-yellow-200 text-yellow-800'
                  }`}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <ul className="divide-y divide-slate-200">
                {order.items.map(item => (
                   <li key={item.id} className="py-2 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-700">{item.quantity}x</span>
                        <span className="text-slate-900">{item.name}</span>
                      </div>
                      <span className="text-slate-600">₹{item.price * item.quantity}</span>
                   </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-slate-500">No orders to process yet.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
