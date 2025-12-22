"use client";

import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]">
      <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
        {toast.message}
      </div>
    </div>
  );
}
