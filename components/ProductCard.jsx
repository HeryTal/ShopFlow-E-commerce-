import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Heart, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const ProductCard = ({ product }) => {
    const { currency, router, addToCart } = useAppContext();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const productImages = Array.isArray(product?.images)
        ? product.images
        : Array.isArray(product?.image)
            ? product.image
            : [];
    const primaryImage = productImages[0] || assets.upload_area;
    const basePrice = Number(product?.originalPrice ?? product?.price ?? 0);
    const offerPrice = Number(product?.offerPrice ?? 0);

    const rating = 4.5;
    const discountPercentage = basePrice > 0
        ? Math.round(((basePrice - offerPrice) / basePrice) * 100)
        : 0;

    return (
        <Card
            role="link"
            tabIndex={0}
            aria-label={`View ${product.name}`}
            onClick={() => {
                router.push('/product/' + product._id);
                window.scrollTo(0, 0);
            }}
            onKeyDown={(event) => { if (event.key === "Enter") router.push('/product/' + product._id); }}
            className="group relative w-full cursor-pointer overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-raised"
        >
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <div className="absolute top-3 left-3 z-10 rounded-full bg-danger px-2 py-1 text-xs font-bold text-white">
                    -{discountPercentage}%
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                }}
                aria-label={isWishlisted ? "Remove from saved items" : "Save item"}
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card transition-transform hover:scale-105"
            >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-danger text-danger' : 'text-muted'}`} aria-hidden="true" />
            </button>

            {/* Product Image */}
            <div className="relative h-56 overflow-hidden bg-canvas">
                <Image
                    src={primaryImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    width={300}
                    height={300}
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {product.category || 'Electronics'}
                </div>

                {/* Name */}
                <h3 className="mb-2 line-clamp-1 font-semibold text-ink">
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
                        <span className="text-xl font-bold text-ink">
                            {currency}{offerPrice}
                        </span>
                        {basePrice > 0 && (
                            <span className="text-sm text-slate-400 line-through ml-2">
                                {currency}{basePrice}
                            </span>
                        )}
                    </div>
                    <Button
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product._id);
                        }}
                    >
                        <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ProductCard;
