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
  price: number;        // selling price
  mrp: number;          // original price
  rating: number;
  reviews: number;
  image: string;
  color: string;        // primary color (for filters)
  colors: string[];     // swatches
  fit: string;
  size: string[];
  category: string[];
  badge?: "NEW" | "SALE" | "";
};


/* ---------------- CONSTANTS ---------------- */
const MIN_PRICE = 300;
const MAX_PRICE = 2500;

const CATEGORY_OPTIONS = [
  "Round Neck",
  "Oversized",
  "Slim Fit",
  "Sports",
  "Casual",
];

/* ---------------- PRODUCTS ---------------- */
const womenProducts: Product[] = [
  {
    id: 1,
    title: "Classic White Tee",
    price: 899,
    mrp: 1199,
    rating: 4.4,
    reviews: 128,
    image: "/women/white-tee.png",
    color: "White",
    colors: ["White", "Black", "Blue"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck", "Casual"],
    badge: "SALE",
  },
  {
    id: 2,
    title: "Oversized Black Tee",
    price: 1199,
    mrp: 1499,
    rating: 4.6,
    reviews: 94,
    image: "/women/black-tee.png",
    color: "Black",
    colors: ["Black", "Brown", "Grey"],
    fit: "Oversized",
    size: ["M", "L", "XL"],
    category: ["Oversized", "Casual"],
    badge: "SALE",
  },
  {
    id: 3,
    title: "Soft Pink Tee",
    price: 999,
    mrp: 1299,
    rating: 4.3,
    reviews: 76,
    image: "/women/pink-tee.png",
    color: "Pink",
    colors: ["Pink", "White"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Slim Fit", "Casual"],
  },
  {
    id: 4,
    title: "Olive Everyday Tee",
    price: 1049,
    mrp: 1399,
    rating: 4.5,
    reviews: 61,
    image: "/women/olive-tee.png",
    color: "Green",
    colors: ["Green", "Brown"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck", "Casual"],
    badge: "NEW",
  },
  {
    id: 5,
    title: "Relaxed Beige Tee",
    price: 1149,
    mrp: 1499,
    rating: 4.2,
    reviews: 52,
    image: "/women/beige-tee.png",
    color: "Brown",
    colors: ["Brown", "White"],
    fit: "Oversized",
    size: ["M", "L"],
    category: ["Oversized"],
  },
  {
    id: 6,
    title: "Active Sports Tee",
    price: 1299,
    mrp: 1699,
    rating: 4.7,
    reviews: 89,
    image: "/women/sports-tee.png",
    color: "Blue",
    colors: ["Blue", "Black"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Sports"],
    badge: "SALE",
  },
  {
    id: 7,
    title: "Classic Navy Tee",
    price: 1099,
    mrp: 1399,
    rating: 4.4,
    reviews: 67,
    image: "/women/navy-tee.png",
    color: "Blue",
    colors: ["Blue", "White"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck"],
  },
  {
    id: 8,
    title: "Mustard Yellow Tee",
    price: 1249,
    mrp: 1599,
    rating: 4.1,
    reviews: 43,
    image: "/women/yellow-tee.png",
    color: "Yellow",
    colors: ["Yellow", "White"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Slim Fit"],
    badge: "NEW",
  },
];

/* ---------------- BEST FOR WOMEN ---------------- */
const BEST_FOR_WOMEN = [
  { title: "Oversized", desc: "Relaxed & trendy", tag: "Oversized" },
  { title: "Slim Fit", desc: "Flattering silhouette", tag: "Slim Fit" },
  { title: "Casual Wear", desc: "Daily essentials", tag: "Casual" },
  { title: "Round Neck", desc: "Classic comfort", tag: "Round Neck" },
  { title: "Sports", desc: "Active lifestyle", tag: "Sports" },
];

/* ---------------- COLOR DOTS ---------------- */
const colorDot: Record<string, string> = {
  White: "bg-white border",
  Black: "bg-black",
  Grey: "bg-gray-400",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Brown: "bg-amber-700",
  Yellow: "bg-yellow-400",
  Pink: "bg-pink-400",
};

export default function WomenPage() {
  const { searchQuery } = useShop();

  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return womenProducts
      .filter(
        (p) =>
          p.price <= maxPrice &&
          (selectedCategories.length === 0 ||
            p.category.some((c) => selectedCategories.includes(c))) &&
          (selectedSizes.length === 0 ||
            p.size.some((s) => selectedSizes.includes(s))) &&
          (selectedFits.length === 0 || selectedFits.includes(p.fit)) &&
          (selectedColors.length === 0 || selectedColors.includes(p.color)) &&
          (q === "" ||
            p.title.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q))
      )
      .sort((a, b) =>
        sortBy === "low-high"
          ? a.price - b.price
          : sortBy === "high-low"
            ? b.price - a.price
            : 0
      );
  }, [
    searchQuery,
    maxPrice,
    selectedCategories,
    selectedSizes,
    selectedFits,
    selectedColors,
    sortBy,
  ]);

  /* ---------------- FILTER PANEL ---------------- */
  const Filters = () => (
    <div className="space-y-8 text-sm">
      <div className="flex justify-between border-b pb-3">
        <h3 className="font-semibold text-base">Filters</h3>
        <button
          onClick={() => {
            setMaxPrice(MAX_PRICE);
            setSelectedSizes([]);
            setSelectedFits([]);
            setSelectedColors([]);
            setSelectedCategories([]);
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

                className={`px-4 py-2 rounded-full text-sm border transition ${active
                  ? `
    bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
    text-black border-transparent shadow
  `
                  : `
    bg-brandGradient-from/15
    border-brandGradient-from/20
    text-gray-800
    hover:border-brandGradient-from
    hover:shadow-sm
  `
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

      {/* SIZE */}
      <div>
        <h4 className="font-semibold mb-3">Size</h4>
        <div className="flex gap-3 flex-wrap">
          {["XS", "S", "M", "L", "XL"].map((s) => (
            <label key={s} className={`px-4 py-2 rounded-full border cursor-pointer text-sm transition
  ${selectedSizes.includes(s)
                ? "bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to text-black border-transparent"
                : "border-brandGradient-from/30 bg-white hover:border-brandGradient-from"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedSizes.includes(s)}
                onChange={() =>
                  setSelectedSizes((prev) =>
                    prev.includes(s)
                      ? prev.filter((x) => x !== s)
                      : [...prev, s]
                  )
                }
              />
              {s}
            </label>
          ))}
        </div>
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
                className={`px-4 py-2 rounded-full text-sm border transition ${active
                  ? `
    bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
    text-black border-transparent shadow
  `
                  : `
    bg-brandGradient-from/15
    border-brandGradient-from/20
    text-gray-800
    hover:border-brandGradient-from
    hover:shadow-sm
  `
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
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
          <p className="text-sm font-semibold uppercase text-gray-500">Women</p>
          <h1 className="text-4xl font-extrabold">
            Premium{" "}
            <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
              T-Shirts
            </span>
          </h1>
        </div>
      </section>

      {/* BEST FOR WOMEN */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Best for{" "}
              <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
                Women
              </span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Curated by comfort, fit & lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {BEST_FOR_WOMEN.map((item) => {
              const active = selectedCategories.includes(item.tag);
              return (
                <button
                  key={item.tag}
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(item.tag) ? [] : [item.tag]
                    )
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
                  <h3 className="text-sm sm:text-base font-semibold">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-0.5 text-xs sm:text-sm ${active ? "text-black/80" : "text-gray-500"
                      }`}
                  >
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP */}
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

          <div className="grid grid-cols-[300px_1fr] gap-10">
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

      {/* MOBILE */}
      <section className="lg:hidden px-4 pb-24">
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

      {/* FILTER DROPUP */}
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

      {/* SORT DROPUP */}
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


      <Footer />
    </>
  );
}
