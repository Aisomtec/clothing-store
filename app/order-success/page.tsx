"use client";

import { useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { clearCart } = useShop();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          🎉 Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been confirmed.
        </p>

        <Link
          href="/men"
          className="px-6 py-3 rounded-xl font-semibold text-black
          bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to"
        >
          Continue Shopping
        </Link>
      </main>

      <Footer />
    </>
  );
}
