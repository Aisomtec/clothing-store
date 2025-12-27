
import { auth } from "@/lib/firebase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import CategoryGrid from "./components/CategoryGrid";
import CollectionBanner from "./components/CollectionBanner";
import WhyChooseUs from "./components/WhyChooseUs";

/* ---------------- SAMPLE DATA ---------------- */
console.log(auth);
const featuredProducts = [
  { id: 1, title: "Classic Tee - White", price: 799, image: "/home/classic-white.png" },
  { id: 2, title: "Essentials Oversized Tee", price: 999, image: "/home/oversized-tee.png" },
  { id: 3, title: "Minimal Logo Tee", price: 899, image: "/home/minimal-logo.png" },
  { id: 4, title: "Premium Cotton Tee", price: 1199, image: "/home/premium-cotton.png" },
];

const newArrivals = [
  { id: 5, title: "Everyday Olive Tee", price: 849, image: "/men/olive-tee.png" },
  { id: 6, title: "Street Fit Black Tee", price: 1099, image: "/men/charcoal-tee.png" },
  { id: 7, title: "Classic Navy Tee", price: 899, image: "/men/navy-tee.png" },
  { id: 8, title: "Minimal Beige Tee", price: 799, image: "/men/beige-tee.png" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className=" space-y-24">

        {/* HERO */}
        <Hero />

        {/* CATEGORY GRID */}
        {/* <CategoryGrid /> */}

        {/* NEW ARRIVALS */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold">
              New <span className="text-brand-400">Arrivals</span>
            </h2>
            <a href="/men" className="text-sm text-gray-600 hover:text-black">
              View all
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* FASHION / EDITORIAL BANNER */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="
    relative overflow-hidden rounded-2xl
    grid md:grid-cols-2 items-center
    bg-brand-400/40
  ">

            {/* LEFT CONTENT */}
            <div className="p-8 md:p-12 relative z-10">

              {/* BRAND TAG */}
              <span className="
        inline-block text-xs font-bold tracking-widest uppercase
        text-brand-800 bg-brand-300/20
        px-3 py-1 rounded-full
      ">
                Trending Edit
              </span>

              <h3 className="mt-4 text-3xl font-extrabold text-dark leading-tight">
                Elevated{" "}
                <span className="relative">
                  Everyday
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-brand-400/60 rounded" />
                </span>{" "}
                Essentials
              </h3>

              <p className="mt-4 text-gray-700 max-w-md">
                Premium fabrics, modern fits, and timeless silhouettes designed
                for everyday wear.
              </p>

              <a
                href="/men"
                className="
          inline-flex items-center gap-2 mt-6
          px-6 py-3 rounded-md
          bg-brand-400 text-black font-semibold
          hover:brightness-95 transition
        "
              >
                Shop the Edit
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-64 md:h-full">
              <img
                src="/home/collection-banner.png"
                alt="Fashion banner"
                className="w-full h-full object-cover"
              />

              {/* SUBTLE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
            </div>

          </div>
        </section>


        {/* FEATURED PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold">
            Featured <span className="text-brand-400">Products</span>
          </h2>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* COUPON / VOUCHER SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">

            {[
              { title: "₹300 OFF", desc: "On orders above ₹1999", code: "STYLE300" },
              { title: "10% OFF", desc: "Buy 2 or more tees", code: "AUTO APPLY" },
              { title: "Free Shipping", desc: "Prepaid orders above ₹1499", code: "NO CODE" },
            ].map((c) => (
              <div
                key={c.title}
                className="
          relative overflow-hidden rounded-2xl
          border border-brand-400/40
          bg-white p-6
          transition hover:shadow-md
        "
              >
                {/* LEFT BRAND STRIP */}
                <div className="absolute left-0 top-0 h-full w-1 bg-brand-400" />

                {/* TICKET CUTOUTS */}
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-brand-400/30" />
                <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-brand-400/30" />

                {/* CONTENT */}
                <h4 className="text-2xl font-extrabold text-dark">
                  {c.title}
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  {c.desc}
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="
              text-xs font-bold tracking-widest
              px-4 py-2 rounded-md
              bg-brand-400/20 text-brand-400
            "
                  >
                    {c.code}
                  </span>

                  <a
                    href="/men"
                    className="
              text-sm font-semibold
              text-brand-800 hover:underline
            "
                  >
                    Shop →
                  </a>
                </div>
              </div>
            ))}

          </div>
        </section>


        {/* COLLECTION BANNER */}
        <CollectionBanner />

        {/* WHY CHOOSE US */}
        {/* <WhyChooseUs /> */}

        {/* PROMO BAND */}
        <section className="max-w-7xl mx-auto px-6">
          <div
            className="
      relative overflow-hidden rounded-2xl
      bg-brand-400/20
      px-8 py-10
      flex flex-col md:flex-row
      items-start md:items-center
      justify-between
      gap-6
    "
          >
            {/* LEFT CONTENT */}
            <div>
              <span className="inline-block mb-2 text-xs font-bold tracking-widest uppercase text-brand-400">
                Delivery Perk
              </span>

              <h3 className="text-2xl md:text-3xl font-extrabold text-dark">
                Free Shipping on Orders Above ₹1999
              </h3>

              <p className="mt-2 text-sm text-gray-700 max-w-lg">
                Enjoy hassle-free delivery on all prepaid orders. No hidden charges,
                no surprises.
              </p>
            </div>

            {/* CTA */}
            <a
              href="/men"
              className="
        inline-flex items-center gap-2
        px-6 py-3
        rounded-full
        bg-brand-400 text-black
        font-semibold
        hover:bg-brand-400/90
        transition
        whitespace-nowrap
      "
            >
              Shop Now →
            </a>

            {/* DECORATIVE ACCENT */}
            <span className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-400/30" />
          </div>
        </section>


        <Footer />
      </main>
    </>
  );
}
