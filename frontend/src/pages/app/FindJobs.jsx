import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, DollarSign, Filter } from 'lucide-react';

export default function FindJobs() {
  const { profile } = useOutletContext();
  const navigate = useNavigate();

  const dummyJobs = [
    { id: 1, title: 'Fix leaking bathroom sink', location: 'Downtown (2.4 miles)', price: '$80 - $120', posted: '2 hours ago', category: 'Plumbing' },
    { id: 2, title: 'Mount 65" TV on drywall', location: 'Westside (4.1 miles)', price: '$60', posted: '4 hours ago', category: 'Handyman' },
    { id: 3, title: 'Deep clean 2-bedroom apartment', location: 'North Hills (1.2 miles)', price: '$150', posted: '1 day ago', category: 'Cleaning' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Find Jobs
          </h1>
          <p className="text-slate-500 mt-2">Browse opportunities in your service area.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input type="text" placeholder="Search by keywords..." className="form-input pl-10 border-slate-100 bg-slate-50" />
        </div>
        <button className="btn btn-outline border-slate-200 flex items-center gap-2">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="space-y-4">
        {dummyJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary-light hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                  {job.category}
                </span>
                <span className="flex items-center text-xs text-slate-500 gap-1">
                  <Clock size={12} /> {job.posted}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
              <div className="flex flex-wrap items-center text-sm text-slate-500 gap-4">
                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700"><DollarSign size={14} /> {job.price}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/app/job/${job.id}`)} 
              className="btn btn-primary sm:w-auto w-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
