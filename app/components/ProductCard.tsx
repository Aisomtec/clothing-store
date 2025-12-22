"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useShop } from "../context/ShopContext";

type Props = {
  id: number;
  title: string;
  price: number;
  mrp?: number;
  rating?: number;
  reviews?: number;
  image: string;
  hoverImage?: string; // ✅ NEW
  colors?: string[];
  badge?: "NEW" | "SALE" | "";
};

export default function ProductCard({
  id,
  title,
  price,
  mrp,
  rating = 4.5,
  reviews = 120,
  image,
  hoverImage,
  badge,
}: Props) {
  const { toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(id);

  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : null;

  return (
    <Link href={`/product/${id}`} className="block">
      <article
        className="
          group relative bg-white rounded-xl
          border border-gray-100 overflow-hidden
          transition-shadow duration-300
          hover:shadow-md
        "
      >
        {/* BADGE */}
        {badge && (
          <span
            className="
              absolute z-10 top-2 left-2
              text-[10px] font-semibold px-2 py-0.5 rounded
              bg-yellow-300 text-black
            "
          >
            {badge}
          </span>
        )}

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ id, title, price, image });
          }}
          className="
            absolute z-10 top-2 right-2
            bg-white/90 rounded-full p-2
            shadow-sm hover:scale-105 transition
          "
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

        {/* IMAGE WRAPPER */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
          
          {/* BASE IMAGE */}
          <img
            src={image}
            alt={title}
            className="
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-500
              group-hover:opacity-0
            "
          />

          {/* HOVER IMAGE */}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${title} hover`}
              className="
                absolute inset-0 w-full h-full object-cover
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100
              "
            />
          )}

          {/* RATING */}
          <div className="absolute inset-x-2 bottom-2">
            <div className="inline-flex items-center gap-1 bg-white/90 px-2 py-1 rounded-md text-[11px]">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-400">({reviews})</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-1">
          <h4 className="text-sm font-semibold truncate">{title}</h4>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">₹{price}</span>

            {mrp && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{mrp}
                </span>
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
