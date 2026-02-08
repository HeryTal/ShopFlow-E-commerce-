import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Premium Headphones",
    description: "Experience crystal-clear audio with noise cancellation.",
    price: "$199.99"
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Wireless Earphones",
    description: "Compact and stylish for every occasion.",
    price: "$89.99"
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "High-Performance Laptops",
    description: "Perfect for work, gaming, and creativity.",
    price: "$1,299.99"
  },
];

const FeaturedProduct = () => {
  return (
    <div className="py-14 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            <span className="text-blue-900">Featured</span> Products
          </h2>
          <div className="w-16 h-1 bg-blue-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64 md:h-72">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {product.title}
                  </h3>
                  <span className="text-lg font-bold text-blue-900">{product.price}</span>
                </div>
                
                <p className="text-slate-600 mb-6 text-sm md:text-base">
                  {product.description}
                </p>

                <button className="group/btn w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-all duration-300">
                  <span>Add to Cart</span>
                  <div className="w-4 h-4">
                    <Image
                      className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      src={assets.redirect_icon}
                      alt="cart"
                      width={16}
                      height={16}
                    />
                  </div>
                </button>
              </div>

              {/* Rating */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">4.8 (120 reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-800 transition-colors">
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;