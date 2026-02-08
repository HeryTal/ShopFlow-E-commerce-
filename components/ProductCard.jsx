import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const rating = 4.5;
    const discountPercentage = product.originalPrice 
        ? Math.round(((product.originalPrice - product.offerPrice) / product.originalPrice) * 100)
        : 0;

    return (
        <div
            onClick={() => {
                router.push('/product/' + product._id);
                window.scrollTo(0, 0);
            }}
            className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full"
        >
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                }}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
                <svg 
                    className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-500'}`}
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            {/* Product Image */}
            <div className="relative h-56 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    width={300}
                    height={300}
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                <div className="text-xs text-blue-600 font-medium mb-2">
                    {product.category || 'Electronics'}
                </div>

                {/* Name */}
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-slate-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-slate-600">4.5</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-blue-900">
                            {currency}{product.offerPrice}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through ml-2">
                                {currency}{product.originalPrice}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic
                        }}
                        className="px-3 py-1.5 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;