import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useMeta } from "../hooks/useMeta";
import { pageMetaTags } from "../utils/metaService";
import { baseURL } from "../utils/constants";
import { assetsURL } from "../helper/helper";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const helmetContent = useMeta(
    pageMetaTags(
      "Brands - TIPTOPHUT",
      "Browse all brands available on TIPTOPHUT and shop products by your favorite brand.",
      {
        keywords: "brands, online shopping, marketplace, TIPTOPHUT",
        canonicalUrl: "https://tiptophut.com/brands",
      }
    )
  );

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/products/brands`);
        if (!res.ok) throw new Error("Failed to load brands");
        const result = await res.json();
        const list = Array.isArray(result?.data) ? result.data : [];
        setBrands(list);
      } catch (error) {
        console.error("Brands fetch error:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <>
      {helmetContent}
      <Breadcrumb title={"All Brands"} />

      <section className="py-80">
        <div className="container container-lg">
          <div className="mb-24">
            <h5 className="mb-0">Browse Brands</h5>
          </div>

          <div className="row g-16">
            {loading &&
              [...Array(12)].map((_, index) => (
                <div key={`brand-skeleton-${index}`} className="col-6 col-md-4 col-lg-3">
                  <div className="border border-gray-100 rounded-12 p-16">
                    <div
                      className="shimmer-base rounded-8"
                      style={{ height: "72px", width: "100%" }}
                    />
                  </div>
                </div>
              ))}

            {!loading &&
              brands.map((brand) => (
                <div key={brand.id} className="col-6 col-md-4 col-lg-3">
                  <Link
                    to={`/brand/${brand.slug}`}
                    className="d-flex flex-column align-items-center justify-content-center border border-gray-100 rounded-12 p-16 hover-border-main-600 transition-1 text-center h-100"
                  >
                    <img
                      src={brand.logo ? assetsURL + brand.logo : `${assetsURL}/images/thumbs/placeholder-brand.png`}
                      alt={brand.name}
                      style={{ maxHeight: "60px", width: "auto" }}
                    />
                    <span className="mt-12 text-gray-900 fw-medium">{brand.name}</span>
                  </Link>
                </div>
              ))}
          </div>

          {!loading && brands.length === 0 && (
            <div className="text-center py-60">
              <p className="text-gray-500 mb-0">No brands found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BrandsPage;
