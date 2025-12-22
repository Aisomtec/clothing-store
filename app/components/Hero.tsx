// app/components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-visible border-b">
      {/* Soft background accents */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-yellow-200/40 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-32 w-[360px] h-[360px] bg-yellow-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          {/* USP STRIP */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-yellow-400 text-black">
            New Season Essentials
          </span>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Premium Everyday
            <span className="block text-yellow-400">
              T-Shirts 
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Thoughtfully designed t-shirts crafted with premium cotton,
            perfect fits, and clean silhouettes. Built for comfort, made
            for daily wear.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/men"
              className="
                px-8 py-4 rounded-xl font-semibold text-black
                bg-yellow-300 hover:bg-yellow-400 transition
                shadow-md shadow-yellow-400/30
              "
            >
              Shop Men
            </Link>

            <Link
              href="/women"
              className="
                px-8 py-4 rounded-xl font-semibold
                border border-yellow-400 text-yellow-400
                hover:bg-yellow-50 transition
              "
            >
              Shop Women
            </Link>
          </div>

          {/* TRUST POINTS */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>Premium Cotton Fabric</div>
            <div>Easy 7-Day Returns</div>
            <div>Secure Payments</div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white">
            <img
              src="/hero.png"
              alt="Premium T-Shirts"
              className="w-full max-w-[520px] h-[420px] object-cover"
            />
          </div>

          {/* OFFER TAG */}
          {/* <div className="absolute -bottom-6 -left-6  bg-white rounded-xl shadow-lg px-4 py-8 text-sm font-semibold">
            Flat 10% cashback with GETCASH10
          </div> */}
        </div>
      </div>
    </section>
  );
}
