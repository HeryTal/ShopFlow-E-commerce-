import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  const quickLinks = ["Home", "Shop", "Categories", "New Arrivals", "Deals"];
  const supportLinks = ["Contact Us", "FAQs", "Shipping", "Returns", "Warranty"];
  const companyLinks = ["About", "Careers", "Press", "Blog", "Partners"];
  
  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Image 
                className="w-36 filter drop-shadow-lg hover:scale-105 transition-transform duration-500" 
                src={assets.logo} 
                alt="TechWave Logo" 
                width={144}
                height={40}
              />
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg mb-10 max-w-md">
              Elevating your digital experience with premium electronics. 
              Where innovation meets exceptional design.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { name: "Twitter", icon: "𝕏" },
                { name: "Instagram", icon: "📸" },
                { name: "Discord", icon: "💬" },
                { name: "YouTube", icon: "▶️" }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="group relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-900/5 rounded-xl transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-6 pb-3 relative inline-block">
                Shop
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 to-blue-500"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="group flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-6 pb-3 relative inline-block">
                Support
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 to-blue-500"></span>
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="group flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-6 pb-3 relative inline-block">
                Company
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 to-blue-500"></span>
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="group flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter & Contact */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-white to-blue-50 border border-slate-200 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Stay Ahead of the Curve
                </h3>
                <p className="text-slate-600">
                  Subscribe to get exclusive tech updates and early access to new collections.
                </p>
              </div>
              
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold">
                    Subscribe
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Call Us</h4>
                <p className="text-slate-600">+1 (234) 567-8900</p>
              </div>
            </div>
          </div>

          <div className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Email</h4>
                <p className="text-slate-600">contact@techwave.com</p>
              </div>
            </div>
          </div>

          <div className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Hours</h4>
                <p className="text-slate-600">Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-600 text-sm">
                © {new Date().getFullYear()} TechWave. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm text-slate-600 hover:text-blue-900 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-900 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-900 transition-colors">Cookie Policy</a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-900 transition-colors">Accessibility</a>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Secure payments:</span>
              <div className="flex gap-2">
                {['💳', '🔐', '🏦', '🛡️'].map((icon, i) => (
                  <span 
                    key={i}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm hover:scale-110 transition-transform"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;