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
const MAX_PRICE = 3000;

const CATEGORY_OPTIONS = ["Perfumes", "Caps", "Bracelets"];

/* ---------------- PRODUCTS ---------------- */
const accessoriesProducts: Product[] = [
  {
    id: 301,
    title: "Signature Eau De Parfum",
    price: 1499,
    mrp: 1999,
    image: "/accessories/perfume-1.png",
    category: ["Perfumes"],
    badge: "NEW",
  },
  {
    id: 302,
    title: "Midnight Oud Perfume",
    price: 1799,
    mrp: 2299,
    image: "/accessories/perfume-2.png",
    category: ["Perfumes"],
  },
  {
    id: 303,
    title: "Classic Black Cap",
    price: 499,
    mrp: 699,
    image: "/accessories/cap-1.png",
    category: ["Caps"],
    badge: "SALE",
  },
  {
    id: 304,
    title: "Minimal Logo Cap",
    price: 599,
    image: "/accessories/cap-2.png",
    category: ["Caps"],
  },
  {
    id: 305,
    title: "Stainless Steel Bracelet",
    price: 899,
    mrp: 1199,
    image: "/accessories/bracelet-1.png",
    category: ["Bracelets"],
    badge: "NEW",
  },
  {
    id: 306,
    title: "Matte Black Chain Bracelet",
    price: 1099,
    image: "/accessories/bracelet-2.png",
    category: ["Bracelets"],
  },
];

/* ================================================= */

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
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition
                  ${active
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-white border-yellow-300 hover:border-yellow-400"
                  }`}
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



      {/* ================= DESKTOP L-FRAME ================= */}
      <section className="hidden lg:block">
        <div className="fixed inset-0 top-16 flex">

          {/* LEFT FILTER FRAME */}
          <aside className="w-[280px] border-r bg-white">
            <div className="h-full overflow-y-auto p-6">
              <Filters />
            </div>
          </aside>

          {/* RIGHT SCROLL WINDOW */}


      {/* ================= HERO ================= */}

          <div className="flex-1 overflow-y-auto px-6">
            <section className="border-b bg-white">
              <div className="max-w-7xl mx-auto px-6 py-8">
                <p className="text-sm font-semibold uppercase text-gray-500">
                  Accessories
                </p>
                <h1 className="text-4xl font-extrabold">
                  <span className="text-yellow-400">Essentials</span>
                </h1>
              </div>
            </section>

            {/* SORT */}
            <div className="flex justify-end py-4 sticky top-0 bg-white z-10">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="border px-4 py-2 rounded-md text-sm"
              >
                <option value="">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            <Footer />
          </div>
        </div>
      </section>

      {/* ================= MOBILE ================= */}
      <section className="lg:hidden px-4 py-6">
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
    </>
  );
}
