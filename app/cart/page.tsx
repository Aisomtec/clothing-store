"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, ShoppingCart, MapPin, CreditCard, Tag } from "lucide-react";
import { useShop } from "../context/ShopContext";

const TAX_RATE = 0.05;
const DELIVERY_CHARGE = 49;
const COUPON_CODE = "GETCASH10";
const COUPON_DISCOUNT = 100; // flat ₹100 example

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, clearCart } = useShop();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const taxAmount = Math.round(subtotal * TAX_RATE);
  const discount = subtotal > 999 ? COUPON_DISCOUNT : 0;

  const grandTotal =
    subtotal + taxAmount + DELIVERY_CHARGE - discount;

  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 pt-4 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-black">Home</Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium">Cart</span>
      </div>

      {/* CHECKOUT STEPPER */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">

          <div className="flex items-center gap-2 text-black">
            <ShoppingCart size={18} />
            My Bag
          </div>

          <div className="flex-1 border-t border-dashed mx-3" />

          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={18} />
            Address
          </div>

          <div className="flex-1 border-t border-dashed mx-3" />

          <div className="flex items-center gap-2 text-gray-400">
            <CreditCard size={18} />
            Payment
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADING */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Shopping <span className="text-yellow-400">Cart</span>
        </h1>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-gray-600 mb-6">
              Your cart is currently empty.
            </p>
            <Link
              href="/men"
              className="px-6 py-3 rounded-md font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

            {/* CART ITEMS */}
            <section className="space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 border rounded-xl p-4 bg-white"
                >
                  <Link href={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>

                    {item.size && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-yellow-50 border border-yellow-300">
                        Size: {item.size}
                      </span>
                    )}

                    <p className="text-sm text-gray-600 mt-1">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id, item.size)}
                        className="w-8 h-8 border rounded"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id, item.size)}
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center">
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
            </section>

            {/* PRICE DETAILS */}
            <aside className="border rounded-xl p-6 bg-white h-fit sticky top-24">
              <h2 className="font-semibold text-lg mb-5">
                Price Details
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>₹{DELIVERY_CHARGE}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon ({COUPON_CODE})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* COUPON DISPLAY */}
              <div className="mt-4 flex gap-3 items-start bg-yellow-50 border border-dashed border-yellow-400 rounded-lg p-3">
                <Tag size={18} className="text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">
                    Apply coupon <span className="text-yellow-600">{COUPON_CODE}</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    Save extra on orders above ₹999
                  </p>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full mt-5 py-3 rounded-md font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition">
                  Proceed to Checkout
                </button>
              </Link>

              <p className="text-[11px] text-gray-500 text-center mt-2">
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
