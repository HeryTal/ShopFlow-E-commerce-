import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { LogOut, Bell, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const { router } = useAppContext()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className='sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200'>
      {/* Logo */}
      <div 
        onClick={() => router.push('/seller')}
        className="flex items-center cursor-pointer"
      >
        <Image 
          className='w-28 lg:w-32' 
          src={assets.logo} 
          alt="Seller Dashboard" 
        />
        <div className="hidden md:block ml-3">
          <div className="text-sm font-semibold text-blue-600">Seller Dashboard</div>
          <div className="text-xs text-slate-500">Manage your store</div>
        </div>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell className="w-5 h-5 text-slate-700" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">S</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200">
              <div className="p-3 border-b border-slate-100">
                <p className="font-medium text-slate-900">Seller Account</p>
                <p className="text-xs text-slate-500 truncate">seller@example.com</p>
              </div>
              
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded">
                  Store Settings
                </button>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button 
                    onClick={() => router.push('/')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar