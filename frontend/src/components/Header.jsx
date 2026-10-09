import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Header({ user, onLoginClick, onSignupClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="logo flex items-center gap-3 font-heading font-extrabold text-2xl text-slate-800 tracking-tight hover:text-primary transition-colors">
          <div className="bg-primary-light p-2.5 rounded-xl text-primary shadow-sm border border-white/50">
            <Zap size={24} className="fill-current" />
          </div>
          LOCALPRO
        </Link>

        {isLandingPage && (
          <nav className="hidden md:flex gap-8">
            <a href="#how-it-works" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative group">
              How it Works
              <span className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-1/2 group-hover:opacity-100 transition-all"></span>
            </a>
            <a href="#categories" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative group">
              Categories
              <span className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-1/2 group-hover:opacity-100 transition-all"></span>
            </a>
            <a href="#testimonials" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative group">
              Reviews
              <span className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-1/2 group-hover:opacity-100 transition-all"></span>
            </a>
          </nav>
        )}

        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-4">
              {isLandingPage && (
                <Link to="/app" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                  Go to Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 cursor-pointer bg-slate-50 py-1.5 px-3 rounded-full border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                  {(user.displayName || user.email.split('@')[0]).charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-slate-700 hidden lg:block text-sm">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-slate-600 hover:text-slate-900 font-medium text-sm px-2">Log in</button>
              <button onClick={onSignupClick} className="btn btn-primary text-sm px-6 py-2.5 shadow-md shadow-primary/20">Sign Up Free</button>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-800 p-2 bg-slate-50 rounded-lg border border-slate-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {isLandingPage && (
            <>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">How it Works</a>
              <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">Categories</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">Reviews</a>
            </>
          )}
          
          <div className="flex flex-col gap-3 mt-4">
            {user ? (
              <>
                {isLandingPage && (
                  <Link to="/app" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full justify-center">Go to Dashboard</Link>
                )}
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-outline w-full justify-center">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="btn btn-outline w-full justify-center">Log in</button>
                <button onClick={() => { onSignupClick(); setMobileMenuOpen(false); }} className="btn btn-primary w-full justify-center">Sign Up Free</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
