import { Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import WishlistPage from "./pages/WishlistPage";
import { ToastContainer } from "react-toastify";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import ColorInit from "./helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import Header from "./components/Common/Header";
import ShippingTwo from "./components/ShippingTwo";
import NewsletterTwo from "./components/Common/Newsletter";
import FooterTwo from "./components/Common/Footer";
import BottomFooter from "./components/Common/BottomFooter";

function App() {
  
  return (
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />
      <ToastContainer />
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />


      {/* Header */}
      <Header
        settings={{
          showTopBar: true, // Show/hide top bar
          showPhone: true,  // Show/hide phone number
          showLanguage: true, // Hide language (already static)
          showCurrency: true, // Hide currency (already static)
          showWishlist: false,
          showCompare: false,
          menuItems: [
            {
              title: "Home",
              path: "/",
              hasSubmenu: false
            },
            // {
            //   title: "Products",
            //   path: "#",
            //   hasSubmenu: true,
            //   submenu: [
            //     { title: "All Products", path: "/products" },
            //     { title: "Categories", path: "/categories" },
            //     { title: "Featured", path: "/featured" }
            //   ]
            // },
            // {
            //   title: "About Us",
            //   path: "/about",
            //   hasSubmenu: false
            // },
            {
              title: "Contact",
              path: "/contact",
              hasSubmenu: false
            }
          ]
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Unified Shop Routes */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/category/:slug" element={<ShopPage type="category" />} />
        <Route path="/brand/:slug" element={<ShopPage type="brand" />} />
        <Route path="/tag/:slug" element={<ShopPage type="tag" />} />

        {/* Product Details - Changed :id to :slug to match your getMenuLink logic */}
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<AccountPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

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
}

export default App;