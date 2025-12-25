const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/* Fetch all products */
export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products/`, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

/* Fetch single product by slug */
export async function getProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/api/products/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
