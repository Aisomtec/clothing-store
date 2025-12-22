"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

/* ---------------- TYPES ---------------- */

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  size?: string;
};

export type CartItem = Product & {
  qty: number;
};

type ToastType = {
  message: string;
};

type ShopContextType = {
  /* DATA */
  cart: CartItem[];
  wishlist: Product[];

  /* COUNTS */
  cartCount: number;
  wishlistCount: number;

  /* CART ACTIONS (SIZE-AWARE ✅) */
  addToCart: (item: Product) => void;
  increaseQty: (id: number, size?: string) => void;
  decreaseQty: (id: number, size?: string) => void;
  removeFromCart: (id: number, size?: string) => void;
  clearCart: () => void;
  getCartQty: (id: number, size?: string) => number;

  /* WISHLIST */
  toggleWishlist: (item: Product) => void;
  isInWishlist: (id: number) => boolean;

  /* SEARCH */
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  /* TOAST */
  toast: { message: string } | null;
  showToast: (msg: string) => void;
};


/* ---------------- CONTEXT ---------------- */

const ShopContext = createContext<ShopContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [toast, setToast] = useState<ToastType | null>(null);
  const clearCart = () => {
    setCart(prev => (prev.length === 0 ? prev : []));
    showToast("Order placed successfully");
  };



  /* SEARCH */
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- TOAST ---------------- */

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 2000);
  };

  /* ---------------- CART ---------------- */

  const addToCart = (item: Product) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) => p.id === item.id && p.size === item.size
      );

      if (exists) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });

    showToast("Added to cart");
  };


  const increaseQty = (id: number, size?: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size
          ? { ...p, qty: p.qty + 1 }
          : p
      )
    );
  };

  const decreaseQty = (id: number, size?: string) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id && p.size === size
            ? { ...p, qty: p.qty - 1 }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id: number, size?: string) => {
    setCart((prev) =>
      prev.filter((p) => !(p.id === id && p.size === size))
    );
  };


  const getCartQty = (id: number, size?: string) =>
    cart.find((item) => item.id === id && item.size === size)?.qty || 0;


  /* ---------------- WISHLIST ---------------- */

  const toggleWishlist = (item: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      }
      showToast("Added to wishlist");
      return [...prev, item];
    });
  };

  const isInWishlist = (id: number) =>
    wishlist.some((p) => p.id === id);

  /* ---------------- COUNTS ---------------- */

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const wishlistCount = wishlist.length;

  /* ---------------- PROVIDER VALUE ---------------- */

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,

        cartCount,
        wishlistCount,

        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        getCartQty,

        toggleWishlist,
        isInWishlist,

        searchQuery,
        setSearchQuery,

        toast,
        showToast,
      }}
    >
      {children}

      {/* TOAST UI */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]">
          <div className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full shadow-xl animate-slideUp">
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </ShopContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return ctx;
}
