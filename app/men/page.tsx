"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { useShop } from "../context/ShopContext";

/* ---------------- TYPES ---------------- */
type Product = {
  id: number;
  title: string;
  price: number;
  mrp?: number;
  rating?: number;
  reviews?: number;
  image: string;
  hoverImage?: string;
  color: string;
  colors?: string[];
  fit: string;
  size: string[];
  category: string[];
  badge?: "NEW" | "SALE" | "";
};

/* ---------------- CONSTANTS ---------------- */
const MAX_PRICE = 1500;
const CATEGORY_OPTIONS = ["Round Neck", "Polo", "Oversized", "Sports", "Casual"];

/* ---------------- PRODUCTS ---------------- */
const menProducts: Product[] = [
  {
    id: 1,
    title: "Classic Tee - White",
    price: 799,
    mrp: 999,
    rating: 4.4,
    reviews: 184,
    image: "/men/classic-white.png",
    color: "White",
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck", "Casual"],
    badge: "SALE",
  },
  {
    id: 2,
    title: "Oversized Black Tee",
    price: 999,
    mrp: 1299,
    rating: 4.6,
    reviews: 231,
    image: "/men/oversized-tee.png",
    color: "Black",
    fit: "Oversized",
    size: ["M", "L", "XL"],
    category: ["Oversized", "Casual"],
    badge: "NEW",
  },
  {
    id: 3,
    title: "Premium Cotton Tee",
    price: 1199,
    mrp: 1499,
    rating: 4.5,
    reviews: 96,
    image: "/men/premium-cotton.png",
    color: "Brown",
    fit: "Regular",
    size: ["M", "L", "XL"],
    category: ["Round Neck"],
    badge: "SALE",
  },
  {
    id: 4,
    title: "Street Fit Charcoal Tee",
    price: 1099,
    mrp: 1399,
    rating: 4.6,
    reviews: 158,
    image: "/men/charcoal-tee.png",
    color: "Black",
    fit: "Oversized",
    size: ["L", "XL"],
    category: ["Oversized", "Sports"],
    badge: "NEW",
  },
];

/* ================================================= */

export default function MenPage() {
  const { searchQuery } = useShop();

  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return menProducts
      .filter(
        (p) =>
          p.price <= maxPrice &&
          (selectedCategories.length === 0 ||
            p.category.some((c) => selectedCategories.includes(c))) &&
          (q === "" || p.title.toLowerCase().includes(q))
      )
      .sort((a, b) =>
        sortBy === "low-high"
          ? a.price - b.price
          : sortBy === "high-low"
            ? b.price - a.price
            : 0
      );
  }, [searchQuery, maxPrice, selectedCategories, sortBy]);

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
                className={`px-4 py-2 rounded-full border text-sm font-semibold
                  ${active
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-yellow-300 hover:border-yellow-400"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

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
        <div className="fixed inset-0 top-16 flex bg-white">

          {/* LEFT FILTER FRAME */}
          <aside className="w-[280px] border-r">
            <div className="h-full overflow-y-auto p-6">
              <Filters />
            </div>
          </aside>

          {/* RIGHT SCROLL WINDOW */}
          <div className="flex-1 overflow-y-auto">

            {/* HERO */}
            <section className="border-b px-8 py-8">
              <p className="text-sm font-semibold uppercase text-gray-500">
                Men
              </p>
              <h1 className="text-4xl font-extrabold">
                Premium{" "}
                <span className="text-yellow-400">T-Shirts</span>
              </h1>
            </section>

            {/* SORT */}
            <div className="flex justify-end px-8 py-4 sticky top-0 bg-white z-10">
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
            <div className="px-8 pb-24 grid grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            <Footer />
          </div>
        </div>
      </section>

      {/* ================= MOBILE / TABLET ================= */}
      <section className="lg:hidden px-4 py-6 pb-24">
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-500">Men</p>
          <h1 className="text-2xl font-bold">
            Premium <span className="text-yellow-400">T-Shirts</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex lg:hidden z-50">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex-1 py-4 font-semibold border-r"
        >
          FILTERS
        </button>
        <button
          onClick={() => setMobileSortOpen(true)}
          className="flex-1 py-4 font-semibold"
        >
          SORT
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

      {/* SORT DRAWER */}
      {mobileSortOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Sort By</h3>
              <button onClick={() => setMobileSortOpen(false)}>✕</button>
            </div>
            <button
              onClick={() => {
                setSortBy("low-high");
                setMobileSortOpen(false);
              }}
              className="block w-full text-left py-2"
            >
              Price: Low to High
            </button>
            <button
              onClick={() => {
                setSortBy("high-low");
                setMobileSortOpen(false);
              }}
              className="block w-full text-left py-2"
            >
              Price: High to Low
            </button>
          </div>
        </div>
      )}
    </>
  );
}
