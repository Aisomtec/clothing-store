"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 overflow-hidden border-b">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* USP BADGE */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide bg-yellow-400 text-black shadow-lg shadow-yellow-400/50 hover:scale-105 transition-transform">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full animate-pulse"></span>
              New Season Essentials
            </div>

            {/* HEADLINE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900">
              Premium Everyday
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-gradient">
                T-Shirts
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Thoughtfully designed t-shirts crafted with{" "}
              <span className="font-semibold text-gray-900">premium cotton</span>, 
              perfect fits, and clean silhouettes. Built for comfort, made for daily wear.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/men"
                className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base text-black bg-yellow-400 hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-400/60 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Shop Men</span>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </Link>

              <Link
                href="/women"
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-500 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Shop Women
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">Premium Cotton</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span className="font-medium">7-Day Returns</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-white p-1 hover:scale-105 transition-transform duration-500">
              <div className="rounded-[1rem] sm:rounded-[1.3rem] overflow-hidden bg-white">
                <img
                  src="/hero.png"
                  alt="Premium T-Shirts Collection"
                  className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px] object-cover"
                />
              </div>
            </div>

            {/* FLOATING BADGE - Top Right */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl px-3 sm:px-5 py-2 sm:py-3 text-center transform rotate-6 hover:rotate-0 transition-transform z-20">
              <div className="text-xl sm:text-2xl font-black text-yellow-500">10%</div>
              <div className="text-[9px] sm:text-xs font-semibold text-gray-600 uppercase">Cashback</div>
            </div>

            {/* FLOATING REVIEW CARD - Bottom Left */}
            <div className="hidden lg:block absolute -bottom-4 -left-4 bg-white rounded-xl shadow-2xl px-4 py-3 max-w-[180px] hover:scale-110 transition-transform z-20">
              <div className="flex gap-1 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-700">2,500+ Happy Customers</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-yellow-300/30 rounded-full blur-xl -z-10" />
          </div>
        </div>

        {/* STATS BAR - Compact Version */}
        {/* <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto lg:mx-0">
          <div className="text-center lg:text-left">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">15K+</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">Products Sold</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">4.8★</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">Customer Rating</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">98%</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">Satisfaction</div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}