import React, { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Send, CheckCircle, Clock, FileText } from 'lucide-react';

export default function ContractView() {
  const { id } = useParams();
  const { profile } = useOutletContext();
  const navigate = useNavigate();
  const isPro = profile?.role === 'pro';

  // State machine for contract progress
  const [contractStatus, setContractStatus] = useState('started'); // started -> pro_completed -> client_confirmed
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'pro', text: 'Hi! I am on my way to your location now.', time: '10:00 AM' },
    { id: 2, sender: 'client', text: 'Great, see you soon! Park in the driveway.', time: '10:02 AM' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setMessages([...messages, { 
      id: Date.now(), 
      sender: isPro ? 'pro' : 'client', 
      text: chatMessage, 
      time: 'Just now' 
    }]);
    setChatMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
              Active Contract
            </span>
            <span className="text-sm font-bold text-slate-500">ID: {id}</span>
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-900">Fix leaking bathroom sink</h1>
        </div>
        
        {/* Status Actions */}
        <div className="flex gap-3">
          {isPro && contractStatus === 'started' && (
            <button onClick={() => setContractStatus('pro_completed')} className="btn btn-primary flex items-center gap-2">
              <CheckCircle size={18} /> Mark Job Complete
            </button>
          )}
          
          {isPro && contractStatus === 'pro_completed' && (
            <div className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-bold text-sm border border-amber-200">
              Waiting for Client Approval...
            </div>
          )}

          {!isPro && contractStatus === 'pro_completed' && (
            <button onClick={() => { setContractStatus('client_confirmed'); alert('Payment released from Escrow!'); }} className="btn btn-primary flex items-center gap-2">
              <DollarSign size={18} /> Confirm & Release Payment
            </button>
          )}

          {contractStatus === 'client_confirmed' && (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm border border-emerald-200 flex items-center gap-2">
              <CheckCircle size={16} /> Job Complete & Paid
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Col: Details & Escrow */}
        <div className="space-y-6 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18} /> Contract Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">Agreed Price</span>
                <span className="font-bold text-slate-900">$90.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-slate-900 text-right max-w-[150px] truncate">Downtown</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">{isPro ? 'Client' : 'Pro'}</span>
                <span className="font-medium text-slate-900">{isPro ? 'Sarah M.' : 'Mike T.'}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={80} />
            </div>
            <h3 className="font-bold mb-1 relative z-10">Stripe Escrow</h3>
            <p className="text-slate-400 text-sm mb-4 relative z-10">Funds are secured.</p>
            <div className="text-3xl font-extrabold relative z-10">$90.00</div>
            <p className="text-xs text-slate-400 mt-2 relative z-10">
              {contractStatus === 'client_confirmed' ? 'Payment transferred to Pro.' : 'Payment held safely until job is confirmed.'}
            </p>
          </div>
        </div>

        {/* Right Col: Real-time Chat */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Job Chat
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Powered by Supabase Realtime</span>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
            {messages.map((msg) => {
              const isMe = (isPro && msg.sender === 'pro') || (!isPro && msg.sender === 'client');
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] ${
                    isMe 
                      ? 'bg-primary text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..." 
                className="form-input flex-1 bg-slate-50 border-slate-200"
              />
              <button type="submit" className="btn btn-primary px-4 shadow-sm shadow-primary/20">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
