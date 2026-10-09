import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-indigo-400 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto text-center relative z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/50 border border-primary-light text-primary font-medium text-sm mb-8 animate-slide-up">
          <ShieldCheck size={16} />
          <span>Verified Professionals in Your Neighborhood</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-slate-900 leading-[1.1] mb-8 tracking-tight animate-slide-up delay-100">
          Find Trusted Freelancers <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
              In Your Area
            </span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-primary-light/40 -z-10 -rotate-1"></span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
          Connect instantly with skilled professionals for any task. 
          From home repairs to specialized consulting, all vetted and ready to work.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group animate-slide-up delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-full blur opacity-20 group-focus-within:opacity-40 transition duration-700"></div>
          <div className="relative flex flex-col sm:flex-row items-center bg-white/90 backdrop-blur-xl p-2 rounded-3xl sm:rounded-full shadow-2xl border border-white transition-all duration-300 group-focus-within:bg-white">
            
            <div className="flex items-center flex-1 w-full sm:w-auto px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What service do you need?" 
                className="w-full bg-transparent border-none py-3 text-slate-800 text-lg focus:outline-none placeholder:text-slate-400 font-sans"
              />
            </div>

            <div className="flex items-center flex-1 w-full sm:w-auto px-4 py-2">
              <MapPin className="text-slate-400 mr-3" size={24} />
              <input 
                type="text" 
                placeholder="Your location" 
                className="w-full bg-transparent border-none py-3 text-slate-800 text-lg focus:outline-none placeholder:text-slate-400 font-sans"
              />
            </div>

            <button type="submit" className="w-full sm:w-auto mt-2 sm:mt-0 btn btn-primary px-8 py-4 rounded-2xl sm:rounded-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
              Search
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-slate-500 text-sm font-medium animate-slide-up delay-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span><span className="font-bold text-slate-700">10k+</span> users</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-amber-400 fill-amber-400" size={20} />
            <span><span className="font-bold text-slate-700">4.9/5</span> average rating</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={20} />
            <span><span className="font-bold text-slate-700">100%</span> verified pros</span>
          </div>
        </div>
      </div>
    </section>
  );
}
