import React from 'react';
import { ClipboardList, UserCheck, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Post a Task",
      desc: "Describe the task you need done, set your budget, and location preferences.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: UserCheck,
      title: "Get Matched",
      desc: "Receive quotes from qualified freelancers in your area and choose the best fit.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: ShieldCheck,
      title: "Pay Securely",
      desc: "Pay safely through our platform only when the task is completed to your satisfaction.",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-50/60 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 inline-block relative">
            How It Works
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-primary to-emerald-400 rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-indigo-200 via-emerald-200 to-indigo-200 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 text-center group">
                <div className="mx-auto w-24 h-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 rotate-3 group-hover:-rotate-3 transition-transform duration-500 border border-slate-100 relative">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <Icon size={40} className={`text-slate-800`} strokeWidth={1.5} />
                  
                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white font-bold flex items-center justify-center text-sm shadow-lg border-2 border-white`}>
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
