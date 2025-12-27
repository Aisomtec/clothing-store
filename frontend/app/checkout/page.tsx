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
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  Wallet,
  Smartphone,
} from "lucide-react";

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

type PaymentType = "COD" | "UPI" | "CARD" | "";

export default function CheckoutPage() {
  const { placeOrder } = useOrder();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { cart } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("");

  /* ---------------- PROTECT ROUTE ---------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/?login=true&redirect=/checkout");
    }
  }, [user, loading, router]);

  /* ---------------- MOCK ADDRESSES ---------------- */
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
  ]);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const isAddressValid =
    address.name &&
    address.phone.length >= 10 &&
    address.pincode.length >= 6 &&
    address.city &&
    address.state &&
    address.addressLine.length > 5;

  /* ---------------- PRICE ---------------- */
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal + tax + delivery;

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = () => {
    if (!paymentMethod) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cart.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.qty,
        image: i.image,
      })),
      address,
      total,
      paymentMethod,
      status: "PLACED",
      createdAt: Date.now(),
    };

    placeOrder(newOrder);
    router.push("/order-success");
  };

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

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/men"
            className="px-6 py-3 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500"
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

      {/* STEPPER */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-2">
            <ShoppingBag size={16} /> My Bag
          </span>
          <span className="flex-1 border-t border-dashed mx-3" />
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Address
          </span>
          <span className="flex-1 border-t border-dashed mx-3" />
          <span className="flex items-center gap-2 text-yellow-500">
            <CreditCard size={16} /> Payment
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_420px] gap-8">

        {/* LEFT */}
        <section className="bg-white border rounded-2xl p-6 space-y-8">

          {/* ADDRESS */}
          <div>
            <h2 className="font-bold text-lg mb-4">Delivery Address</h2>

            {savedAddresses.map((a) => (
              <label
                key={a.id}
                className="flex gap-3 p-4 border rounded-xl cursor-pointer hover:border-yellow-400"
              >
                <input
                  type="radio"
                  name="address"
                  onChange={() =>
                    setAddress({
                      name: a.name,
                      phone: a.phone,
                      pincode: a.pincode,
                      city: a.city,
                      state: a.state,
                      addressLine: a.address,
                    })
                  }
                />
                <div>
                  <p className="font-semibold">{a.label}</p>
                  <p className="text-sm text-gray-600">
                    {a.address}, {a.city}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* PAYMENT METHODS */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard size={18} /> Payment Method
            </h2>

            <div className="space-y-3">

              {/* COD */}
              <PaymentRow
                active={paymentMethod === "COD"}
                onClick={() => setPaymentMethod("COD")}
                icon={<Wallet size={18} />}
                title="Cash on Delivery"
                desc="Pay when product is delivered"
              />

              {/* UPI */}
              <PaymentRow
                active={paymentMethod === "UPI"}
                onClick={() => setPaymentMethod("UPI")}
                icon={<Smartphone size={18} />}
                title="UPI"
                desc="Google Pay • PhonePe • Paytm"
                extra="example@upi"
              />

              {/* CARD */}
              <PaymentRow
                active={paymentMethod === "CARD"}
                onClick={() => setPaymentMethod("CARD")}
                icon={<CreditCard size={18} />}
                title="Credit / Debit Card"
                desc="Visa • MasterCard • RuPay"
                extra="**** **** **** 4242"
              />
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="bg-white border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Price Details</h2>

          <PriceRow label="Subtotal" value={subtotal} />
          <PriceRow label="Tax (5%)" value={tax} />
          <PriceRow
            label="Delivery"
            value={delivery}
            highlight={delivery === 0}
          />

          <div className="border-t my-4" />

          <PriceRow label="Total" value={total} bold />

          <button
            disabled={!isAddressValid || !paymentMethod}
            onClick={handlePlaceOrder}
            className="mt-6 w-full h-12 rounded-xl font-semibold
            bg-yellow-400 hover:bg-yellow-500
            disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </aside>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- HELPERS ---------------- */

function PaymentRow({
  active,
  onClick,
  icon,
  title,
  desc,
  extra,
}: any) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
      ${active ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-yellow-300"}`}
    >
      {icon}
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-gray-600">{desc}</p>
        {extra && (
          <p className="text-xs font-mono text-gray-500 mt-1">{extra}</p>
        )}
      </div>
    </div>
  );
}

function PriceRow({ label, value, highlight, bold }: any) {
  return (
    <div
      className={`flex justify-between text-sm ${bold ? "font-bold" : ""}`}
    >
      <span>{label}</span>
      <span className={highlight ? "text-green-600" : ""}>
        ₹{value}
      </span>
    </div>
  );
}
