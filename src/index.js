import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { SettingsProvider } from "./context/SettingsContext";
import App from "./App";

// Defer non-critical JavaScript loading
if (typeof window !== 'undefined') {
  // Load Bootstrap after React renders
  setTimeout(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, 0);
  
  // Load Select2 after React renders
  setTimeout(() => {
    import('select2/dist/js/select2.min.js');
  }, 0);
}

// Add loading fallback
const LoadingFallback = () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <SettingsProvider>
                  <App />
                </SettingsProvider>
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>
);
