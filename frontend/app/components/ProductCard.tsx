"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useShop } from "../context/ShopContext";

type Props = {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp?: number;
  rating?: number;
  reviews?: number;
  image: string;
  hover_image?: string; // from backend (hover_image)
  colors?: string[];
  badge?: "NEW" | "SALE" | "";
  category?: string[];
};

export default function ProductCard({
  id,
  slug,
  title,
  price,
  mrp,
  rating = 4.5,
  reviews = 120,
  image,
  hover_image,
  badge,
}: Props) {

  const { toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(id);

  const fallback = "/placeholder.png";
  const mainImg = image || fallback;

  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : null;

  return (
    <Link href={`/product/${slug}`} className="block">
      <article
        className="group relative bg-white rounded-xl border border-gray-100 
                   overflow-hidden transition hover:shadow-md duration-300"
      >
        {/* BADGE */}
        {badge && (
          <span className="absolute top-2 left-2 z-10 bg-yellow-300 text-black 
                            text-[10px] font-semibold px-2 py-0.5 rounded">
            {badge}
          </span>
        )}

        {/* ❤️ WISHLIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ id, title, price, image: mainImg });
          }}
          className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-2 shadow-sm 
                     hover:scale-105 transition"
        >
          <Heart
            size={16}
            className={
              wishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
          />
        </button>

        {/* 🖼️ IMAGE */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
          <img
            src={mainImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover 
                       transition-opacity duration-500 group-hover:opacity-0"
          />

          {hover_image && (
            <img
              src={hover_image}
              alt={`${title} hover`}
              className="absolute inset-0 w-full h-full object-cover 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* ⭐ RATING */}
          <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md 
                          text-[11px] inline-flex items-center gap-1 ">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-400">({reviews})</span>
          </div>
        </div>

        {/* 📄 CONTENT */}
        <div className="p-3 space-y-1">
          <h4 className="text-sm font-semibold truncate">{title}</h4>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">₹{price}</span>

            {mrp && (
              <>
                <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
                {discount && (
                  <span className="text-xs font-semibold text-green-600">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
