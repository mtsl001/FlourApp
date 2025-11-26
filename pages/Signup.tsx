import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wheat, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (email && password && name) {
      const { error } = await signup(email, password, name);
      
      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        // If Supabase is set to confirm emails, we show a message
        // Otherwise we can redirect. For now, we assume user might be auto-confirmed or needs to check email.
        // We'll show a "Success/Check Email" state.
        setNeedsConfirmation(true);
        setIsLoading(false);
      }
    }
  };

  if (needsConfirmation) {
    return (
      <div className="min-h-screen bg-brand-50 flex flex-col justify-center items-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-brand-100 text-center">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 className="w-8 h-8 text-green-600" />
           </div>
           <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Account Created!</h2>
           <p className="text-slate-600 mb-6">
             Please check your email inbox to confirm your account. Once verified, you can log in to The Ancient Harvest Co.
           </p>
           <Link to="/login" className="block w-full bg-brand-800 text-white py-3 rounded-lg font-bold">
             Proceed to Login
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-brand-100">
        <div className="text-center mb-8">
          <div className="inline-block bg-brand-900 p-3 rounded-full mb-4">
            <Wheat className="h-8 w-8 text-brand-100" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-brand-900">Join the Harvest</h1>
          <p className="text-slate-500 mt-2">Start your journey to pure nutrition</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="John Doe"
            />
          </div>
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
            <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters</p>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-800 hover:bg-brand-900 disabled:bg-brand-600 text-white py-3 rounded-lg font-bold transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-brand-700 font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;