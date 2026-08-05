import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden">
      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 leading-tight mb-6 tracking-tight">
          Find Trusted Freelancers <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
            Near You
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your trusted hyperlocal freelancing platform. Connect with skilled professionals for any task, right in your neighborhood.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-400 rounded-full blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-white p-2 rounded-full shadow-xl border border-slate-100 transition-transform duration-300 group-focus-within:-translate-y-1">
            <div className="pl-6 text-slate-400">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What service do you need? (e.g., Plumber, Cleaner)" 
              className="flex-1 bg-transparent border-none py-4 px-4 text-slate-800 text-lg focus:outline-none placeholder:text-slate-400 font-sans"
            />
            <button type="submit" className="btn btn-primary px-8 py-4 rounded-full text-base font-semibold hidden sm:block">
              Search Services
            </button>
            <button type="submit" className="btn btn-primary p-4 rounded-full text-base font-semibold sm:hidden">
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
