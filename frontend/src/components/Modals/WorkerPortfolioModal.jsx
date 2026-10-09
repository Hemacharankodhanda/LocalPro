import React from 'react';
import { X, Phone, Star, CheckCircle, MapPin } from 'lucide-react';

export default function WorkerPortfolioModal({ isOpen, worker, onClose }) {
  if (!isOpen || !worker) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 p-0">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10 bg-white/50 backdrop-blur-sm">
          <X size={20} />
        </button>
        
        {/* Header Section */}
        <div className="bg-slate-50 p-8 rounded-t-2xl border-b border-slate-100 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl shadow-primary/10 flex items-center justify-center text-primary font-bold text-3xl font-heading shrink-0 border-4 border-white">
              {worker.avatar}
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
                {worker.name}
                <CheckCircle size={20} className="text-emerald-500" />
              </h2>
              <p className="text-slate-500 font-medium mt-1">{worker.profession} • {worker.experience} experience</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-sm font-medium text-slate-700">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  {worker.rating} Rating
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-sm font-medium text-slate-700">
                  <CheckCircle size={16} className="text-primary" />
                  {worker.jobs} Jobs Done
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-sm font-medium text-slate-700">
                  <MapPin size={16} className="text-slate-400" />
                  {worker.distance}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Gallery */}
          <div className="mb-10">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Portfolio Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {worker.images.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80`} 
                    alt="Work example" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Work+Sample`;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reviews */}
          <div className="mb-8">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {worker.reviews.map((review, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
                    <span className="font-bold text-slate-800 font-heading">{review.name}</span>
                    <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-white rounded-full border border-slate-100">{review.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 pt-6 mt-8 border-t border-slate-100">
            <button 
              onClick={() => window.open(`tel:${worker.phone}`, '_self')}
              className="flex-1 btn btn-primary py-3"
            >
              <Phone size={18} /> Call Now
            </button>
            <button 
              onClick={onClose}
              className="flex-1 btn btn-outline py-3"
            >
              Close Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
