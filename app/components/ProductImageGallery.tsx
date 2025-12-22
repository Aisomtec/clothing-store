"use client";

import { useState } from "react";

type Props = {
  images: string[];
};

export default function ProductImageGallery({ images }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* THUMBNAILS */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`border rounded-lg overflow-hidden w-16 h-20 ${
              active === i ? "border-brand" : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt="thumb"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={images[active]}
          alt="product"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
