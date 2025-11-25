import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wheat } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Pass the actual password state, not a hardcoded string
      const success = login(email, password); 
      
      if (success) {
        // Check if it's the admin account to redirect properly
        if (email === 'admin@ancientharvest.co' && password === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-brand-100">
        <div className="text-center mb-8">
          <div className="inline-block bg-brand-900 p-3 rounded-full mb-4">
            <Wheat className="h-8 w-8 text-brand-100" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-brand-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to view your harvest history</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brand-800 hover:bg-brand-900 text-white py-3 rounded-lg font-bold transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Don't have an account? <Link to="/signup" className="text-brand-700 font-bold hover:underline">Create one</Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">Admin Demo Access:</p>
          <p className="text-xs font-mono text-slate-500 mt-1">admin@ancientharvest.co / admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;