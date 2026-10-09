import React, { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Send, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useOutletContext();
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [eta, setEta] = useState('Today');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Job Data
  const job = {
    id,
    title: 'Fix leaking bathroom sink',
    description: 'The pipe under the master bathroom sink has been leaking since yesterday. It seems to be coming from the P-trap connection. I have bucket under it for now, but need someone to replace the pipe or fix the seal.',
    location: 'Downtown (2.4 miles away)',
    budget: '$80 - $120',
    postedBy: 'Sarah M.',
    postedAt: '2 hours ago',
    category: 'Plumbing',
    status: 'open'
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your bid has been submitted successfully!');
      navigate('/app/find-jobs');
    }, 1000);
  };

  if (profile?.role !== 'pro') {
    return (
      <div className="p-8 text-center">
        <h2>Only Pros can view job bidding details.</h2>
        <button onClick={() => navigate('/app')} className="btn btn-primary mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium transition-colors">
        <ArrowLeft size={18} /> Back to jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                {job.category}
              </span>
              <span className="flex items-center text-xs text-slate-500 gap-1">
                <Clock size={12} /> Posted {job.postedAt}
              </span>
            </div>
            
            <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-slate-700 gap-6 mb-8">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {job.location}</span>
              <span className="flex items-center gap-2"><DollarSign size={16} className="text-slate-400" /> Client Budget: <span className="font-bold">{job.budget}</span></span>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">{job.description}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">
              {job.postedBy.charAt(0)}
            </div>
            <div>
              <p className="text-sm text-slate-500">Posted by</p>
              <p className="font-bold text-slate-900 flex items-center gap-1">
                {job.postedBy} <ShieldCheck size={16} className="text-emerald-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Bidding Column */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light sticky top-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Submit a Proposal</h3>
            
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    required 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="form-input pl-9" 
                    placeholder="e.g. 100"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">LocalPro takes a 10% platform fee.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Estimated Time</label>
                <select 
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  className="form-input"
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>Within 3 days</option>
                  <option>Within a week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Message to Client</label>
                <textarea 
                  required
                  rows="4" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and explain why you're the best fit..." 
                  className="form-input"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Proposal</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
