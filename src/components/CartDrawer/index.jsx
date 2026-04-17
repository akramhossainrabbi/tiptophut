import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { assetsURL } from "../../helper/helper";
import "./style.scss";

const CartDrawer = ({ isOpen, onClose, onOpen }) => {
  const { cartItems, cartCount, summary, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <button
        type="button"
        className={`floating-cart-btn ${isOpen ? "is-hidden" : ""}`}
        onClick={onOpen}
        aria-label="Open cart"
      >
        <i className="ph ph-shopping-cart-simple" />
        {cartCount > 0 && <span className="floating-cart-btn__count">{cartCount}</span>}
      </button>

      <div className={`cart-drawer__overlay ${isOpen ? "show" : ""}`} onClick={onClose} />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <h6 className="mb-0">My Cart</h6>
          <button
            type="button"
            className="cart-drawer__close border-0 bg-transparent"
            onClick={onClose}
            aria-label="Close cart"
          >
            <i className="ph ph-x" />
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="text-center py-32">
              <p className="mb-16 text-gray-600">Your cart is empty</p>
              <Link to="/shop" className="btn btn-main" onClick={onClose}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {cartItems.map((item) => (
                <div className="cart-drawer__item" key={item.id}>
                  <Link
                    to={`/product/${item.product?.slug}`}
                    className="cart-drawer__thumb"
                    onClick={onClose}
                  >
                    <img src={assetsURL + item.product?.thumb} alt={item.product?.name} />
                  </Link>

                  <div className="cart-drawer__item-content">
                    <Link
                      to={`/product/${item.product?.slug}`}
                      className="cart-drawer__name"
                      onClick={onClose}
                    >
                      {item.product?.name}
                    </Link>
                    <p className="cart-drawer__price mb-0">৳{item.price}</p>

                    <div className="cart-drawer__actions">
                      <div className="quantity-control border border-gray-100 rounded-pill p-2 d-flex align-items-center">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="quantity-control__button border-0 bg-transparent h-28 w-28 flex-center text-gray-400"
                        >
                          <i className="ph ph-minus" />
                        </button>
                        <input
                          type="number"
                          className="quantity-control__input border-0 text-center w-36 text-heading fw-semibold"
                          value={item.qty}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="quantity-control__button border-0 bg-transparent h-28 w-28 flex-center text-gray-400"
                        >
                          <i className="ph ph-plus" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-drawer__remove border-0 bg-transparent"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="flex-between mb-12">
            <span className="text-gray-700">Total</span>
            <span className="fw-bold text-main-600">৳{summary?.grand_total || 0}</span>
          </div>
          <Link to="/checkout" className="btn btn-main w-100" onClick={onClose}>
            Proceed to checkout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
