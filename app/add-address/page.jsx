'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const AddAddress = () => {
    const { router } = useAppContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const [addressType, setAddressType] = useState("home");
    const [errors, setErrors] = useState({});

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
        landmark: '',
        addressType: 'home'
    });

    const validateForm = () => {
        const newErrors = {};
        
        if (!address.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!address.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (!/^\d{10}$/.test(address.phoneNumber)) newErrors.phoneNumber = "Enter a valid 10-digit phone number";
        
        if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";
        else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
        
        if (!address.area.trim()) newErrors.area = "Address is required";
        if (!address.city.trim()) newErrors.city = "City is required";
        if (!address.state.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // In real app: Save address to backend
            console.log('Address saved:', { ...address, isDefault, addressType });
            
            // Show success message and redirect
            router.push('/checkout'); // or back to cart/checkout
        }, 1500);
    };

    const handleInputChange = (field, value) => {
        setAddress(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const addressTypes = [
        { id: "home", label: "Home", icon: "🏠" },
        { id: "office", label: "Office", icon: "🏢" },
        { id: "other", label: "Other", icon: "📍" }
    ];

    return (
        <>
            <Navbar />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                                Delivery Information
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                            Add <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Shipping Address</span>
                        </h1>
                        <p className="text-slate-600 max-w-2xl">
                            Enter your delivery details to ensure your order arrives safely and on time
                        </p>
                    </div>
                </div>
            </div>

            <main className="min-h-screen bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Column - Form */}
                            <div>
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                                    <form onSubmit={onSubmitHandler} className="space-y-6">
                                        {/* Address Type */}
                                        

                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                                    errors.fullName
                                                        ? 'border-red-500 ring-2 ring-red-500/20'
                                                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                }`}
                                                type="text"
                                                placeholder="Enter your full name"
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                value={address.fullName}
                                            />
                                            {errors.fullName && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.fullName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500">
                                                    <span className="font-medium">+1</span>
                                                    <div className="w-px h-4 bg-slate-300"></div>
                                                </div>
                                                <input
                                                    className={`w-full pl-14 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                                        errors.phoneNumber
                                                            ? 'border-red-500 ring-2 ring-red-500/20'
                                                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                                    type="tel"
                                                    placeholder="123 456 7890"
                                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                                                    value={address.phoneNumber}
                                                    maxLength={10}
                                                />
                                            </div>
                                            {errors.phoneNumber && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.phoneNumber}
                                                </p>
                                            )}
                                        </div>

                                        {/* Address Line */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                Address Line *
                                            </label>
                                            <textarea
                                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${
                                                    errors.area
                                                        ? 'border-red-500 ring-2 ring-red-500/20'
                                                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                }`}
                                                rows={3}
                                                placeholder="Street address, apartment, suite, unit, building, floor, etc."
                                                onChange={(e) => handleInputChange('area', e.target.value)}
                                                value={address.area}
                                            />
                                            {errors.area && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.area}
                                                </p>
                                            )}
                                        </div>

                                        {/* Landmark (Optional) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                Landmark (Optional)
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                type="text"
                                                placeholder="Nearby landmark for easier delivery"
                                                onChange={(e) => handleInputChange('landmark', e.target.value)}
                                                value={address.landmark}
                                            />
                                        </div>

                                        {/* City, State, Pincode Grid */}
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                                        errors.city
                                                            ? 'border-red-500 ring-2 ring-red-500/20'
                                                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                                    type="text"
                                                    placeholder="City"
                                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                                    value={address.city}
                                                />
                                                {errors.city && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    State *
                                                </label>
                                                <input
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                                        errors.state
                                                            ? 'border-red-500 ring-2 ring-red-500/20'
                                                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                                    type="text"
                                                    placeholder="State"
                                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                                    value={address.state}
                                                />
                                                {errors.state && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Pincode *
                                                </label>
                                                <input
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                                        errors.pincode
                                                            ? 'border-red-500 ring-2 ring-red-500/20'
                                                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                                    type="text"
                                                    placeholder="123456"
                                                    onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                                                    value={address.pincode}
                                                    maxLength={6}
                                                />
                                                {errors.pincode && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.pincode}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Default Address Toggle */}
                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                                            <div>
                                                <p className="font-medium text-slate-900">Set as default address</p>
                                                <p className="text-sm text-slate-600">Use this address for all future orders</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsDefault(!isDefault)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    isDefault ? 'bg-blue-600' : 'bg-slate-300'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        isDefault ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Save Address
                                                    </>
                                                )}
                                            </button>
                                            
                                            <button
                                                type="button"
                                                onClick={() => router.back()}
                                                className="flex-1 px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-semibold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Security Note */}
                                <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-emerald-900 mb-2">Your data is secure</h4>
                                            <p className="text-sm text-emerald-800">
                                                We use bank-level encryption to protect your personal information.
                                                Your address details are only used for delivery purposes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Illustration & Tips */}
                            <div className="space-y-8">
                                {/* Illustration */}
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-slate-200">
                                    <div className="relative">
                                        <Image
                                            className="w-full h-auto object-contain"
                                            src={assets.my_location_image}
                                            alt="Location illustration"
                                            width={500}
                                            height={400}
                                        />
                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-2xl opacity-20"></div>
                                    </div>
                                </div>

                                {/* Tips */}
                                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Delivery Tips
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 text-sm font-bold">1</span>
                                            </div>
                                            <p className="text-slate-700">
                                                Ensure your phone number is correct and reachable for delivery updates
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 text-sm font-bold">2</span>
                                            </div>
                                            <p className="text-slate-700">
                                                Include landmarks for easier location identification
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 text-sm font-bold">3</span>
                                            </div>
                                            <p className="text-slate-700">
                                                Double-check the pincode to avoid delivery delays
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 text-sm font-bold">4</span>
                                            </div>
                                            <p className="text-slate-700">
                                                Set a default address for faster checkout next time
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Zones */}
                                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Delivery Coverage</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Standard Delivery</span>
                                            <span className="font-semibold text-emerald-600">3-5 business days</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Express Delivery</span>
                                            <span className="font-semibold text-blue-600">1-2 business days</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Same Day Delivery</span>
                                            <span className="font-semibold text-purple-600">Available in select cities</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-purple-200">
                                        <p className="text-sm text-slate-600">
                                            Delivery times may vary based on location and product availability
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default AddAddress;