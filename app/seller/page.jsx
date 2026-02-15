'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import axios from "axios";

// Import des icônes Lucide React
import { 
  Upload, 
  Package, 
  Tag, 
  DollarSign, 
  Percent,
  Image as ImageIcon,
  X,
  Save,
  Camera,
  Info,
  AlertCircle
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const {getToken} = useAppContext ();

  const categories = [
    { value: "Earphone", label: "Earphone", icon: "🎧" },
    { value: "Headphone", label: "Headphone", icon: "🎧" },
    { value: "Watch", label: "Smart Watch", icon: "⌚" },
    { value: "Smartphone", label: "Smartphone", icon: "📱" },
    { value: "Laptop", label: "Laptop", icon: "💻" },
    { value: "Camera", label: "Camera", icon: "📷" },
    { value: "Accessories", label: "Accessories", icon: "🔌" },
    { value: "Gaming", label: "Gaming", icon: "🎮" },
    { value: "Audio", label: "Audio", icon: "🔊" },
  ];

  const brands = [
    "Apple", "Samsung", "Sony", "Bose", "JBL", "Logitech", "Dell", "HP", "Canon", "Nikon", "Generic"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (description.length < 20) newErrors.description = "Description must be at least 20 characters";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Valid price is required";
    if (!offerPrice || parseFloat(offerPrice) <= 0) newErrors.offerPrice = "Valid offer price is required";
    if (parseFloat(offerPrice) > parseFloat(price)) newErrors.offerPrice = "Offer price cannot exceed original price";
    if (!stock || parseInt(stock) < 0) newErrors.stock = "Valid stock quantity is required";
    if (files.filter(Boolean).length < 1) newErrors.images = "At least one product image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (index, file) => {
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
    
    // Clear image error if images are added
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
  };

  const calculateDiscount = () => {
    if (price && offerPrice && parseFloat(price) > 0) {
      const discount = ((parseFloat(price) - parseFloat(offerPrice)) / parseFloat(price)) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);

    files.forEach((file, index) => {
      if (file) {
        formData.append('images', file);
      }
    });

    try {
      const token = await getToken();
      const {data} = await axios.post('/api/product/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await getToken()}`
      }
    }) 
    }
    catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      alert("Failed to add product. Please try again.");

    }


    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product data:', { 
        name, description, category, price, offerPrice, stock, brand, files 
      });
      setIsSubmitting(false);
      
      // Reset form on success
      setName('');
      setDescription('');
      setCategory('Earphone');
      setPrice('');
      setOfferPrice('');
      setStock('');
      setBrand('');
      setFiles([]);
      setErrors({});
      
      // Show success message
      alert('Product added successfully!');
    }, 1500);
  };

  const discount = calculateDiscount();

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
        </div>
        <p className="text-slate-600">Fill in the details below to add a new product to your store</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Images Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Product Images</h2>
            </div>
            
            {errors.images && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">{errors.images}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="relative group">
                  <label 
                    htmlFor={`image${index}`}
                    className={`block cursor-pointer ${
                      files[index] 
                        ? 'border-2 border-blue-500' 
                        : 'border-2 border-dashed border-slate-300 hover:border-blue-400'
                    } rounded-xl p-4 transition-all duration-200 bg-gradient-to-br from-slate-50 to-white`}
                  >
                    <input
                      onChange={(e) => handleFileChange(index, e.target.files[0])}
                      type="file"
                      id={`image${index}`}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <div className="flex flex-col items-center justify-center h-40">
                      {files[index] ? (
                        <>
                          <div className="relative w-full h-full">
                            <Image
                              src={URL.createObjectURL(files[index])}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                              width={200}
                              height={200}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                removeImage(index);
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 truncate w-full text-center">
                            {files[index].name}
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-slate-400 mb-3" />
                          <span className="text-sm font-medium text-slate-700">Upload Image</span>
                          <span className="text-xs text-slate-500 mt-1">Click to browse</span>
                        </>
                      )}
                    </div>
                  </label>
                  
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {index === 0 ? 'Main' : `Preview ${index}`}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mt-4 text-sm text-slate-600">
              <Info className="w-4 h-4" />
              <span>Upload up to 4 images. First image will be used as main product image.</span>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Name */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                        errors.name
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your product in detail..."
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${
                        errors.description
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      {errors.description ? (
                        <p className="text-sm text-red-600">{errors.description}</p>
                      ) : (
                        <p className="text-sm text-slate-500">Min. 20 characters</p>
                      )}
                      <p className="text-sm text-slate-500">{description.length}/500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Pricing</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Original Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          errors.price
                            ? 'border-red-500 ring-2 ring-red-500/20'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                          if (errors.price) setErrors(prev => ({ ...prev, price: undefined }));
                        }}
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Offer Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          errors.offerPrice
                            ? 'border-red-500 ring-2 ring-red-500/20'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                        value={offerPrice}
                        onChange={(e) => {
                          setOfferPrice(e.target.value);
                          if (errors.offerPrice) setErrors(prev => ({ ...prev, offerPrice: undefined }));
                        }}
                      />
                    </div>
                    {errors.offerPrice && (
                      <p className="mt-2 text-sm text-red-600">{errors.offerPrice}</p>
                    )}
                  </div>
                </div>

                {discount > 0 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-emerald-800">Discount Applied</span>
                      <span className="text-xl font-bold text-emerald-700">{discount}% OFF</span>
                    </div>
                    <div className="text-sm text-emerald-600 mt-1">
                      You save: ${(parseFloat(price) - parseFloat(offerPrice)).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Category & Brand */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Category & Brand</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setCategory(cat.value)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                            category === cat.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="text-xl mb-1">{cat.icon}</span>
                          <span className="text-xs font-medium">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Brand
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Stock & Inventory */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Inventory</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter available stock"
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                      errors.stock
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                      if (errors.stock) setErrors(prev => ({ ...prev, stock: undefined }));
                    }}
                  />
                  {errors.stock && (
                    <p className="mt-2 text-sm text-red-600">{errors.stock}</p>
                  )}
                  <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      Set to 0 if out of stock. Customers will see "Out of Stock" status.
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Product Preview</h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium text-slate-900">{name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium text-slate-900">{category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium text-slate-900">
                      {price ? `$${parseFloat(price).toFixed(2)}` : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offer Price:</span>
                    <span className="font-medium text-emerald-700">
                      {offerPrice ? `$${parseFloat(offerPrice).toFixed(2)}` : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images:</span>
                    <span className="font-medium text-slate-900">
                      {files.filter(Boolean).length}/4 uploaded
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Ready to publish?</h3>
                <p className="text-slate-600 text-sm">Review all information before adding product</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding Product...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Add Product
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;