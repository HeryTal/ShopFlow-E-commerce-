import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="relative py-20 px-4">
      {/* Floating Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex justify-center">
  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg animate-bounce whitespace-nowrap">
    20% OFF For Subscribers
  </div>
</div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200">
        
        {/* Content */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Don't Miss Out on Tech Deals
          </h3>
          
          <p className="text-slate-600 mb-8">
            Join thousands of tech enthusiasts who get exclusive access to deals and updates.
          </p>
        </div>

        {/* Form */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            
            <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-lg transition-all font-semibold">
              <span>Get Discount</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              No spam, unsubscribe anytime
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Exclusive member benefits
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Weekly tech insights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;