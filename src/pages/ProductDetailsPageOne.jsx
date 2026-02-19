import React, { useEffect, useState } from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import ProductDetailsOne from "../components/ProductDetailsOne";
import NewArrivalTwo from "../components/NewArrivalTwo";
import ShippingOne from "../components/ShippingOne";
import NewsletterOne from "../components/NewsletterOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import BreadcrumbTwo from './../components/BreadcrumbTwo';
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import { useParams } from "react-router-dom";
import timeCounDown from '../helper/timeCounDown';
import { baseURL } from "../helper/helper";

const ProductDetailsPageOne = () => {

  const { id } = useParams();

  const [data, setData] = useState('');

  const [timeLeft, setTimeLeft] = useState(null);
  const fetchProductImages = async () => {
    const url = `${baseURL}/version2/product-by-id/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      const data = result.data;
      setData(data);

      if (data?.hasDeal?.flash_deal?.end_date) {
        setTimeLeft(timeCounDown(data?.hasDeal?.flash_deal?.end_date))
      }

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductImages();
  }, []);

  useEffect(() => {
    if (!data?.hasDeal?.flash_deal?.end_date) return;

    const interval = setInterval(() => {
      setTimeLeft(
        timeCounDown(data?.hasDeal?.flash_deal?.end_date)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);


  return (
    <>

      {/* Preloader */}
      <Preloader />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* HeaderTwo */}
      <HeaderTwo />

      {/* Breadcrumb */}
      <BreadcrumbTwo title={"Product Details"} data={data}/>

      {/* ProductDetailsOne */}
      <ProductDetailsOne data={data} timeLeft={timeLeft} />

      {/* NewArrivalTwo */}
      <NewArrivalTwo />

      {/* ShippingOne */}
      <ShippingOne />

      {/* NewsletterOne */}
      <NewsletterOne />

      {/* FooterTwo */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />



    </>
  );
};

export default ProductDetailsPageOne;
