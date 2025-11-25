import React from 'react';
import { useData } from '../../context/DataContext';

const Users: React.FC = () => {
  const { users } = useData();

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Registered Customers</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-center">
                   <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                     {user.orders.length}
                   </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs uppercase font-bold tracking-wide ${user.role === 'admin' ? 'text-purple-600' : 'text-slate-500'}`}>
                    {user.role || 'Customer'}
                  </span>
                </td>
              </tr>
            ))}
             {users.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-400">No registered users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
