import Link from "next/link";

export default function CollectionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="relative rounded-xl overflow-hidden bg-gray-900 h-80 flex items-center">
        <img
          src="/home/collection-banner.png"
          alt="Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          <h2 className="text-3xl font-bold text-white">
            The Everyday Tee Collection
          </h2>

          <p className="mt-3 text-gray-200">
            Crafted for comfort. Designed for everyday wear.
          </p>

          <Link
            href="/men"
            className="
              inline-block mt-6 px-6 py-3 rounded-md font-semibold text-black
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
              hover:opacity-90 transition
            "
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
