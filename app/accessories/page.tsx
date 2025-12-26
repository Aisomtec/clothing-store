"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import PriceRangeSlider from "../components/PriceRangeSlider";

/* ---------------- TYPES ---------------- */
type Product = {
  id: number;
   slug: string; 
  title: string;
  price: number;
  mrp?: number;
  image: string;
  category: string[];
};

/* ---------------- BACKEND ---------------- */
type BackendProduct = {
  id: number;
  slug: string; 
  name: string;
  price: string;
  discount_price?: string | null;
  image?: string | null;
  category?: string;
};

/* ---------------- CONSTANTS ---------------- */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const MAX_PRICE = 3000;
const CATEGORY_OPTIONS = ["Perfumes", "Caps", "Bracelets"];

/* ========================================================= */

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products/?category=accessories`);
        const data: BackendProduct[] = await res.json();

        const mapped: Product[] = data.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.name,
          price: Number(p.discount_price ?? p.price),
          mrp: Number(p.price),
          image: p.image ?? "",
          category: p.category ? [p.category] : [],
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("ACCESSORIES FETCH ERROR:", err);
      }
    }
    fetchProducts();
  }, []);

  /* ---------------- FILTERING ---------------- */
  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.price <= maxPrice &&
          (selectedCategories.length === 0 ||
            p.category.some((c) => selectedCategories.includes(c)))
      )
      .sort((a, b) =>
        sortBy === "low-high" ? a.price - b.price :
          sortBy === "high-low" ? b.price - a.price : 0
      );
  }, [products, maxPrice, selectedCategories, sortBy]);

  /* ---------------- FILTER PANEL ---------------- */
  const Filters = () => (
    <div className="space-y-8 text-sm">
      <div className="flex justify-between border-b pb-3">
        <h3 className="font-semibold text-base">Filters</h3>
        <button
          onClick={() => {
            setSelectedCategories([]);
            setMaxPrice(MAX_PRICE);
          }}
          className="text-xs font-semibold text-yellow-500"
        >
          CLEAR ALL
        </button>
      </div>

      {/* CATEGORY FILTER */}
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
                    : "border-yellow-300 hover:border-yellow-400"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE FILTER */}
      <div>
        <h4 className="font-semibold mb-3">Price</h4>
        <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
      </div>
    </div>
  );

  /* ========================================================= */
  return (
    <>
      <Navbar />

      {/* ------------ DESKTOP LAYOUT -------------- */}
      <section className="hidden lg:flex fixed inset-0 top-16">
        {/* LEFT FILTERS */}
        <aside className="w-[280px] border-r bg-white overflow-y-auto p-6">
          <Filters />
        </aside>

        {/* RIGHT SIDE */}
        <main className="flex-1 overflow-y-auto bg-white">

          {/* DESKTOP HERO */}
          <div className="border-b bg-white p-10 flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium uppercase text-sm">Accessories</p>
              <h1 className="text-4xl font-extrabold">
                Premium <span className="text-yellow-400">Accessories</span>
              </h1>
            </div>

            <div className="flex items-center border border-yellow-400 rounded-xl overflow-hidden">
              <div className="bg-yellow-300 px-6 py-4">
                <h3 className="font-bold text-black text-lg">Flat 10% OFF</h3>
                <p className="text-xs text-black/70">On Accessories Only</p>
              </div>
              <div className="bg-white px-8">
                <p className="text-xs uppercase text-gray-500">Use Code</p>
                <p className="font-bold text-yellow-500 text-xl tracking-[0.2em]">ACC10</p>
              </div>
            </div>
          </div>

          {/* SORT */}
          <div className="flex justify-end p-4 sticky top-0 bg-white">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 p-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>

          <Footer />
        </main>
      </section>

      {/* ------------ MOBILE & TABLET -------------- */}
      <section className="lg:hidden px-5 mt-10 mb-14">

        {/* MOBILE HERO */}
        <div className="space-y-5 my-6">
          <p className="text-gray-500 uppercase text-sm font-medium">Accessories</p>
          <h1 className="text-3xl font-extrabold">
            Premium <span className="text-yellow-400">Accessories</span>
          </h1>

          
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* ------------ BOTTOM BAR (Filters + Sort) -------------- */}
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Sort Products</h3>
              <button onClick={() => setMobileSortOpen(false)}>✕</button>
            </div>

            <button onClick={() => { setSortBy("low-high"); setMobileSortOpen(false); }} className="w-full text-left py-3">
              Price: Low to High
            </button>
            <button onClick={() => { setSortBy("high-low"); setMobileSortOpen(false); }} className="w-full text-left py-3">
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
