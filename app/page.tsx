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

      <main className="pt-6 space-y-24">

        {/* HERO */}
        <Hero />

        {/* CATEGORY GRID */}
        <CategoryGrid />

        {/* NEW ARRIVALS */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold">
              New <span className="text-brand">Arrivals</span>
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
          <div className="rounded-2xl overflow-hidden bg-gray-100 grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold text-brand uppercase">
                Trending Edit
              </p>
              <h3 className="mt-2 text-3xl font-extrabold">
                Elevated Everyday Essentials
              </h3>
              <p className="mt-4 text-gray-600 max-w-md">
                Premium fabrics, modern fits, and timeless silhouettes designed
                for everyday wear.
              </p>
              <a
                href="/men"
                className="inline-block mt-6 px-6 py-3 bg-brand text-black font-semibold rounded-md"
              >
                Shop the Edit
              </a>
            </div>

            <div className="h-64 md:h-full">
              <img
                src="/home/collection-banner.png"
                alt="Fashion banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold">
            Featured <span className="text-brand">Products</span>
          </h2>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* COUPON / VOUCHER SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">

            {/* COUPON CARD */}
            {[
              { title: "₹300 OFF", desc: "On orders above ₹1999", code: "STYLE300" },
              { title: "10% OFF", desc: "Buy 2 or more tees", code: "AUTO APPLY" },
              { title: "Free Shipping", desc: "Prepaid orders above ₹1499", code: "NO CODE" },
            ].map((c) => (
              <div
                key={c.title}
                className="relative bg-white border-2 border-dashed rounded-xl p-6"
              >
                {/* Ticket notches */}
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />
                <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />

                <h4 className="text-xl font-bold">{c.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs px-3 py-1 bg-gray-100 rounded">
                    {c.code}
                  </span>
                  <a
                    href="/men"
                    className="text-sm font-semibold text-brand"
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
        <WhyChooseUs />

        {/* PROMO BAND */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="rounded-xl bg-gray-50 p-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Free shipping on orders above ₹1999
            </h3>
            <a
              href="/men"
              className="px-5 py-3 rounded-md font-semibold text-black
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
              hover:opacity-90"
            >
              Shop Now
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
