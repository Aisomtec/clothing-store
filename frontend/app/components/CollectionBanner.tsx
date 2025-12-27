import Link from "next/link";

export default function CollectionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-2xl bg-dark">

        {/* IMAGE */}
        <img
          src="/home/collection-banner.png"
          alt="Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          {/* BRAND TAG */}
          <span className="inline-block mb-3 text-xs font-bold tracking-widest uppercase
            text-brand-400">
            Featured Collection
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            The Everyday Tee Collection
          </h2>

          <p className="mt-4 text-gray-200 max-w-md">
            Crafted for comfort, built for longevity — elevated essentials
            designed for everyday wear.
          </p>

          {/* CTA */}
          <Link
            href="/men"
            className="
              inline-flex items-center gap-2
              mt-8 px-6 py-3 rounded-md
              bg-brand-400 text-black font-semibold
              hover:bg-brand-400/90 transition
            "
          >
            Explore Collection →
          </Link>
        </div>
      </div>
    </section>
  );
}
