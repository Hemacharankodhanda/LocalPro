import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    text: "LOCALPRO helped me find a reliable plumber within hours. The platform is easy to use and the quality of service was exceptional!",
    author: "Jessica Davis",
    role: "Homeowner",
    avatar: "JD",
    color: "bg-blue-100 text-blue-600"
  },
  {
    text: "As a freelancer, this platform has given me the flexibility I need while connecting me with great clients. The payment system is secure and timely.",
    author: "Michael Rodriguez",
    role: "Freelance Electrician",
    avatar: "MR",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    text: "I needed furniture assembled quickly and found the perfect carpenter on LOCALPRO. The process was seamless from start to finish.",
    author: "Sarah Wilson",
    role: "Small Business Owner",
    avatar: "SW",
    color: "bg-emerald-100 text-emerald-600"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 inline-block relative">
            What Our Clients Say
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-primary to-emerald-400 rounded-full"></div>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-3xl relative">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div key={idx} className="w-full shrink-0 px-4 md:px-12 py-8">
                  <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-3xl relative">
                    <span className="absolute top-4 left-6 text-7xl font-heading text-slate-200/60 leading-none">"</span>
                    
                    <p className="text-xl md:text-2xl text-slate-700 italic relative z-10 leading-relaxed mb-10 text-center font-medium">
                      {t.text}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${t.color}`}>
                        {t.avatar}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 font-heading">{t.author}</h4>
                        <p className="text-sm text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
