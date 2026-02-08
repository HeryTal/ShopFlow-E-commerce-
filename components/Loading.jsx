import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-4">
            {/* Animated Logo/Icon */}
            <div className="relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20"></div>
                
                {/* Spinner */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-[6px] border-slate-200"></div>
                    <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-blue-600 border-r-blue-400 animate-spin"></div>
                    
                    {/* Center Dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Loading Text with Animation */}
            <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">
                    Loading <span className="inline-flex">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce animation-delay-200">.</span>
                        <span className="animate-bounce animation-delay-400">.</span>
                    </span>
                </h3>
                <p className="text-slate-600 text-sm max-w-sm">
                    Preparing your premium tech experience
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-shimmer rounded-full"></div>
            </div>

            <style jsx>{`
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </div>
    )
}

export default Loading