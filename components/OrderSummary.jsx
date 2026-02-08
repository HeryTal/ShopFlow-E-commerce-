import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState, useRef } from "react";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  
  const dropdownRef = useRef(null);
  const promoRef = useRef(null);

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
    if (addressDummyData.length > 0) {
      setSelectedAddress(addressDummyData[0]);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const applyPromoCode = () => {
    if (promoCode.trim() && !isPromoApplied) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPromoApplied(true);
        setIsAnimating(false);
      }, 500);
    }
  };

  const createOrder = async () => {
    // Order creation logic
  };

  // Calculate totals
  const subtotal = getCartAmount();
  const shippingFee = 0; // Free shipping
  const tax = Math.floor(subtotal * 0.02);
  const discount = isPromoApplied ? Math.floor(subtotal * 0.1) : 0; // 10% discount
  const total = subtotal + tax + shippingFee - discount;

  useEffect(() => {
    fetchUserAddresses();
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full md:w-96 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Order Summary
          </h2>
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Secure Checkout
          </div>
        </div>
        <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
      </div>

      {/* Address Selection */}
      <div className="mb-8" ref={dropdownRef}>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Delivery Address
          </label>
          <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">
            Required
          </span>
        </div>
        
        <div className="relative">
          <button
            className={`w-full text-left p-4 bg-white rounded-xl border-2 transition-all duration-300 ${
              isDropdownOpen 
                ? 'border-blue-500 ring-2 ring-blue-500/20' 
                : 'border-slate-200 hover:border-blue-400'
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {selectedAddress ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <p className="font-semibold text-slate-900">{selectedAddress.fullName}</p>
                      {selectedAddress.isDefault && (
                        <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state}
                    </p>
                    <p className="text-xs text-blue-600 font-medium mt-2">
                      {selectedAddress.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500">Select delivery address</p>
                )}
              </div>
              <svg 
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          <div 
            className={`absolute w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden transition-all duration-300 transform origin-top ${
              isDropdownOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="max-h-64 overflow-y-auto">
              {userAddresses.map((address, index) => (
                <div
                  key={index}
                  className={`p-4 border-b border-slate-100 hover:bg-blue-50/50 cursor-pointer transition-colors ${
                    selectedAddress?.id === address.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                      selectedAddress?.id === address.id 
                        ? 'border-blue-600 bg-blue-600' 
                        : 'border-slate-300'
                    }`}>
                      {selectedAddress?.id === address.id && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-slate-900 truncate">{address.fullName}</p>
                        {address.isDefault && (
                          <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 truncate">
                        {address.area}, {address.city}, {address.state}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{address.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div
              onClick={() => router.push("/add-address")}
              className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 cursor-pointer transition-all group border-t border-slate-200"
            >
              <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Address
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-8" ref={promoRef}>
        <label className="text-sm font-semibold uppercase tracking-wider text-slate-700 block mb-4">
          Promo Code
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
            />
            {isPromoApplied && (
              <div className="absolute -top-2 right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                Applied!
              </div>
            )}
          </div>
          
          <button
            onClick={applyPromoCode}
            disabled={!promoCode.trim() || isPromoApplied}
            className={`relative px-6 py-3 font-medium rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isPromoApplied
                ? 'bg-emerald-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <span className={`relative z-10 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {isPromoApplied ? 'Applied' : 'Apply'}
            </span>
            
            {/* Loading Animation */}
            {isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
          </button>
        </div>
        
        {/* Success Message */}
        {isPromoApplied && (
          <div className="mt-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl animate-fadeIn">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-emerald-800">
                10% discount applied! You saved {currency}{discount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="space-y-5 border-t border-slate-200 pt-8">
        <div className="flex justify-between items-center group hover:bg-blue-50/50 p-2 rounded-lg transition-colors">
          <div>
            <p className="text-slate-700 font-medium">Subtotal</p>
            <p className="text-sm text-slate-500">{getCartCount()} items</p>
          </div>
          <p className="text-lg font-semibold text-slate-900">{currency}{subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center group hover:bg-blue-50/50 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <p className="text-slate-700">Shipping</p>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-semibold">Free</span>
            <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              Standard
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center group hover:bg-blue-50/50 p-2 rounded-lg transition-colors">
          <p className="text-slate-700">Tax (2%)</p>
          <p className="font-medium text-slate-900">{currency}{tax.toFixed(2)}</p>
        </div>

        {/* Discount Row */}
        {isPromoApplied && (
          <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-200 animate-slideIn">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-emerald-700 font-medium">Promo Discount</p>
                <p className="text-xs text-emerald-600">CODE: {promoCode.toUpperCase()}</p>
              </div>
            </div>
            <p className="text-emerald-600 font-bold text-lg">-{currency}{discount.toFixed(2)}</p>
          </div>
        )}

        {/* Total Amount */}
        <div className="border-t border-slate-300 pt-6 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-slate-900">Total Amount</p>
              <p className="text-sm text-slate-500">Including all charges</p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {currency}{total.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 mt-1">VAT included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={createOrder}
        disabled={!selectedAddress}
        className="group relative w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-lg">Place Order</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        
        {/* Ripple Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Secure Payment Note */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-3">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Secure SSL encryption & 100% Safe checkout</span>
        </div>
        
        {/* Payment Methods */}
        <div className="flex justify-center gap-4">
          {['VISA', 'MC', 'PP', 'AMEX'].map((method) => (
            <div 
              key={method}
              className="w-10 h-6 bg-gradient-to-br from-slate-100 to-white border border-slate-300 rounded flex items-center justify-center text-xs font-bold text-slate-700 hover:scale-110 transition-transform"
            >
              {method}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;