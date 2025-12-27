import Link from "next/link";

const categories = [
  {
    title: "Oversized",
    subtitle: "Relaxed street fits",
    href: "/men?category=Oversized",
    image: "/home/cat-oversized.png",
  },
  {
    title: "Polo",
    subtitle: "Smart casual classics",
    href: "/men?category=Polo",
    image: "/home/cat-polo.png",
  },
  {
    title: "Sports",
    subtitle: "Active & breathable",
    href: "/men?category=Sports",
    image: "/home/cat-sports.png",
  },
  {
    title: "Casual",
    subtitle: "Everyday comfort",
    href: "/men?category=Casual",
    image: "/home/cat-casual.png",
  },
  {
    title: "Round Neck",
    subtitle: "Timeless essentials",
    href: "/men?category=Round Neck",
    image: "/home/cat-roundneck.png",
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-dark mb-6">
        Shop by{" "}
        <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
          Category
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative rounded-xl overflow-hidden h-72 bg-gray-100"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
              <h3 className="text-xl font-semibold text-white">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-200">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
