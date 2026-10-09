import React from 'react';
import { Wrench, Brush, Hammer, Zap, PaintRoller, Car, Dog, MoreHorizontal, SearchX } from 'lucide-react';

const CATEGORIES = [
  { id: 'plumber', name: 'Plumber', desc: 'Fix leaks, install fixtures, and more', icon: Wrench },
  { id: 'cleaner', name: 'Cleaner', desc: 'Home, office, and deep cleaning services', icon: Brush },
  { id: 'carpenter', name: 'Carpenter', desc: 'Furniture, cabinets, and woodwork', icon: Hammer },
  { id: 'electrician', name: 'Electrician', desc: 'Wiring, repairs, and installations', icon: Zap },
  { id: 'painter', name: 'Painter', desc: 'Interior and exterior painting', icon: PaintRoller },
  { id: 'driver', name: 'One Day Drivers', desc: 'Reliable driving for your needs', icon: Car },
  { id: 'pet', name: 'Pet Care', desc: 'Pet sitting, walking, and grooming', icon: Dog },
  { id: 'other', name: 'And More', desc: 'Many other professional services', icon: MoreHorizontal },
];

export default function Categories({ searchTerm, onCategorySelect }) {
  const filteredCategories = CATEGORIES.filter(cat => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return cat.name.toLowerCase().includes(term) || cat.desc.toLowerCase().includes(term);
  });

  return (
    <section id="categories" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {searchTerm ? (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
              Search Results for "<span className="text-primary">{searchTerm}</span>"
            </h2>
          </div>
        ) : (
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 inline-block relative">
              Popular Categories
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-primary to-emerald-400 rounded-full"></div>
            </h2>
          </div>
        )}

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={cat.id}
                  onClick={() => onCategorySelect(cat.name)}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col gap-6 hover:-translate-y-2 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative z-10 shadow-sm">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl max-w-2xl mx-auto border border-slate-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <SearchX size={40} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-800 mb-3">No services found</h3>
            <p className="text-slate-500">We couldn't find any services matching your search. Try searching for something else.</p>
          </div>
        )}
      </div>
    </section>
  );
}
