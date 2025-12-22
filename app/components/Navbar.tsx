"use client";

import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "New Arrivals", href: "/new" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loginWithGoogle, logout } = useAuth();
  const { cartCount, wishlistCount, searchQuery, setSearchQuery } = useShop();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const lastScrollY = useRef(0);

  /* ---------------- SCROLL SHOW / HIDE ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNav(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- CLOSE MENUS ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  /* ---------------- DEBOUNCE SEARCH ---------------- */
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(localSearch), 300);
    return () => clearTimeout(t);
  }, [localSearch, setSearchQuery]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white border-b transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="font-bold tracking-wide text-lg bg-gradient-to-r
            from-brandGradient-from via-brandGradient-via to-brandGradient-to
            bg-clip-text text-transparent"
          >
            CLOTHING.CO
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-semibold uppercase transition ${
                  isActive(l.href)
                    ? "text-brand"
                    : "text-gray-800 hover:text-brand"
                }`}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* SEARCH (>= md) */}
          <div
            className="hidden md:flex items-center px-4 py-2 rounded-full w-64
            bg-brand/10 focus-within:ring-1 focus-within:ring-brand"
          >
            <Search size={16} className="text-gray-500" />
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products"
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-5 relative">
            <IconButton href="/wishlist" count={wishlistCount}>
              <Heart />
            </IconButton>

            <IconButton href="/cart" count={cartCount}>
              <ShoppingBag />
            </IconButton>

            {/* USER */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-1 text-brand"
                >
                  <User />
                  <ChevronDown size={14} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-lg">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-xl"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle("/account")}
                className="text-brand"
              >
                <User />
              </button>
            )}
          </div>

          {/* MOBILE ICONS */}
          <div className="flex md:hidden items-center gap-4">
            <IconButton href="/wishlist" count={wishlistCount}>
              <Heart size={22} />
            </IconButton>

            <IconButton href="/cart" count={cartCount}>
              <ShoppingBag size={22} />
            </IconButton>

            {/* USER (MOBILE) */}
            {user ? (
              <Link href="/account" className="text-brand">
                <User size={22} />
              </Link>
            ) : (
              <button
                onClick={() => loginWithGoogle("/account")}
                className="text-brand"
              >
                <User size={22} />
              </button>
            )}

            <button onClick={() => setMobileOpen(true)} className="text-brand">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6">
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-6 text-brand"
          >
            <X size={24} />
          </button>

          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products"
            className="w-full bg-gray-100 p-3 rounded mb-8"
          />

          <nav className="flex flex-col gap-6 text-lg font-semibold">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-900 hover:text-brand"
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

/* ---------------- ICON BUTTON ---------------- */

function IconButton({
  href,
  count,
  children,
}: {
  href: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="relative text-brand">
      {children}
      {count > 0 && <span className="badge">{count}</span>}
    </Link>
  );
}
