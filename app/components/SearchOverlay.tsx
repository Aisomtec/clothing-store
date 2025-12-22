"use client";

import { X, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SearchOverlay({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: any[];
}) {
  const [q, setQ] = useState("");

  if (!open) return null;

  const results = products.filter(p =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <Search />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search products"
            className="flex-1 outline-none text-lg"
          />
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {results.map(p => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              onClick={onClose}
              className="block p-3 border rounded hover:bg-gray-50"
            >
              {p.title} — ₹{p.price}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
