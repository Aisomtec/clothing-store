"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import {
  Heart,
  Star,
  ShieldCheck,
  RefreshCcw,
  Truck,
  Lock,
  Tag,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

/* ---------------- MOCK PRODUCT ---------------- */
const product = {
  id: 101,
  title: "Premium Cotton T-Shirt",
  brand: "CLOTHING.CO",
  price: 899,
  mrp: 1299,
  rating: 4.4,
  reviews: 184,
  badge: "SALE" as const,
  images: [
    "/men/classic-white.png",
    "/men/navy-tee.png",
    "/men/olive-tee.png",
    "/men/melange-tee.png",
  ],
  sizes: ["S", "M", "L", "XL"],
  description:
    "Premium cotton t-shirt crafted for everyday comfort with a modern fit.",
  details: {
    Material: "100% Cotton",
    Fit: "Regular Fit",
    Neck: "Round Neck",
    Sleeve: "Half Sleeve",
    // Care: "Machine wash cold",
  },
};

/* ---------------- RELATED ---------------- */
const relatedProducts = [
  { id: 1, title: "Classic Navy Tee", price: 899, image: "/men/navy-tee.png" },
  { id: 2, title: "Oversized Black Tee", price: 999, image: "/men/oversized-tee.png" },
  { id: 3, title: "Olive Casual Tee", price: 849, image: "/men/olive-tee.png" },
  { id: 4, title: "Grey Melange Tee", price: 1299, image: "/men/melange-tee.png" },
];

export default function ProductDetailPage() {
  const {
    addToCart,
    increaseQty,
    decreaseQty,
    getCartQty,
    toggleWishlist,
    isInWishlist,
  } = useShop();


  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const quantityInCart =
    selectedSize ? getCartQty(product.id, selectedSize) : 0;

  const [activeImage, setActiveImage] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const [showSizeError, setShowSizeError] = useState(false);


  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  /** 🔑 Cart-compatible product */
  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.images[0],
    size: selectedSize!,
  };

  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 pt-4 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          href="/men"
          className="hover:text-black transition"
        >
          Men
        </Link>

        <ChevronRight size={14} />

        <span className="text-black font-medium truncate">
          {product.title}
        </span>
      </div>


      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-10">

        {/* ================= TOP ================= */}
        <div className="grid lg:grid-cols-[1fr_460px] gap-8">

          {/* LEFT IMAGES */}
          <div>
            {/* MOBILE SLIDER */}
            <div className="lg:hidden aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.images[activeImage]}
                className="w-full h-full object-cover"
                alt={product.title}
              />
              <div className="flex justify-center gap-2 mt-3">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2.5 h-2.5 rounded-full ${activeImage === i ? "bg-black" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP GRID */}
            <div className="hidden lg:grid grid-cols-2 gap-4 sticky top-24">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden"
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="space-y-6">

            {product.badge && (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to text-black">
                {product.badge}
              </span>
            )}

            <div>
              <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white font-semibold">
                {product.rating}
                <Star size={14} fill="white" />
              </span>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>

            <div className="flex items-center gap-3 border-b pb-5">
              <span className="text-3xl font-bold">₹{product.price}</span>
              <span className="line-through text-gray-400">₹{product.mrp}</span>
              <span className="text-green-600 font-semibold text-sm">
                {discount}% OFF
              </span>
            </div>

            {/* SIZE */}
            <div>
              {/* HEADER ROW */}
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">Select Size</p>

                <button
                  type="button"
                  onClick={() => setShowSizeChart(true)}
                  className="text-xs font-semibold text-yellow-500 hover:opacity-80"
                >
                  Size Guide
                </button>
              </div>

              {/* ERROR MESSAGE */}
              {showSizeError && (
                <p className="text-xs text-red-600 mb-2">
                  Please select one size
                </p>
              )}

              {/* SIZE OPTIONS */}
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => {
                  const active = selectedSize === s;

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s);
                        setShowSizeError(false);
                      }}
                      className={`
            min-w-[52px] h-11 rounded-lg border
            font-semibold text-sm transition
            ${active
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-gray-300 hover:border-yellow-400"
                        }
          `}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>


            {/* CTA */}
            <div className="flex gap-3">
              {!selectedSize ? (
                <button
                  disabled
                  className="flex-1 h-14 rounded-xl bg-gray-200 text-gray-400 font-semibold"
                >
                  Select Size
                </button>
              ) : quantityInCart === 0 ? (
                <button
                  onClick={() => {
                    if (!selectedSize) {
                      setShowSizeError(true);
                      return;
                    }

                    addToCart(cartProduct);
                  }}
                  className="flex-1 h-14 rounded-xl font-semibold bg-yellow-400 text-black hover:opacity-90 transition"
                >
                  Add to Cart
                </button>

              ) : (
                <div className="flex-1 h-14 flex items-center justify-between border bg-yellow-400 rounded-xl px-4">
                  <button onClick={() => decreaseQty(product.id, selectedSize)}>
                    <Minus size={18} />
                  </button>

                  <span className="font-semibold text-lg">{quantityInCart}</span>

                  <button onClick={() => increaseQty(product.id, selectedSize)}>
                    <Plus size={18} />
                  </button>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(cartProduct)}
                className="w-14 h-14 border rounded-xl flex items-center justify-center"
              >
                <Heart
                  size={22}
                  className={
                    isInWishlist(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
            </div>


            {/* COUPON */}
            <div className="border-2 border-dashed rounded-xl p-4 bg-yellow-100 flex gap-3">
              <Tag />
              <div>
                <p className="font-semibold text-sm">Extra ₹200 OFF</p>
                <p className="text-xs text-gray-600">
                  On orders above ₹1499
                </p>
                <code className="mt-2 inline-block bg-white px-3 py-1 border rounded text-sm font-bold">
                  STYLE200
                </code>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* TRUST */}
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-600" />
                100% Original
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw size={18} className="text-blue-600" />
                Easy Returns
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-orange-600" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-gray-700" />
                Secure Payment
              </div>
            </div>

            {/* DETAILS */}
            <div className="pt-10 space-y-4">
              <h2 className="text-xl font-bold">Product Details</h2>
              <p className="text-gray-700">{product.description}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(product.details).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between text-sm border-b py-2"
                  >
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* RELATED */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </main>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">

          {/* MODAL CARD */}
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-black">
                Size Chart
              </h3>

              <button
                onClick={() => setShowSizeChart(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-yellow-300">
              <table className="w-full text-sm">
                <thead className="bg-yellow-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">Size</th>
                    <th className="p-3 text-center font-semibold">Chest</th>
                    <th className="p-3 text-center font-semibold">Length</th>
                  </tr>
                </thead>

                <tbody>
                  {["S", "M", "L", "XL"].map((s, i) => (
                    <tr
                      key={s}
                      className="border-t last:border-b-0"
                    >
                      <td className="p-3 font-semibold">{s}</td>
                      <td className="p-3 text-center">{38 + i * 2}"</td>
                      <td className="p-3 text-center">{27 + i}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER NOTE */}
            <p className="mt-4 text-xs text-gray-500">
              All measurements are in inches. Allow ±0.5” tolerance.
            </p>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}
