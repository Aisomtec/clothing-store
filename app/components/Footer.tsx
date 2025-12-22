import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-white border-t-2 border-brand-400">
      {/* TOP */}
      <div
        className="
          max-w-7xl mx-auto
          px-6 md:px-8 lg:px-12
          py-14
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-10
        "
      >
        {/* BRAND */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <h3 className="font-extrabold text-lg tracking-wide text-dark">
            CLOTHING<span className="text-brand-400">.CO</span>
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Minimal premium essentials crafted for everyday comfort, timeless
            style, and long-lasting wear.
          </p>

          <div className="flex gap-4">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="
                  p-2 rounded-full border border-gray-200
                  text-gray-600 hover:text-black hover:border-brand-400
                  transition
                "
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-800 mb-4">
            Shop
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/men" className="hover:text-black">Men</Link></li>
            <li><Link href="/women" className="hover:text-black">Women</Link></li>
            <li><Link href="/accessories" className="hover:text-black">Accessories</Link></li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-800 mb-4">
            Support
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/shipping" className="hover:text-black">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
            <li><Link href="/size-guide" className="hover:text-black">Size Guide</Link></li>
            <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-800 mb-4">
            Stay in the Loop
          </h4>

          <p className="text-sm text-gray-600 mb-4">
            Get early access to drops, offers & style updates.
          </p>

          <form className="flex rounded-full overflow-hidden border border-gray-300 max-w-sm">
            <input
              type="email"
              placeholder="Your email"
              className="
                flex-1 px-4 py-2 text-sm
                outline-none bg-white
              "
            />
            <button
              type="submit"
              className="
                px-2 text-sm font-semibold
                bg-brand-400 text-black
                hover:bg-brand-400/90
                transition
              "
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t">
        <div
          className="
            max-w-7xl mx-auto
            px-6 md:px-8 lg:px-12
            py-4
            flex flex-col sm:flex-row
            items-center justify-between
            gap-3
            text-xs text-gray-500
          "
        >
          <span>
            © {new Date().getFullYear()} CLOTHING.CO — All rights reserved
          </span>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black">
              Privacy
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
