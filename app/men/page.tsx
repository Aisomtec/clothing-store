"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { useShop } from "../context/ShopContext";

/* ---------------- TYPES ---------------- */
type BackendProduct = {
  id: number;
  slug: string;
  name: string;
  price: number;
  discount_price?: number | null;
  image: string | null;
  subcategory: string;
  badge?: "NEW" | "SALE" | "";
  size?: string[] | null;
  fit?: string | null;
  colors?: string[] | null;
};

type Product = {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp?: number;
  image: string;
  category: string[];
  badge?: "NEW" | "SALE" | "";
  size: string[];
  fit: string;
  colors: string[];
};

/* ---------------- CONSTANTS ---------------- */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
const MAX_PRICE = 1500;

const CATEGORY_OPTIONS = ["Round Neck", "Polo", "Oversized", "Sports", "Casual"];
const SIZE_OPTIONS = ["S", "M", "L", "XL"];
const FIT_OPTIONS = ["Regular", "Oversized", "Slim"];
const COLOR_OPTIONS = ["White", "Black", "Blue", "Grey", "Green", "Red", "Yellow", "Brown"];

/* ================================================= */

export default function MenPage() {
  const { searchQuery } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products/?category=men`);
        const data: BackendProduct[] = await res.json();

        const mapped = data.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.name,
          price: Number(p.discount_price ?? p.price),
          mrp: Number(p.price),
          image: p.image || "",
          category: [p.subcategory],
          badge: p.badge ?? "",
          size: p.size ?? [],
          fit: p.fit ?? "",
          colors: p.colors ?? [],
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("MEN FETCH ERROR:", err);
      }
    }
    fetchProducts();
  }, []);

  /* ---------------- FILTERING ---------------- */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return products
      .filter((p) => {
        return (
          p.price <= maxPrice &&
          (selectedCategories.length === 0 || p.category.some((c) => selectedCategories.includes(c))) &&
          (selectedSizes.length === 0 || p.size.some((s) => selectedSizes.includes(s))) &&
          (selectedFits.length === 0 || selectedFits.includes(p.fit)) &&
          (selectedColors.length === 0 || p.colors.some((clr) => selectedColors.includes(clr))) &&
          (query === "" || p.title.toLowerCase().includes(query))
        );
      })
      .sort((a, b) =>
        sortBy === "low-high" ? a.price - b.price :
        sortBy === "high-low" ? b.price - a.price : 0
      );
  }, [products, maxPrice, selectedCategories, selectedSizes, selectedFits, selectedColors, sortBy, searchQuery]);

  /* ---------------- FILTER PANEL ---------------- */
  const Filters = () => (
    <div className="space-y-8 text-sm">
      <div className="flex justify-between border-b pb-3">
        <h3 className="font-semibold text-base">Filters</h3>
        <button
          onClick={() => {
            setMaxPrice(MAX_PRICE);
            setSelectedCategories([]);
            setSelectedSizes([]);
            setSelectedFits([]);
            setSelectedColors([]);
          }}
          className="text-xs font-semibold text-yellow-500"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => {
            const active = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat]
                  )
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  active ? "bg-yellow-400 text-black border-yellow-400" : "border-yellow-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold mb-3">Price</h4>
        <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
      </div>

      {/* Size */}
      <div>
        <h4 className="font-semibold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() =>
                setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
              }
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedSizes.includes(size) ? "bg-yellow-400 border-yellow-400" : "border-yellow-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Fit */}
      <div>
        <h4 className="font-semibold mb-3">Fit</h4>
        <div className="flex flex-wrap gap-2">
          {FIT_OPTIONS.map((fit) => (
            <button
              key={fit}
              onClick={() =>
                setSelectedFits((prev) => (prev.includes(fit) ? prev.filter((x) => x !== fit) : [...prev, fit]))
              }
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedFits.includes(fit) ? "bg-yellow-400 border-yellow-400" : "border-yellow-300"
              }`}
            >
              {fit}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="font-semibold mb-3">Color</h4>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_OPTIONS.map((color) => (
            <label key={color} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() =>
                  setSelectedColors((prev) =>
                    prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
                  )
                }
              />
              {color}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  /* ================================================= */

  return (
    <>
      <Navbar />

      {/* ------------------ DESKTOP ------------------ */}
      <section className="hidden lg:flex fixed inset-0 top-16 bg-white">
        {/* LEFT FILTERS */}
        <aside className="w-[280px] border-r overflow-y-auto p-6">
          <Filters />
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 overflow-y-auto">

          {/* HERO (Desktop) */}
          <div className="border-b bg-white p-10 flex justify-between items-center">
            <div>
              <p className="text-gray-500 uppercase text-sm">Men</p>
              <h1 className="text-4xl font-extrabold">
                Premium <span className="text-yellow-400">T-Shirts</span>
              </h1>
            </div>

            <div className="flex items-center border border-yellow-400 rounded-xl overflow-hidden">
              <div className="bg-yellow-300 px-8 py-5">
                <h3 className="font-bold text-lg text-black">Get 10% Cashback</h3>
                <p className="text-xs text-black/70">On All Orders</p>
              </div>
              <div className="px-8 bg-white text-center">
                <p className="text-xs uppercase text-gray-500">Use Code</p>
                <p className="font-bold tracking-[0.25em] text-yellow-500 text-xl">GETCASH10</p>
              </div>
            </div>
          </div>

          {/* SORT (Desktop) */}
          <div className="flex justify-end p-4 sticky top-0 bg-white z-10">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 p-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>

          <Footer />
        </main>
      </section>

      {/* ------------------ MOBILE / TABLET ------------------ */}
      <section className="lg:hidden px-5 mt-10 pb-14">
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-500">Men</p>
          <h1 className="text-3xl font-extrabold">
            Premium <span className="text-yellow-400">T-Shirts</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* ------------------ ACTION BAR (Mobile) ------------------ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex lg:hidden z-50">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex-1 py-4 font-semibold border-r">
          FILTERS
        </button>
        <button onClick={() => setMobileSortOpen(true)} className="flex-1 py-4 font-semibold">
          SORT
        </button>
      </div>

      {/* FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>✕</button>
            </div>
            <Filters />
          </div>
        </div>
      )}

      {/* SORT DRAWER */}
      {mobileSortOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold">Sort Products</h3>
              <button onClick={() => setMobileSortOpen(false)}>✕</button>
            </div>
            <button onClick={() => { setSortBy("low-high"); setMobileSortOpen(false) }} className="w-full text-left text-sm py-3">
              Price: Low to High
            </button>
            <button onClick={() => { setSortBy("high-low"); setMobileSortOpen(false) }} className="w-full text-left text-sm py-3">
              Price: High to Low
            </button>
          </div>
        </div>
      )}

      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
}
