import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Messages() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
        <MessageSquare size={40} />
      </div>
      <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Your Inbox is Empty</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        When you connect with clients or pros, your conversations will appear here.
      </p>
    </div>
  );
}
