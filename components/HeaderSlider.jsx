import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound",
      subtitle: "Your Perfect Headphones Awaits!",
      offer: "30% Off Limited Time",
      imgSrc: assets.header_headphone_image,
      color: "blue"
    },
    {
      id: 2,
      title: "Next-Level Gaming",
      subtitle: "Discover PlayStation 5 Today!",
      offer: "Few Units Left",
      imgSrc: assets.header_playstation_image,
      color: "purple"
    },
    {
      id: 3,
      title: "Power Meets Elegance",
      subtitle: "Apple MacBook Pro is Here",
      offer: "40% Off Exclusive",
      imgSrc: assets.header_macbook_image,
      color: "cyan"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue': return {
        bg: 'from-blue-50 to-white',
        text: 'text-blue-600',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700'
      };
      case 'purple': return {
        bg: 'from-purple-50 to-white',
        text: 'text-purple-600',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      };
      default: return {
        bg: 'from-cyan-50 to-white',
        text: 'text-cyan-600',
        border: 'border-cyan-200',
        button: 'bg-cyan-600 hover:bg-cyan-700'
      };
    }
  };

  const colors = getColorClasses(sliderData[currentSlide].color);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-200">
      <div className="relative h-[500px] md:h-[550px]">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderData.map((slide, index) => {
            const slideColors = getColorClasses(slide.color);
            return (
              <div key={slide.id} className="min-w-full">
                <div className={`h-full bg-gradient-to-br ${slideColors.bg} flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16`}>
                  
                  {/* Text Content */}
                  <div className="md:w-1/2 pt-10 md:pt-0">
                    <div className={`inline-block px-3 py-1 ${slideColors.border} border rounded-full mb-6`}>
                      <span className={`text-sm font-medium ${slideColors.text}`}>
                        {slide.offer}
                      </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                      {slide.title}
                      <br />
                      <span className={slideColors.text}>{slide.subtitle}</span>
                    </h1>
                    
                    <div className="flex gap-4 mt-8">
                      <button className={`px-8 py-3 ${slideColors.button} text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium`}>
                        Shop Now
                      </button>
                      <button className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors duration-300 font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <Image
                        className="w-full max-w-md object-contain transform hover:scale-105 transition-transform duration-500"
                        src={slide.imgSrc}
                        alt={slide.title}
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? `${colors.button.replace('bg-', 'bg-').replace('hover:bg-', '')} w-6` 
                : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;