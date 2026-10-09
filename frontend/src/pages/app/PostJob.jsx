import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Camera, MapPin, DollarSign, Clock, ChevronRight } from 'lucide-react';

export default function PostJob() {
  const { profile } = useOutletContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // If pro, they shouldn't be here (ideally hidden, but just in case)
  if (profile?.role === 'pro') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Pros cannot post jobs</h2>
        <p className="text-slate-500 mb-6">Switch to a client account to hire professionals.</p>
        <button onClick={() => navigate('/app')} className="btn btn-primary">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
          Post a New Job
        </h1>
        <p className="text-slate-500 mt-2">Describe what you need done to get accurate quotes.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Progress bar */}
        <div className="flex border-b border-slate-100">
          <div className={`flex-1 py-4 text-center text-sm font-bold border-b-2 ${step >= 1 ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}>1. Details</div>
          <div className={`flex-1 py-4 text-center text-sm font-bold border-b-2 ${step >= 2 ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}>2. Location</div>
          <div className={`flex-1 py-4 text-center text-sm font-bold border-b-2 ${step >= 3 ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}>3. Budget</div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">What do you need help with?</label>
                <input type="text" placeholder="e.g. Fix a leaking sink pipe" className="form-input text-lg py-3" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea rows="4" placeholder="Provide as much detail as possible..." className="form-input"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Photos (Optional)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Camera className="mx-auto text-slate-400 mb-2" size={32} />
                  <span className="text-slate-600 font-medium">Click to upload photos</span>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Where do you need this done?</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input type="text" placeholder="Enter your address" className="form-input pl-10 py-3" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">When do you need it done?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-slate-200 rounded-xl p-4 text-left hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
                    <span className="block font-bold text-slate-800">As soon as possible</span>
                    <span className="text-sm text-slate-500">Flexible timing</span>
                  </button>
                  <button className="border border-slate-200 rounded-xl p-4 text-left hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
                    <span className="block font-bold text-slate-800">Specific Date</span>
                    <span className="text-sm text-slate-500">Choose a day</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">What is your budget?</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input type="number" placeholder="Enter amount" className="form-input pl-10 py-3 text-lg" />
                </div>
                <p className="text-sm text-slate-500 mt-2">Pros will use this as a guideline for bidding.</p>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn btn-outline border-slate-200">Back</button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="btn btn-primary shadow-md flex items-center gap-2">
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button onClick={() => navigate('/app')} className="btn btn-primary shadow-md">
                Post Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
