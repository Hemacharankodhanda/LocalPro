import React, { useState } from 'react';
import { X, User, Phone, MapPin, AlignLeft } from 'lucide-react';

export default function ServiceRequestModal({ isOpen, serviceType, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({ name: '', phone: '', description: '', address: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-lg animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Service Request</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary rounded-full font-medium text-sm">
            {serviceType}
          </div>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed">
            Fill out the form below to request service. We'll match you with the best professionals in your area.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
                className="form-input pl-10" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone size={18} />
              </div>
              <input 
                type="tel" 
                name="phone"
                required 
                value={formData.phone}
                onChange={handleChange}
                className="form-input pl-10" 
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Describe Your Problem</label>
            <div className="relative">
              <div className="absolute top-3.5 left-0 pl-3 pointer-events-none text-slate-400">
                <AlignLeft size={18} />
              </div>
              <textarea 
                name="description"
                required 
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="form-input pl-10 py-3" 
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <input 
                type="text" 
                name="address"
                required 
                value={formData.address}
                onChange={handleChange}
                className="form-input pl-10" 
                placeholder="Enter your full address"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose} className="btn btn-outline flex-1 py-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1 py-3">
              Find Pros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
