import React, { useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ProductCard, ProductSkeleton } from "../components/ProductCard";
import useSectionProducts from "../hooks/useSectionProducts";

const SECTION_CONFIG = {
  "top-selling": { title: "Top Selling Products", section: "top_sells" },
  trending: { title: "Trending Products", section: "trending_products" },
  recommended: { title: "Recommended Products", section: "recomanded_products" },
  recent: { title: "Recently Viewed Products", section: "recently_viewed" },
  "flash-deals": { title: "Flash Deals", section: "flash_deal" },
  "all-products": { title: "All Products", section: "" },
};

const SectionProductsPage = () => {
  const { sectionKey } = useParams();
  const selectedConfig = SECTION_CONFIG[sectionKey] || SECTION_CONFIG["all-products"];
  const { products, meta, loading, hasMore, setPage } = useSectionProducts(selectedConfig.section);

  const skeletonCount = useMemo(() => {
    if (!loading) return 0;
    if (!meta) return 8;

    const remaining = meta.total - products.length;
    const pageSize = meta.per_page || 12;
    return remaining > pageSize ? pageSize : remaining > 0 ? remaining : 0;
  }, [loading, meta, products.length]);

  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "400px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  return (
    <>
      <Breadcrumb title={selectedConfig.title} />
      <section className="shop py-80">
        <div className="container container-lg">
          <div className="row g-12">
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                ref={products.length === index + 1 ? lastProductElementRef : null}
                className="col-6 col-lg-4 col-xl-3"
              >
                <ProductCard product={product} />
              </div>
            ))}

            {loading &&
              [...Array(skeletonCount)].map((_, i) => (
                <div key={`section-skeleton-${i}`} className="col-6 col-lg-4 col-xl-3">
                  <ProductSkeleton />
                </div>
              ))}
          </div>

          {!loading && products.length === 0 && (
            <div className="text-center py-60">
              <p className="text-gray-500 mb-0">No products found in this section.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SectionProductsPage;
