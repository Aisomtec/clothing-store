const items = [
  {
    title: "Premium Fabrics",
    desc: "100% cotton, breathable and long-lasting.",
  },
  {
    title: "Modern Fits",
    desc: "Designed for everyday Indian body types.",
  },
  {
    title: "Easy Returns",
    desc: "30-day hassle-free returns.",
  },
  {
    title: "Made Responsibly",
    desc: "Ethical sourcing & production.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title}>
            <h4 className="font-semibold text-dark">
              <span className="bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent">
                {item.title}
              </span>
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
