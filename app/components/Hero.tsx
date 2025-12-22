// app/components/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* LEFT: COPY */}
      <div className="order-2 md:order-1">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-dark font-display">
          Style that{" "}
          <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
            Defines
          </span>{" "}
          You
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-xl">
          Curated premium tees and essentials crafted with care. Modern minimal
          silhouettes, responsibly made — designed to last.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex gap-4 flex-wrap">
          <a
            href="/men"
            className="
              inline-block px-6 py-3 rounded-md text-black font-semibold shadow-sm
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
              hover:opacity-90 transition
            "
          >
            Shop Collection
          </a>

          <a
            href="/about"
            className="
              inline-block px-6 py-3 rounded-md border border-gray-200
              text-dark hover:border-dark transition
            "
          >
            Our Story
          </a>
        </div>

        {/* TRUST POINTS */}
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          <li>100% Premium Cotton</li>
          <li>Free returns • 30 days</li>
          <li>Worldwide shipping</li>
        </ul>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="order-1 md:order-2 flex items-center justify-center">
        <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-md">
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-80 md:h-[420px] object-cover"
            style={{ background: "#e9ecef" }}
          />
        </div>
      </div>
    </section>
  );
}
