"use client";

import type { Order } from "../context/OrderContext";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, CreditCard, ShoppingBag } from "lucide-react";

/* ---------------- ADDRESS TYPE ---------------- */
type Address = {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function CheckoutPage() {
  const { placeOrder } = useOrder();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { cart } = useShop();

  /* ---------------- PAYMENT ---------------- */
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE" | "">("");

  /* ---------------- PROTECT ROUTE ---------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/?login=true&redirect=/checkout");
    }
  }, [user, loading, router]);

  /* ---------------- SAVED ADDRESSES (MOCK → CONTEXT LATER) ---------------- */
  const [savedAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      phone: "9876543210",
      address: "Street 12, Andheri",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    {
      id: 2,
      label: "Office",
      name: "John Doe",
      phone: "9876543210",
      address: "BKC Corporate Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
    },
  ]);

  /* ---------------- SELECTED ADDRESS ---------------- */
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const isAddressValid =
    address.name.trim().length > 2 &&
    address.phone.trim().length >= 10 &&
    address.pincode.trim().length >= 6 &&
    address.city.trim().length > 1 &&
    address.state.trim().length > 1 &&
    address.addressLine.trim().length > 5;

  /* ---------------- PRICE ---------------- */
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal + tax + delivery;

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = () => {
    if (paymentMethod !== "COD") return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.qty,
        image: item.image,
      })),
      address,
      total,
      paymentMethod: "COD",
      status: "PLACED",
      createdAt: Date.now(),
    };

    placeOrder(newOrder);
    router.push("/order-success");
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-gray-500">
          Preparing checkout…
        </div>
        <Footer />
      </>
    );
  }

  /* ---------------- EMPTY CART ---------------- */
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/men"
            className="px-6 py-3 rounded-xl font-semibold text-black
            bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ---------------- STEPPER ---------------- */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-2">
            <ShoppingBag size={16} /> My Bag
          </span>
          <span className="flex-1 border-t border-dashed" />
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Address
          </span>
          <span className="flex-1 border-t border-dashed" />
          <span className="flex items-center gap-2 text-gray-400">
            <CreditCard size={16} /> Payment
          </span>
        </div>
      </div>

      {/* ---------------- MAIN ---------------- */}
      <main className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_420px] gap-8">
        {/* LEFT */}
        <section className="bg-white border rounded-2xl p-6 space-y-6">
          {/* ADDRESS */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Delivery Address</h2>

            {/* SAVED ADDRESSES */}
            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                  hover:border-brandGradient-from/50 transition"
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    className="mt-1"
                    onChange={() =>
                      setAddress({
                        name: addr.name,
                        phone: addr.phone,
                        pincode: addr.pincode,
                        city: addr.city,
                        state: addr.state,
                        addressLine: addr.address,
                      })
                    }
                  />
                  <div>
                    <p className="font-semibold">{addr.label}</p>
                    <p className="text-sm text-gray-600">
                      {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {addr.phone}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* MANUAL ENTRY */}
            <div className="grid grid-cols-1 gap-3 pt-4 border-t">
              {[
                ["Full Name", "name"],
                ["Phone Number", "phone"],
                ["Pincode", "pincode"],
                ["City", "city"],
                ["State", "state"],
              ].map(([label, key]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={(address as any)[key]}
                  className="input"
                  onChange={(e) =>
                    setAddress({ ...address, [key]: e.target.value })
                  }
                />
              ))}

              <textarea
                placeholder="Full Address"
                value={address.addressLine}
                className="input"
                rows={3}
                onChange={(e) =>
                  setAddress({ ...address, addressLine: e.target.value })
                }
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <CreditCard size={18} /> Payment Method
            </h2>

            <label
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                ${
                  paymentMethod === "COD"
                    ? "border-transparent bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to"
                    : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="payment"
                className="hidden"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span className="font-semibold">Cash on Delivery</span>
              <span className="ml-auto text-sm text-gray-600">
                Pay when you receive
              </span>
            </label>

            <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50 opacity-60 cursor-not-allowed">
              <span className="font-semibold">Online Payment</span>
              <span className="ml-auto text-xs text-gray-500">
                Razorpay coming soon
              </span>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="bg-white border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Price Details</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className={delivery === 0 ? "text-green-600" : ""}>
              {delivery === 0 ? "FREE" : `₹${delivery}`}
            </span>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={!isAddressValid || !paymentMethod}
            onClick={handlePlaceOrder}
            className="mt-6 w-full h-12 rounded-xl font-semibold
            bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
            text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {paymentMethod === "COD" ? "Place Order" : "Select Payment Method"}
          </button>
        </aside>
      </main>

      <Footer />
    </>
  );
}
