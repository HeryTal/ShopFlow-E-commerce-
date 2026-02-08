'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navbar */}
      <Navbar />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-all"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-slate-700" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      <div className="flex w-full pt-16">
        {/* Sidebar */}
        <div className={`
          fixed lg:static top-0 left-0 h-screen z-40
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 lg:mb-8">
              <nav className="flex items-center gap-2 text-sm text-slate-600">
                <span className="hover:text-blue-700 cursor-pointer">Dashboard</span>
                <span className="text-slate-400">/</span>
                <span className="font-medium text-blue-700">Overview</span>
              </nav>
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Content Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-600 mt-1">Manage your store and track performance</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-30"></div>
                      <div className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium">
                        Today
                      </div>
                    </div>
                    
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:border-blue-500 hover:text-blue-700 transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <div className="p-6">
                {children}
              </div>

              {/* Content Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-4">
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      System is running smoothly
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>© {new Date().getFullYear()} Seller Dashboard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-600 mb-1">Online Store</div>
                <div className="text-lg font-bold text-slate-900">Active</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-600 mb-1">API Status</div>
                <div className="text-lg font-bold text-emerald-700">Healthy</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-600 mb-1">Support</div>
                <div className="text-lg font-bold text-blue-700">24/7</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-600 mb-1">Version</div>
                <div className="text-lg font-bold text-slate-900">v2.1.4</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all">
          <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* Gradient Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default Layout