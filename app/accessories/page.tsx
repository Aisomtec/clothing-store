"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import PriceRangeSlider from "../components/PriceRangeSlider";

/* ---------------- TYPES ---------------- */
type Product = {
  id: number;
  title: string;
  price: number;
  mrp?: number;
  image: string;
  category: string[];
  badge?: "NEW" | "SALE" | "";
};

/* ---------------- CONSTANTS ---------------- */
const MAX_PRICE = 2000;

const CATEGORY_OPTIONS = [
  "Caps",
  "Bags",
  "Socks",
  "Belts",
  "Wallets",
];

/* ---------------- PRODUCTS ---------------- */
const accessoriesProducts: Product[] = [
  {
    id: 201,
    title: "Classic Baseball Cap",
    price: 499,
    mrp: 699,
    image: "/accessories/cap.png",
    category: ["Caps"],
    badge: "NEW",
  },
  {
    id: 202,
    title: "Minimal Canvas Tote Bag",
    price: 899,
    mrp: 1199,
    image: "/accessories/tote.png",
    category: ["Bags"],
  },
  {
    id: 203,
    title: "Premium Crew Socks (Pack of 3)",
    price: 399,
    image: "/accessories/socks.png",
    category: ["Socks"],
    badge: "SALE",
  },
  {
    id: 204,
    title: "Leather Finish Belt",
    price: 699,
    mrp: 999,
    image: "/accessories/belt.png",
    category: ["Belts"],
  },
  {
    id: 205,
    title: "Slim Everyday Wallet",
    price: 799,
    image: "/accessories/wallet.png",
    category: ["Wallets"],
    badge: "NEW",
  },
];

export default function AccessoriesPage() {
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = useMemo(() => {
    return accessoriesProducts
      .filter(
        (p) =>
          p.price <= maxPrice &&
          (selectedCategories.length === 0 ||
            p.category.some((c) => selectedCategories.includes(c)))
      )
      .sort((a, b) =>
        sortBy === "low-high"
          ? a.price - b.price
          : sortBy === "high-low"
          ? b.price - a.price
          : 0
      );
  }, [maxPrice, selectedCategories, sortBy]);

  /* ---------------- FILTER PANEL ---------------- */
  const Filters = () => (
    <div className="space-y-8 text-sm">
      <div className="flex justify-between border-b pb-3">
        <h3 className="font-semibold text-base">Filters</h3>
        <button
          onClick={() => {
            setMaxPrice(MAX_PRICE);
            setSelectedCategories([]);
          }}
          className="text-xs font-semibold text-yellow-500"
        >
          CLEAR ALL
        </button>
      </div>

      {/* CATEGORY */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="flex flex-wrap gap-3">
          {CATEGORY_OPTIONS.map((cat) => {
            const active = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(cat)
                      ? prev.filter((x) => x !== cat)
                      : [...prev, cat]
                  )
                }
                className={`
                  px-4 py-2 rounded-full border text-sm font-semibold transition
                  ${
                    active
                      ? "bg-yellow-300 text-black border-yellow-400 shadow-sm"
                      : "bg-white text-gray-800 border-yellow-300 hover:border-yellow-400"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="font-semibold mb-3">Price</h4>
        <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm font-semibold uppercase text-gray-500">
            Accessories
          </p>
          <h1 className="text-4xl font-extrabold leading-tight">
            Everyday{" "}
            <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-yellow-400">
              Essentials
            </span>
          </h1>
        </div>
      </section>

      {/* ---------------- DESKTOP ---------------- */}
      <section className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-end sticky top-[88px] bg-white z-20 py-4">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-[280px_1fr] gap-10">
            <aside className="sticky top-[140px] h-[calc(100vh-140px)]">
              <div className="border rounded-xl p-6 bg-white h-full overflow-y-auto">
                <Filters />
              </div>
            </aside>

            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2">
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MOBILE ---------------- */}
      <section className="lg:hidden px-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* MOBILE FILTER BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex lg:hidden z-50">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex-1 py-4 font-semibold"
        >
          FILTERS
        </button>
      </div>

      {/* FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>✕</button>
            </div>
            <Filters />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
