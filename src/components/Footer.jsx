import React from 'react';
import { Zap, Globe, MessageSquare, Share2, Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="logo flex items-center gap-3 font-heading font-extrabold text-2xl text-white tracking-tight mb-6">
              <div className="bg-primary p-2 rounded-xl text-white">
                <Zap size={24} className="fill-current" />
              </div>
              LOCALPRO
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Your trusted hyperlocal freelancing platform connecting skilled professionals with clients in their community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Share2 size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Link size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Become a Freelancer</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Safety Standards</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} LOCALPRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
