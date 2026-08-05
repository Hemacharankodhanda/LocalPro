import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { signOut } from '../lib/firebase';

export default function Header({ user, onLoginClick, onSignupClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="logo flex items-center gap-3 font-heading font-extrabold text-2xl text-slate-800 tracking-tight">
          <div className="bg-primary-light p-2.5 rounded-xl text-primary">
            <Zap size={24} className="fill-current" />
          </div>
          LOCALPRO
        </div>

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

        <div className="hidden md:flex gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                  {(user.displayName || user.email.split('@')[0]).charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-slate-700 hidden lg:block">
                  Hi, {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline text-sm px-4 py-2">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={onLoginClick} className="btn btn-outline text-sm px-5 py-2">Login</button>
              <button onClick={onSignupClick} className="btn btn-primary text-sm px-5 py-2">Sign Up</button>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">How it Works</a>
          <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">Categories</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 border-b border-slate-50">Reviews</a>
          
          <div className="flex flex-col gap-3 mt-2">
            {user ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-outline w-full justify-center">Logout</button>
            ) : (
              <>
                <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="btn btn-outline w-full justify-center">Login</button>
                <button onClick={() => { onSignupClick(); setMobileMenuOpen(false); }} className="btn btn-primary w-full justify-center">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
