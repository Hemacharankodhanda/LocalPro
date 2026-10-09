import React from 'react';
import { X, MapPin, Star, Phone, Eye } from 'lucide-react';
import { workersData } from '../../data/workers';

export default function WorkerSelectionModal({ isOpen, serviceType, onClose, onBack, onViewPortfolio }) {
  if (!isOpen) return null;

  const typeKey = serviceType ? serviceType.toLowerCase() : '';
  // Check if typeKey matches "plumber", etc. (Need exact map or find partial)
  const availableWorkers = Object.entries(workersData).find(([key, _]) => typeKey.includes(key) || key.includes(typeKey))?.[1] || [];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={14} className="fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      // In a real app we'd use a half-star icon, using full star with lower opacity here for simplicity
      stars.push(<Star key="half" size={14} className="fill-amber-400 text-amber-400 opacity-60" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-slate-300" />);
    }

    return stars;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Available Professionals Near You</h2>
          <p className="text-slate-500 text-sm">
            We've found these skilled professionals in your area. Contact them directly or view their portfolio.
          </p>
        </div>

        {availableWorkers.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500">No professionals found for this service in your area.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {availableWorkers.map(worker => (
              <div key={worker.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-xl font-heading shrink-0">
                    {worker.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-heading text-lg leading-tight">{worker.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{worker.profession} • {worker.experience}</p>
                    
                    <div className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium mt-2 border border-slate-100">
                      <MapPin size={12} className="text-primary" /> {worker.distance} away
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-0.5">
                        {renderStars(worker.rating)}
                      </div>
                      <span className="text-xs font-medium text-slate-600">{worker.rating} ({worker.jobs} jobs)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => window.open(`tel:${worker.phone}`, '_self')}
                    className="flex-1 btn btn-primary py-2 text-sm"
                  >
                    <Phone size={16} /> Call
                  </button>
                  <button 
                    onClick={() => onViewPortfolio(worker)}
                    className="flex-1 btn btn-outline py-2 text-sm"
                  >
                    <Eye size={16} /> Portfolio
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-slate-100">
          <button type="button" onClick={onBack} className="btn btn-outline py-2.5 px-6">
            Back to Form
          </button>
          <button type="button" onClick={onClose} className="btn btn-secondary py-2.5 px-6">
            Request Another Service
          </button>
        </div>
      </div>
    </div>
  );
}
