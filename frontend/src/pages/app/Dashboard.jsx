import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, DollarSign, Search, Clock, FileText } from 'lucide-react';

export default function Dashboard() {
  const { profile, user } = useOutletContext();
  const navigate = useNavigate();
  const isPro = profile?.role === 'pro';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Welcome back, {profile?.displayName || user.user_metadata?.display_name || user.email.split('@')[0]}!
          </h1>
          <p className="text-slate-500 mt-2">Here's what's happening with your account today.</p>
        </div>
        {isPro ? (
          <button onClick={() => navigate('/app/find-jobs')} className="btn btn-primary shadow-md shadow-primary/20">Find New Jobs</button>
        ) : (
          <button onClick={() => navigate('/app/post-job')} className="btn btn-primary shadow-md shadow-primary/20">Post a New Job</button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-primary-light transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            {isPro ? <Briefcase size={28} /> : <FileText size={28} />}
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">{isPro ? 'Active Contracts' : 'Active Jobs'}</p>
            <h3 className="text-3xl font-extrabold text-slate-900">0</h3>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-amber-100 transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            {isPro ? <Search size={28} /> : <Clock size={28} />}
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">{isPro ? 'Open Opportunities' : 'Pending Requests'}</p>
            <h3 className="text-3xl font-extrabold text-slate-900">0</h3>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-emerald-100 transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            {isPro ? <DollarSign size={28} /> : <Calendar size={28} />}
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">{isPro ? 'This Month Earnings' : 'Completed Jobs'}</p>
            <h3 className="text-3xl font-extrabold text-slate-900">{isPro ? '$0.00' : '0'}</h3>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-lg">{isPro ? 'Active Contracts' : 'Your Posted Jobs'}</h3>
              <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {!isPro ? (
                // Client View - Mock Posted Job
                <div 
                  onClick={() => navigate('/app/manage-job/1')} 
                  className="p-6 hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Fix leaking bathroom sink</h4>
                    <p className="text-sm text-slate-500">Posted 2 hours ago • Plumbing</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                      2 Bids Received
                    </span>
                    <p className="text-sm text-primary font-bold mt-2">Review Bids →</p>
                  </div>
                </div>
              ) : (
                // Pro View - Mock Active Contract
                <div 
                  onClick={() => navigate('/app/contract/1')} 
                  className="p-6 hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Fix leaking bathroom sink</h4>
                    <p className="text-sm text-slate-500">Client: Sarah M. • Downtown</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      In Progress
                    </span>
                    <p className="text-sm text-primary font-bold mt-2">Open Workspace →</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-lg">Unread Messages</h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-slate-500 text-sm">No new messages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
