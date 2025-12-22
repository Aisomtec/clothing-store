"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, ShoppingCart, MapPin, CreditCard } from "lucide-react";
import { useShop } from "../context/ShopContext";


const TAX_RATE = 0.05;

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, clearCart } = useShop();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const taxAmount = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + taxAmount;

  const recommendedProducts = [
    { id: 201, title: "Classic Black Tee", price: 799, image: "/men/black-tee.png" },
    { id: 202, title: "Olive Green Tee", price: 849, image: "/men/olive-tee.png" },
    { id: 203, title: "White Essential Tee", price: 699, image: "/men/white-tee.png" },
  ];


  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium">Cart</span>
      </div>

      {/* CHECKOUT STEPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
        <div className="
    flex items-center justify-between
    text-[11px] sm:text-sm font-semibold
    gap-2 sm:gap-6
  ">

          {/* CART */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-black whitespace-nowrap">
            <ShoppingCart size={16} className="sm:size-[18px]" />
            <span className="hidden xs:inline sm:inline">My Bag</span>
          </div>

          <div className="flex-1 border-t border-dashed border-gray-300 mx-1 sm:mx-0"></div>

          {/* ADDRESS */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 whitespace-nowrap">
            <MapPin size={16} className="sm:size-[18px]" />
            <span className="hidden xs:inline sm:inline">Address</span>
          </div>

          <div className="flex-1 border-t border-dashed border-gray-300 mx-1 sm:mx-0"></div>

          {/* PAYMENT */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 whitespace-nowrap">
            <CreditCard size={16} className="sm:size-[18px]" />
            <span className="hidden xs:inline sm:inline">Payment</span>
          </div>

        </div>
      </div>



      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* HEADING */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Shopping{" "}
          <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
            Cart
          </span>
        </h1>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-600 mb-6">
              Your cart is currently empty.
            </p>
            <Link
              href="/men"
              className="px-6 py-3 font-semibold rounded-md text-black
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
              hover:opacity-90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

            {/* CART ITEMS */}
            <section className="space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 border rounded-xl p-4 bg-white hover:shadow-sm transition"
                >
                  {/* IMAGE */}
                  <Link href={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>

                    {/* SIZE BADGE (IMPORTANT UX) */}
                    {item.size && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100">
                        Size: {item.size}
                      </span>
                    )}

                    <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => decreaseQty(item.id, item.size)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id, item.size)}>+</button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  {cart.length} item{cart.length > 1 ? "s" : ""} in cart
                </p>

                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-red-500 hover:underline"
                >
                  Clear Cart
                </button>
              </div>

              {/* YOU MAY ALSO LIKE */}
              {/* <div className="pt-10 border-t">
                <h2 className="text-lg font-bold mb-5">You may also like</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {recommendedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      className="border rounded-lg p-3 hover:shadow-sm transition bg-white"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full aspect-[3/4] object-cover rounded-md"
                      />

                      <p className="mt-2 text-sm font-medium truncate">
                        {p.title}
                      </p>

                      <p className="text-sm font-semibold">₹{p.price}</p>
                    </Link>
                  ))}
                </div>
              </div> */}


            </section>



            {/* PRICE DETAILS */}
            <aside className="border rounded-xl p-6 bg-white h-fit lg:sticky lg:top-24">
              <h2 className="font-semibold text-lg mb-5">
                Price Details
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-yellow-500">
                  <span>GST (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div className="flex justify-between text-orange-600">
                  <span>Delivery Charges</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between text-base font-semibold">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* TRUST MESSAGING */}
              <ul className="text-xs text-gray-600 space-y-2">
                <li>✔ 100% Original Products</li>
                <li>✔ Easy 7-day returns</li>
                <li>✔ Secure & encrypted payments</li>
              </ul>

              <Link href="/checkout">
                <button className="w-full mt-4 py-3 rounded-md font-semibold text-black
      bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
      hover:opacity-90 transition">
                  Proceed to Checkout
                </button>
              </Link>

              <p className="text-[11px] text-gray-500 text-center">
                Prices are inclusive of all taxes
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
