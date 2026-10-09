import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, Briefcase, UserRound } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { saveUserProfile } from '../../lib/db';

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      // Save role and profile data to Supabase public table
      if (data.user) {
        await saveUserProfile(data.user.id, {
          email: email,
          displayName: name,
          role: role
        });
      }
      
      setSuccess(`Account created successfully for ${name}!`);
      setTimeout(() => {
        onClose();
        setSuccess('');
        setName('');
        setEmail('');
        setPassword('');
        setRole('client');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-heading text-slate-900">Join LOCALPRO</h2>
          <p className="text-slate-500 mt-2">Create your account to get started</p>
        </div>

        {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
        {success && <div className="mb-6 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm border border-emerald-100">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">I want to...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  role === 'client' 
                    ? 'border-primary bg-primary-light/30 text-primary shadow-sm shadow-primary/10' 
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <UserRound size={24} className={role === 'client' ? 'text-primary' : 'text-slate-400'} />
                <span className="font-semibold text-sm">Hire a Pro</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('pro')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  role === 'pro' 
                    ? 'border-primary bg-primary-light/30 text-primary shadow-sm shadow-primary/10' 
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Briefcase size={24} className={role === 'pro' ? 'text-primary' : 'text-slate-400'} />
                <span className="font-semibold text-sm">Work as a Pro</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input pl-10" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10" 
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-10" 
                placeholder="••••••••"
                minLength="6"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full mt-6 py-3"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
