import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseURL } from '../helper/helper';
import { useAddToCart } from '../helper/useCart';
import { toast } from 'react-toastify';



const ProductListOne = () => {
    const [data, setData] = useState([]);
    const { addToCart } = useAddToCart();
    const [loading, setLoading] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const url = `${baseURL}/homepage-data`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const products = result.flash_deal.AllProducts;
                setData(products);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = async (item) => {
        setLoading(true);
        setCartMessage("");

        try {
            const response = await addToCart({
                productId: item.product?.id,
                quantity: 1,
                price: item.product?.max_sell_price,
                seller_id: item.product?.user_id,
            });

            setCartMessage(response.message || "Added to cart");

            toast.success(cartMessage, {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });

        } catch (error) {
            setCartMessage(error.product_id || "Failed to add item");

            toast.error(cartMessage || "Add to cart failed", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="product mt-24">
            <div className="container container-lg">
                <div className="row gy-4 g-12">
                    {data && data.map((item, index) => (
                        <div key={index} className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                            <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
                                >
                                    Add <i className="ph ph-shopping-cart" />
                                </button>
                                <Link
                                    to="/product-details"
                                    className="product-card__thumb flex-center"
                                ><img src={item.product?.product?.thumbnail_image_source || "/assets/no-image.png"} alt="" />

                                </Link>
                                <div className="product-card__content mt-12">
                                    <div className="product-card__price mb-16">
                                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                            {item.product?.max_sell_price ?? "N/A"}
                                        </span>
                                        <span className="text-heading text-md fw-semibold ">
                                            {item.product?.min_sell_price ?? "N/A"}{" "}
                                            <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                        </span>
                                    </div>
                                    <div className="flex-align gap-6">
                                        <span className="text-xs fw-bold text-gray-600">{item.product?.avg_rating}</span>
                                        <span className="text-15 fw-bold text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-bold text-gray-600">{item.product?.rating}</span>
                                    </div>
                                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                        <Link to={`/product-details/${item?.product?.id}`} className="link text-line-2" >
                                            {item.product?.product_name}
                                        </Link>
                                    </h6>
                                    <div className="mt-12">
                                        <div
                                            className="progress w-100  bg-color-three rounded-pill h-4"
                                            role="progressbar"
                                            aria-label="Basic example"
                                            aria-valuenow={35}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div
                                                className="progress-bar bg-main-600 rounded-pill"
                                                style={{ width: "35%" }}
                                            />
                                        </div>
                                        <span className="text-gray-900 text-xs fw-medium mt-8">
                                            Sold: {item.product?.total_sale}/35
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    )
}

export default ProductListOne