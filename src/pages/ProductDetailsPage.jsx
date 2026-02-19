import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";
import BreadcrumbTwo from '../components/BreadcrumbTwo';
import { ProductDetails, DetailsSkeleton } from "../components/ProductDetails";

const ProductDetailsPage= () => {
    const { slug } = useParams();
    const { product, loading, timeLeft } = useProductDetails(slug);

    return (
        <>
            <BreadcrumbTwo title={"Product Details"} data={product} />

            {loading ? (
                <DetailsSkeleton />
            ) : product ? (
                <ProductDetails product={product} timeLeft={timeLeft} />
            ) : (
                <div className="py-80 text-center">
                    <h4>Product Not Found</h4>
                </div>
            )}
        </>
    );
};

export default ProductDetailsPage;