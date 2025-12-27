"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Your{" "}
          <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
            Wishlist
          </span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 mb-6">
              Your wishlist is empty.
            </p>
            <Link
              href="/men"
              className="inline-block px-6 py-3 font-semibold rounded-md text-black
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
              hover:opacity-90 transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
