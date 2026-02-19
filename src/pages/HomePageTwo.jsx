import React from "react";
import Slider from '../components/Slider';
import ShippingTwo from "../components/ShippingTwo";
import NewsletterTwo from "../components/NewsletterTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import FeaturedCategories from "../components/FeaturedCategories";
import FlashDeal from "../components/FlashDeal";
import TrendingProducts from "../components/TrendingProduts";
import TopSelling from "../components/TopSelling";
import RecommendedProducts from "../components/RecommendedProducts";
import RecentlyViewed from "../components/RecentlyViewed";
import FeaturedBrands from "../components/FeaturedBrands";
import Header from "../components/Common/Header";

const HomePageTwo = () => {


  return (

    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />


      {/* Header */}
      <Header
        variant="one"
        settings={{
          general_setting: {
            logo: "/custom/logo.png",
            phone: "+880 1711 223344",
            siteName: "My Shop"
          },
          showTopBar: true, // Show/hide top bar
          showPhone: true,  // Show/hide phone number
          showLanguage: true, // Hide language (already static)
          showCurrency: true, // Hide currency (already static)
          showWishlist: true,
          showCompare: false, // Only for variant two
          menuItems: [
            {
              title: "Home",
              path: "/",
              hasSubmenu: false
            },
            {
              title: "Products",
              path: "#",
              hasSubmenu: true,
              submenu: [
                { title: "All Products", path: "/products" },
                { title: "Categories", path: "/categories" },
                { title: "Featured", path: "/featured" }
              ]
            },
            {
              title: "About Us",
              path: "/about",
              hasSubmenu: false
            }
          ]
        }}
      />

      {/* BannerTwo */}
      <Slider />

      {/* FeaturedCategories */}
      <FeaturedCategories />

      {/* FlashDeal */}
      <FlashDeal />

      {/* TopSelling */}
      <TopSelling />

      {/* TrendingProducts */}
      <TrendingProducts />

      {/* DiscountOne */}
      {/* <DiscountOne /> */}

      {/* FeaturedOne */}
      {/* <FeaturedOne /> */}

      {/* BigDealOne */}
      {/* <BigDealOne /> */}

      {/* RecommendedProducts */}
      <RecommendedProducts />

      {/* PopularProductsOne */}
      {/* <PopularProductsOne /> */}

      {/* TopVendorsTwo */}
      {/* <TopVendorsTwo /> */}

      {/* DaySaleOne */}
      {/* <DaySaleOne /> */}

      {/* RecentlyViewed */}
      <RecentlyViewed />

      {/* FeaturedBrands */}
      <FeaturedBrands />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* NewsletterTwo */}
      <NewsletterTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default HomePageTwo;
