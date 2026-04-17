import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../utils/constants";

const useSectionProducts = (section = "") => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: "12",
      });

      if (section) {
        params.append("section", section);
      }

      const res = await fetch(`${baseURL}/version3/all-products?${params.toString()}`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);

      const result = await res.json();
      const nextProducts = result.data || [];

      setProducts((prev) => (page === 1 ? nextProducts : [...prev, ...nextProducts]));
      setMeta(result.meta || null);
    } catch (err) {
      console.error("Failed to fetch section products:", err);
      if (page === 1) {
        setProducts([]);
      }
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [page, section]);

  useEffect(() => {
    setPage(1);
  }, [section]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const hasMore = meta ? meta.current_page < meta.last_page : false;

  return { products, meta, loading, hasMore, setPage };
};

export default useSectionProducts;
