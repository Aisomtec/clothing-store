"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { useShop } from "../context/ShopContext";
import { Shirt, Layers, Dumbbell, Coffee, Badge } from "lucide-react";

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
const MAX_PRICE = 1500;

const CATEGORY_OPTIONS = [
  "Round Neck",
  "Polo",
  "Oversized",
  "Sports",
  "Casual",
];
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
    colors: ["White", "Black", "Grey"],
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
    colors: ["Black", "Grey", "Brown"],
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
    colors: ["Brown", "Beige", "Olive"],
    fit: "Regular",
    size: ["M", "L", "XL"],
    category: ["Round Neck", "Casual"],
    badge: "SALE",
  },
  {
    id: 4,
    title: "Everyday Olive Tee",
    price: 849,
    mrp: 1099,
    rating: 4.2,
    reviews: 74,
    image: "/men/olive-tee.png",
    color: "Green",
    colors: ["Olive", "Black"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Casual", "Round Neck"],
  },
  {
    id: 5,
    title: "Relaxed Fit Brown Tee",
    price: 949,
    mrp: 1199,
    rating: 4.3,
    reviews: 112,
    image: "/men/brown-tee.png",
    color: "Brown",
    colors: ["Brown", "Beige"],
    fit: "Oversized",
    size: ["M", "L"],
    category: ["Oversized", "Casual"],
  },
  {
    id: 6,
    title: "Street Fit Charcoal Tee",
    price: 1099,
    mrp: 1399,
    rating: 4.6,
    reviews: 158,
    image: "/men/charcoal-tee.png",
    color: "Black",
    colors: ["Charcoal", "Black"],
    fit: "Oversized",
    size: ["L", "XL"],
    category: ["Oversized", "Sports"],
    badge: "NEW",
  },
  {
    id: 7,
    title: "Classic Navy Tee",
    price: 899,
    mrp: 1099,
    rating: 4.1,
    reviews: 63,
    image: "/men/navy-tee.png",
    color: "Blue",
    colors: ["Navy", "White"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Round Neck", "Casual"],
  },
  {
    id: 8,
    title: "Minimal Beige Tee",
    price: 799,
    mrp: 999,
    rating: 4.0,
    reviews: 41,
    image: "/men/beige-tee.png",
    color: "Brown",
    colors: ["Beige", "White"],
    fit: "Slim",
    size: ["S", "M"],
    category: ["Round Neck"],
  },
  {
    id: 9,
    title: "Everyday Red Tee",
    price: 749,
    mrp: 999,
    rating: 4.3,
    reviews: 89,
    image: "/men/red-tee.png",
    color: "Red",
    colors: ["Red", "Black"],
    fit: "Regular",
    size: ["S", "M", "L"],
    category: ["Casual"],
    badge: "SALE",
  },
  {
    id: 10,
    title: "Premium Grey Melange Tee",
    price: 1299,
    mrp: 1499,
    rating: 4.7,
    reviews: 204,
    image: "/men/melange-tee.png",
    color: "Grey",
    colors: ["Grey", "Black"],
    fit: "Regular",
    size: ["M", "L", "XL"],
    category: ["Round Neck"],
    badge: "SALE",
  },
  {
    id: 11,
    title: "Oversized Yellow Sports Tee",
    price: 1049,
    mrp: 1299,
    rating: 4.4,
    reviews: 92,
    image: "/men/yellow-tee.png",
    color: "Yellow",
    colors: ["Yellow", "Black"],
    fit: "Oversized",
    size: ["L", "XL"],
    category: ["Oversized", "Sports"],
    badge: "NEW",
  },
];


/* ---------------- COLOR DOTS ---------------- */
const colorDot: Record<string, string> = {
  White: "bg-white border",
  Black: "bg-black",
  Grey: "bg-gray-400",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Brown: "bg-amber-700",
  Red: "bg-red-500",
  Yellow: "bg-yellow-400",
};

export default function MenPage() {
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

    return menProducts
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
                className={`px-4 py-2 rounded-full border text-sm font-semibold cursor-pointer transition-all duration-200
                  ${active
                    ? "bg-yellow-300 text-black border-yellow-400 shadow-sm"
                    : "bg-white text-gray-900 border-yellow-400 hover:bg-yellow-50"
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
          {["S", "M", "L", "XL"].map((s) => {
            const active = selectedSizes.includes(s);

            return (
              <label
                key={s}
                className={`
            px-4 py-2 rounded-full border
            text-sm font-semibold cursor-pointer
            transition-all duration-200
            ${active
                    ? "bg-yellow-300 text-black border-yellow-400 shadow-sm"
                    : "bg-white text-gray-900 border-yellow-400 hover:bg-yellow-50"
                  }
          `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={active}
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
            );
          })}
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
                className={`
            px-5 py-2.5 rounded-full border
            text-sm font-semibold cursor-pointer
            transition-all duration-200
            ${active
                    ? "bg-yellow-300 text-black border-yellow-400 shadow-sm"
                    : "bg-white text-gray-900 border-yellow-400 hover:bg-yellow-50"
                  }
          `}
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

      {/* ---------------- HERO ---------------- */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-[1fr_auto] items-center gap-10">

            {/* LEFT: TITLE */}
            <div>
              <p className="text-sm font-semibold uppercase text-gray-500">
                Men
              </p>
              <h1 className="text-4xl font-extrabold leading-tight">
                Premium{" "}
                <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-yellow-400">
                  T-Shirts
                </span>
              </h1>
            </div>



            {/* RIGHT: COUPON BANNER */}
            <div className="flex items-center">
              <div className="relative flex w-[840px] rounded-xl border border-yellow-300 overflow-hidden shadow-sm">

                {/* LEFT: YELLOW SECTION */}
                <div className="flex-1 bg-yellow-300 px-10 py-6">
                  <p className="text-[11px] font-semibold tracking-widest text-black uppercase">
                    Special Offer
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-black">
                    Get 10% Cashback
                  </p>

                  <p className="text-xs text-black/70">
                    On all orders
                  </p>
                </div>

                {/* PERFORATION */}
                <div className="relative flex items-center">
                  <div className="h-full border-l border-dashed border-yellow-500" />

                  {/* CUTOUTS */}
                  <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white border border-yellow-300" />
                  <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white border border-yellow-300" />
                </div>

                {/* RIGHT: WHITE SECTION */}
                <div className="bg-white min-w-[420px] px-10 py-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black-500">
                    Use Code
                  </p>

                  <p className="mt-2 text-2xl font-extrabold tracking-[0.25em] text-yellow-400">
                    GETCASH10
                  </p>
                </div>

              </div>
            </div>




          </div>

          {/* MOBILE & TABLET */}
          <div className="lg:hidden">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Men
            </p>
            <h1 className="text-3xl font-extrabold">
              Premium{" "}
              <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
                T-Shirts
              </span>
            </h1>
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

      {/* MOBILE / TABLET */}
      <section className="lg:hidden px-4 ">
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
