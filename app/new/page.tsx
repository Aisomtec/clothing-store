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
  color: string;
  colors?: string[];
  fit: string;
  size: string[];
  category: string[];
  badge?: "NEW" | "SALE" | "";
};

/* ---------------- CONSTANTS ---------------- */
const MAX_PRICE = 3000;

const CATEGORY_OPTIONS = [
  "Oversized",
  "Slim Fit",
  "Casual",
  "Sports",
  "Round Neck",
  "Premium",
];

/* ---------------- NEW ARRIVALS PRODUCTS ---------------- */
const newArrivals: Product[] = [
  {
    id: 101,
    title: "Oversized Sand Tee",
    price: 1299,
    mrp: 1599,
    rating: 4.6,
    reviews: 128,
    image: "/new/sand-tee.png",
    color: "Brown",
    colors: ["Brown", "Beige"],
    fit: "Oversized",
    size: ["M", "L", "XL"],
    category: ["Oversized", "Casual"],
    badge: "NEW",
  },
  {
    id: 102,
    title: "Premium Black Drop Tee",
    price: 1499,
    mrp: 1799,
    rating: 4.7,
    reviews: 92,
    image: "/new/black-drop.png",
    color: "Black",
    colors: ["Black", "Grey"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck", "Premium"],
    badge: "SALE",
  },
  {
    id: 103,
    title: "Active Flex Sports Tee",
    price: 1599,
    mrp: 1899,
    rating: 4.5,
    reviews: 76,
    image: "/new/flex-sports.png",
    color: "Blue",
    colors: ["Blue", "Black"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Sports"],
    badge: "NEW",
  },
  {
    id: 104,
    title: "Soft Rose Slim Tee",
    price: 1399,
    mrp: 1699,
    rating: 4.4,
    reviews: 61,
    image: "/new/rose-slim.png",
    color: "Pink",
    colors: ["Pink", "White"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Slim Fit", "Casual"],
    badge: "NEW",
  },
];

/* ---------------- BEST FOR NEW ---------------- */
const BEST_FOR_NEW = [
  { title: "Trending", desc: "Most loved drops", tag: "SALE" },
  { title: "Oversized", desc: "Relaxed silhouettes", tag: "Oversized" },
  { title: "Premium", desc: "Top fabric picks", tag: "Premium" },
  { title: "Sports", desc: "Performance wear", tag: "Sports" },
];

/* ---------------- COLOR DOTS ---------------- */
const colorDot: Record<string, string> = {
  Black: "bg-black",
  Blue: "bg-blue-500",
  Brown: "bg-amber-700",
  Pink: "bg-pink-400",
  Grey: "bg-gray-400",
};

export default function NewArrivalsPage() {
  const { searchQuery } = useShop();

  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [activeBest, setActiveBest] = useState<string | null>(null);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return newArrivals.filter(
      (p) =>
        p.price <= maxPrice &&
        (activeBest === null ||
          p.category.includes(activeBest) ||
          p.badge === activeBest) &&
        (selectedCategories.length === 0 ||
          p.category.some((c) => selectedCategories.includes(c))) &&
        (selectedFits.length === 0 || selectedFits.includes(p.fit)) &&
        (selectedColors.length === 0 || selectedColors.includes(p.color)) &&
        (q === "" || p.title.toLowerCase().includes(q))
    );
  }, [
    searchQuery,
    maxPrice,
    selectedCategories,
    selectedFits,
    selectedColors,
    activeBest,
  ]);

  /* ---------------- FILTER PANEL ---------------- */
  const Filters = () => (
    <div className="space-y-8 text-sm">
      <div className="flex justify-between border-b pb-3">
        <h3 className="font-semibold text-base">Filters</h3>
        <button
          onClick={() => {
            setMaxPrice(MAX_PRICE);
            setSelectedFits([]);
            setSelectedColors([]);
            setSelectedCategories([]);
            setActiveBest(null);
          }}
          className="text-xs font-semibold bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent"
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
                className={`px-4 py-2 rounded-full border text-sm transition ${active
                    ? "bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to border-transparent"
                    : "border-gray-300 hover:border-gray-400"
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
        <h4 className="font-semibold mb-3">Price Range</h4>
        <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
      </div>

      {/* FIT */}
      <div>
        <h4 className="font-semibold mb-3">Fit</h4>
        <div className="flex gap-3 flex-wrap">
          {["Regular", "Oversized", "Slim"].map((f) => {
            const active = selectedFits.includes(f);
            return (
              <button
                key={f}
                onClick={() =>
                  setSelectedFits((prev) =>
                    prev.includes(f)
                      ? prev.filter((x) => x !== f)
                      : [...prev, f]
                  )
                }
                className={`px-4 py-2 rounded-full border text-sm transition ${active
                    ? "bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to border-transparent"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <h4 className="font-semibold mb-3">Color</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(colorDot).map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedColors.includes(c)}
                onChange={() =>
                  setSelectedColors((prev) =>
                    prev.includes(c)
                      ? prev.filter((x) => x !== c)
                      : [...prev, c]
                  )
                }
              />
              <span className={`w-4 h-4 rounded-full ${colorDot[c]}`} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-sm font-semibold uppercase text-gray-500">
            Just Dropped
          </p>
          <h1 className="text-4xl font-extrabold">
            New{" "}
            <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
              Arrivals
            </span>
          </h1>
        </div>
      </section>

      {/* BEST FOR */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BEST_FOR_NEW.map((item) => {
            const active = activeBest === item.tag;
            return (
              <button
                key={item.tag}
                onClick={() =>
                  setActiveBest(active ? null : item.tag)
                }
                className={`
relative rounded-xl px-4 py-4 sm:px-5 sm:py-5 text-left transition-all duration-200
border cursor-pointer
${active
                    ? `
    bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
    text-black border-transparent shadow-md
  `
                    : `
    bg-brandGradient-from/20
    border-brandGradient-from/20
    hover:border-brandGradient-from
    hover:shadow-sm
  `
                  }
`}

              >
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full 
  bg-brandGradient-from opacity-40" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </section>

      <Footer />
    </>
  );
}
