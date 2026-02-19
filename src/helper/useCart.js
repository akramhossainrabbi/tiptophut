import { useEffect, useState } from "react";
import { baseURL, token, userData } from "./helper";
import { getDeviceToken } from "./deviceToken";

export const useCartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(
          `${baseURL}/cart`,
          {
            headers: {
              "Authorization": `Bearer ${token} || ""`,
              "Accept": "application/json",
            }
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const json = await res.json();
        setCartItems(json.carts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);
  return { cartItems };
}


export const useAddToCart = () => {
  const addToCart = async ({
    productId,
    quantity,
    price,
    seller_id,
  }) => {
    try {
      const res = await fetch(`${baseURL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          product_id: productId,
          qty: quantity,
          price: price,
          product_type: "product",
          device_token: getDeviceToken(),
          seller_id: seller_id,
          user_id: userData?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add item to cart");
      }

      return data;
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  };

  return { addToCart };
};

export const useRemoveFromCart = () => {
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(
        `${baseURL}/cart/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: productId }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to remove item from cart");
      }
      const json = await res.json();
      return json;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return { removeFromCart };
};

export const useUpdateCartItem = () => {
  const updateCartItem = async (productId, quantity) => {
    try {
      const res = await fetch(
        `${baseURL}/cart/update-qty`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: productId, quantity }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update cart item");
      }
      const json = await res.json();
      return json;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return { updateCartItem };
};