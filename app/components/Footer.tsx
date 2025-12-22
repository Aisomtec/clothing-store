import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div
        className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-12
        grid
        grid-cols-2
        md:grid-cols-2
        lg:grid-cols-4
        gap-8
      "
      >
        {/* BRAND — FULL WIDTH ON MOBILE */}
        <div className="col-span-2 lg:col-span-1 space-y-4">
          <h3 className="font-bold text-lg tracking-wider bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
            CLOTHING.CO
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            Minimal premium essentials. Designed and curated for timeless style,
            comfort, and everyday wear.
          </p>

          <div className="flex gap-4">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <Link key={i} href="#">
                <Icon className="w-5 h-5 text-gray-600 hover:text-black transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/men" className="hover:text-black">Men</Link></li>
            <li><Link href="/women" className="hover:text-black">Women</Link></li>
            <li><Link href="/new" className="hover:text-black">New Arrivals</Link></li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide">
            Customer Care
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/shipping" className="hover:text-black">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
            <li><Link href="/size-guide" className="hover:text-black">Size Guide</Link></li>
            <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER — FULL WIDTH ON MOBILE */}
        <div className="col-span-2 lg:col-span-1">
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe for early access to drops, sales, and style updates.
          </p>

          <form className="flex max-w-sm">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="
                px-4 py-2 text-sm font-semibold rounded-r-md text-black
                bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to
                hover:opacity-90 transition
              "
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t">
        <div
          className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-4
          flex
          flex-col sm:flex-row
          items-center
          justify-between
          gap-3
          text-sm text-gray-500
        "
        >
          <span>
            © {new Date().getFullYear()} CLOTHING.CO — All rights reserved
          </span>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
