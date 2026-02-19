import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assetsURL, baseURL } from '../helper/helper';

const PromotionalOne = () => {
    const [categories, setCategories] = useState([]);
        
            useEffect(() => {
                const fetchData = async () => {
                    const url = `${baseURL}/homepage-data`;
        
                    try {
                        const response = await fetch(url);
        
                        if (!response.ok) {
                            throw new Error(`Response status: ${response.status}`);
                        }
                        const result = await response.json();
                        const Featured = result.top_categories;
                        setCategories(Featured); 
                    } catch (error) {
                        console.error(error.message);
                    }
                };
        
                fetchData();
            }, []);

    return (
        <section className="promotional-banner pt-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    {categories && categories.map((item, index) => (
                        <div key={index} className="col-xl-3 col-sm-6 col-xs-6">
                            <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
                                <img
                                    src={assetsURL + item.image}
                                    alt={item.name}
                                    className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
                                />
                                <div className="promotional-banner-item__content">
                                    <h6 className="promotional-banner-item__title text-32">
                                        {item.name}
                                    </h6>
                                    <Link
                                        to="/shop"
                                        className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                                    >
                                        Shop Now
                                        <span className="icon text-xl d-flex">
                                            <i className="ph ph-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>

    )
}

export default PromotionalOne