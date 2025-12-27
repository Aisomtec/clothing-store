"use client";

import { useEffect, useRef, useState } from "react";
import { useShop } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const { clearCart } = useShop();
  const cleared = useRef(false);
  const router = useRouter();

  const [seconds, setSeconds] = useState(5);

  /* -------- CLEAR CART ONCE -------- */
  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  /* -------- AUTO REDIRECT -------- */
  useEffect(() => {
    if (seconds === 0) {
      router.push("/men");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <>
      <Navbar />

      {/* OVERLAY */}
      <main className="min-h-[70vh] flex items-center justify-center px-4 bg-yellow-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-yellow-300 p-8 text-center animate-fadeIn">

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <CheckCircle
              size={64}
              className="text-yellow-400"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            Order Placed!
          </h1>

          {/* MESSAGE */}
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Thank you for shopping with us.
            Your order has been successfully placed and is being processed.
          </p>

          {/* AUTO REDIRECT INFO */}
          <p className="text-xs text-gray-500 mb-6">
            Redirecting you in{" "}
            <span className="font-bold text-yellow-500">
              {seconds}
            </span>{" "}
            seconds…
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">
            <Link
              href="/account?tab=orders"
              className="w-full py-3 rounded-xl font-semibold text-black
              bg-yellow-400 hover:bg-yellow-500 transition"
            >
              View My Orders
            </Link>

            <Link
              href="/men"
              className="w-full py-3 rounded-xl font-semibold border border-yellow-400
              text-yellow-500 hover:bg-yellow-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
