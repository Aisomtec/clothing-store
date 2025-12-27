"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrder } from "../../../context/OrderContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";

/* ---------------- PAGE ---------------- */

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { orders } = useOrder();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 mb-4">Order not found.</p>
          <button
            onClick={() => router.push("/account")}
            className="px-6 py-3 rounded-xl font-semibold text-black
            bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to"
          >
            Back to Account
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-medium">{order.id}</span>
            </p>
          </div>

          <span
            className="px-4 py-1 rounded-full text-sm font-semibold
            bg-yellow-50 text-yellow-700"
          >
            {order.status}
          </span>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Order Status</h2>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Placed
            </div>
            <span className="flex-1 border-t border-dashed" />
            <div className="text-gray-400">Shipped</div>
            <span className="flex-1 border-t border-dashed" />
            <div className="text-gray-400">Delivered</div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-4 last:border-b-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={90}
                  className="rounded-lg border"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ADDRESS + PRICE */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* ADDRESS */}
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="font-semibold mb-3">Delivery Address</h2>

            <p className="font-medium">{order.address.name}</p>
            <p className="text-sm text-gray-600">
              {order.address.addressLine}, {order.address.city},{" "}
              {order.address.state} – {order.address.pincode}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {order.address.phone}
            </p>
          </div>

          {/* PRICE */}
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="font-semibold mb-3">Price Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Total Amount</span>
              <span className="font-medium">₹{order.total}</span>
            </div>

            <div className="text-xs text-gray-500">
              Payment Method: {order.paymentMethod}
            </div>

            <button
              className="mt-4 w-full py-3 rounded-xl font-semibold text-black
              bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to"
            >
              Reorder (Coming Soon)
            </button>
          </div>
        </div>

        {/* BACK */}
        <div>
          <button
            onClick={() => router.push("/account")}
            className="text-sm font-semibold text-brandGradient-from"
          >
            ← Back to My Account
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
