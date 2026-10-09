import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Clock, ShieldCheck, MessageSquare, Star, CheckCircle } from 'lucide-react';

export default function ManageJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useOutletContext();

  // Mock Job Data
  const job = {
    id,
    title: 'Fix leaking bathroom sink',
    status: 'bidding', // bidding, active, completed
    postedAt: '2 hours ago',
  };

  // Mock Bids
  const bids = [
    { id: 'b1', proName: 'Mike T.', rating: 4.9, reviews: 42, price: 90, eta: 'Today', message: 'I can swing by this afternoon. I carry spare P-traps in my truck.', avatar: 'M' },
    { id: 'b2', proName: 'John Plumbing Co.', rating: 4.7, reviews: 128, price: 120, eta: 'Tomorrow morning', message: 'Licensed plumber here. Can fix it properly with warranty.', avatar: 'J' },
  ];

  if (profile?.role !== 'client') {
    return (
      <div className="p-8 text-center">
        <h2>Only Clients can manage their posted jobs.</h2>
        <button onClick={() => navigate('/app')} className="btn btn-primary mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
              Receiving Bids
            </span>
            <span className="text-sm text-slate-500">Posted {job.postedAt}</span>
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900">{job.title}</h1>
        </div>
        <button className="btn btn-outline border-slate-200 text-sm">Edit Job</button>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-6">Review Proposals ({bids.length})</h2>

      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-light/50 text-primary flex items-center justify-center font-bold text-lg">
                    {bid.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-1">
                      {bid.proName} <ShieldCheck size={16} className="text-emerald-500" />
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 gap-1 mt-0.5">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{bid.rating}</span>
                      <span>({bid.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-slate-900">${bid.price}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1 justify-end mt-1"><Clock size={14}/> {bid.eta}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 text-sm text-slate-700">
                <span className="font-bold block mb-1">Message:</span>
                "{bid.message}"
              </div>
            </div>

            <div className="flex md:flex-col justify-end gap-3 md:w-40 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <button className="btn btn-outline border-slate-200 w-full flex-1 md:flex-none flex justify-center items-center gap-2">
                <MessageSquare size={16} /> Chat
              </button>
              <button 
                onClick={() => navigate(`/app/contract/${job.id}`)} 
                className="btn btn-primary w-full flex-1 md:flex-none flex justify-center items-center gap-2"
              >
                <CheckCircle size={16} /> Accept & Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
