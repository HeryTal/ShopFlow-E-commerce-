import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl my-12 p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Image */}
        <div className="md:w-1/3">
          <div className="group relative bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 to-blue-900/0 group-hover:from-blue-900/5 group-hover:to-blue-900/10 rounded-lg transition-all duration-300"></div>
            <Image
              className="w-full max-w-48 mx-auto transform group-hover:scale-105 transition-transform duration-300"
              src={assets.jbl_soundbox_image}
              alt="JBL Soundbox"
              width={192}
              height={192}
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Premium Sound
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="md:w-1/3 text-center space-y-4">
          <div className="relative inline-block">
            <div className="bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-800 transition-colors duration-300 cursor-default">
              NEW ARRIVAL
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group">
            Level Up Your
            <br />
            <span className="text-blue-900 relative inline-block">
              Gaming Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-500"></span>
            </span>
          </h2>
          
          <p className="text-slate-600 hover:text-slate-800 transition-colors duration-300">
            Everything you need to win
          </p>

          <button className="group flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 mx-auto">
            <span className="font-medium">Buy Now</span>
            <div className="relative w-4 h-4">
              <Image
                className="transform group-hover:translate-x-1 transition-transform duration-300"
                src={assets.arrow_icon_white}
                alt="arrow"
                width={16}
                height={16}
              />
            </div>
            <div className="absolute inset-0 bg-blue-900 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/3">
          <div className="group relative bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/0 to-blue-900/0 group-hover:from-blue-900/5 group-hover:to-blue-900/10 rounded-lg transition-all duration-300"></div>
            <Image
              className="w-full max-w-48 mx-auto transform group-hover:scale-105 transition-transform duration-300"
              src={assets.md_controller_image}
              alt="Gaming Controller"
              width={192}
              height={192}
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ergonomic Design
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Only - Small Controller */}
      <div className="mt-8 md:hidden">
        <div className="group relative bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300">
          <Image
            className="w-full max-w-40 mx-auto transform group-hover:scale-105 transition-transform duration-300"
            src={assets.sm_controller_image}
            alt="Controller"
            width={160}
            height={160}
          />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Wireless
          </div>
        </div>
      </div>

      {/* Features Bar - Hidden on mobile */}
      <div className="hidden md:flex justify-center gap-8 mt-8 pt-6 border-t border-blue-100">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-2 h-2 bg-blue-900 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          <span className="text-slate-700 group-hover:text-blue-900 transition-colors duration-300">
            High Quality Audio
          </span>
        </div>
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-2 h-2 bg-blue-900 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          <span className="text-slate-700 group-hover:text-blue-900 transition-colors duration-300">
            Long Battery Life
          </span>
        </div>
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-2 h-2 bg-blue-900 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          <span className="text-slate-700 group-hover:text-blue-900 transition-colors duration-300">
            Wireless Connectivity
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;