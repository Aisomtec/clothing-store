"use client";

import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ---------------- TYPES ---------------- */
type TabType = "overview" | "orders" | "addresses";

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

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-gray-500">
          Loading your account…
        </div>
        <Footer />
      </>
    );
  }

  /* ---------------- NOT LOGGED IN ---------------- */
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-3">You are not logged in</h1>
          <p className="text-gray-600 mb-6">
            Please login to view your account details.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition"
          >
            Go to Home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            My <span className="text-yellow-400">Account</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your profile, orders and addresses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
          {/* LEFT PROFILE */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              {user.photoURL ? (
                <div className="w-24 h-24 rounded-full border-2 border-yellow-400 p-1">
                  <Image
                    src={user.photoURL}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-black text-2xl font-bold">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <h2 className="font-semibold text-lg">
              {user.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>

            <button
              onClick={logout}
              className="mt-6 w-full py-2 rounded-xl text-sm font-semibold
              border border-yellow-400 text-yellow-600
              hover:bg-yellow-400 hover:text-black transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* TABS */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "overview", label: "Overview" },
                { id: "orders", label: "Orders" },
                { id: "addresses", label: "Addresses" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${
                      activeTab === tab.id
                        ? "bg-yellow-400 text-black"
                        : "border border-yellow-300 hover:bg-yellow-50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && <AccountOverview user={user} />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "addresses" && <SavedAddresses />}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- OVERVIEW ---------------- */

function AccountOverview({ user }: { user: any }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-yellow-300">
      <h3 className="text-lg font-semibold mb-4">Account Overview</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <InfoCard label="Name" value={user.displayName || "—"} />
        <InfoCard label="Email" value={user.email || "—"} />
        <InfoCard label="Phone" value={user.phoneNumber || "Not added"} />
        <InfoCard
          label="Status"
          value={<span className="text-green-600 font-semibold">Active</span>}
        />
      </div>
    </div>
  );
}

/* ================= ORDER HISTORY ================= */

function OrderHistory() {
  const { orders } = useOrder();

  if (!orders || orders.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        You haven’t placed any orders yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="block"
        >
          <div className="rounded-xl border border-gray-200 p-4 bg-white hover:border-yellow-400 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">₹{order.total}</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ---------------- ADDRESSES ---------------- */

function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleSave = (data: Address) => {
    setAddresses((prev) => {
      const exists = prev.find((a) => a.id === data.id);
      return exists
        ? prev.map((a) => (a.id === data.id ? data : a))
        : [...prev, data];
    });

    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <div className="space-y-4">
        {addresses.length === 0 && (
          <p className="text-sm text-gray-500">No saved addresses yet.</p>
        )}

        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="rounded-xl border border-gray-200 p-4 bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{addr.label}</p>
                <p className="text-sm text-gray-600">
                  {addr.name}, {addr.phone}
                </p>
                <p className="text-sm text-gray-600">
                  {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => {
                    setEditingAddress(addr);
                    setIsModalOpen(true);
                  }}
                  className="font-semibold text-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="font-semibold text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            setEditingAddress(null);
            setIsModalOpen(true);
          }}
          className="w-full py-3 rounded-xl font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition"
        >
          + Add New Address
        </button>
      </div>

      {isModalOpen && (
        <AddressModal
          initialData={editingAddress}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAddress(null);
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}

/* ---------------- ADDRESS MODAL ---------------- */

function AddressModal({
  initialData,
  onClose,
  onSave,
}: {
  initialData: Address | null;
  onClose: () => void;
  onSave: (data: Address) => void;
}) {
  const [form, setForm] = useState<Address>({
    id: initialData?.id || Date.now(),
    label: initialData?.label || "Home",
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Address" : "Add New Address"}
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <select
            name="label"
            value={form.label}
            onChange={(e) =>
              setForm({ ...form, label: e.target.value })
            }
            className="input sm:col-span-2"
          >
            <option>Home</option>
            <option>Office</option>
            <option>Other</option>
          </select>

          {["name", "phone", "address", "city", "state", "pincode"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={`input ${
                  field === "address" ? "sm:col-span-2" : ""
                }`}
                required
              />
            )
          )}

          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl bg-white p-4 border border-gray-200">
      <span className="absolute left-0 top-0 h-full w-[4px] bg-yellow-400 rounded-l-xl" />
      <p className="text-xs text-gray-500 uppercase pl-3">{label}</p>
      <div className="pl-3 font-medium">{value}</div>
    </div>
  );
}
