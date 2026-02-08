'use client'
import { useAppContext } from '@/context/AppContext'
import { useEffect, useState } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/my-orders')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-ping"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">Order Placed Successfully!</h1>
          <p className="text-lg text-slate-600">
            Your order has been confirmed and is being processed.
            You'll receive a confirmation email shortly.
          </p>
          
          {/* Countdown */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">
              {countdown}
            </div>
            <span className="text-slate-700">Redirecting to orders...</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8">
            <button
              onClick={() => router.push('/my-orders')}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
            >
              View Orders
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-700 transition-all font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced