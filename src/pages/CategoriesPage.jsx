import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useMeta } from "../hooks/useMeta";
import { pageMetaTags } from "../utils/metaService";
import { baseURL } from "../utils/constants";
import { assetsURL } from "../helper/helper";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const helmetContent = useMeta(
    pageMetaTags(
      "Categories - TIPTOPHUT",
      "Browse all product categories on TIPTOPHUT and discover products by category.",
      {
        keywords: "categories, online shopping, marketplace, TIPTOPHUT",
        canonicalUrl: "https://tiptophut.com/categories",
      }
    )
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/version3/category-list`);
        if (!res.ok) throw new Error("Failed to load categories");
        const result = await res.json();
        const list = Array.isArray(result?.data) ? result.data : [];
        setCategories(list);
      } catch (error) {
        console.error("Categories fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {helmetContent}
      <Breadcrumb title={"All Categories"} />

      <section className="py-80">
        <div className="container container-lg">
          <div className="mb-24">
            <h5 className="mb-0">Browse Categories</h5>
          </div>

          <div className="row g-16">
            {loading &&
              [...Array(12)].map((_, index) => (
                <div key={`category-skeleton-${index}`} className="col-6 col-md-4 col-lg-3">
                  <div className="border border-gray-100 rounded-12 p-16">
                    <div
                      className="shimmer-base rounded-circle mx-auto"
                      style={{ height: "64px", width: "64px" }}
                    />
                    <div
                      className="shimmer-base rounded-8 mt-12 mx-auto"
                      style={{ height: "14px", width: "80%" }}
                    />
                  </div>
                </div>
              ))}

            {!loading &&
              categories.map((category) => (
                <div key={category.id} className="col-12 col-lg-6">
                  <div className="border border-gray-100 rounded-12 p-16 h-100">
                    <Link
                      to={`/category/${category.slug}`}
                      className="d-flex align-items-center gap-12 mb-16 hover-text-main-600 transition-1"
                    >
                      <img
                        src={category.category_image ? assetsURL + category.category_image : `${assetsURL}/images/thumbs/placeholder-brand.png`}
                        alt={category.name}
                        style={{ maxHeight: "52px", width: "auto" }}
                      />
                      <span className="text-gray-900 fw-semibold">{category.name}</span>
                    </Link>

                    {Array.isArray(category.sub_categories) && category.sub_categories.length > 0 ? (
                      <div className="d-flex flex-wrap gap-8">
                        {category.sub_categories.map((subCategory) => (
                          <Link
                            key={subCategory.id}
                            to={`/category/${subCategory.slug}`}
                            className="px-12 py-6 rounded-8 border border-gray-100 text-sm text-gray-700 hover-border-main-600 hover-text-main-600 transition-1"
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mb-0">No sub categories</p>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {!loading && categories.length === 0 && (
            <div className="text-center py-60">
              <p className="text-gray-500 mb-0">No categories found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;
