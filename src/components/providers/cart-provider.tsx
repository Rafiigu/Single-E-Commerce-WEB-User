"use client";

import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { CartItem } from "@/types";

type CartMap = Record<string, number>; // { "productId": "quantity" }

type CartContextType = {
  cart: CartMap;
  count: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  removeAllFromCart: (productId: string) => void;
  getProductCount: (productId: string) => number;
};

type Props = {
  children: ReactNode;
  cartItems: CartItem[];
};

const CartContext = createContext<CartContextType>({
  cart: {},
  count: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  getProductCount: () => 0,
});

export const CartProvider = ({ cartItems, children }: Props) => {
  const [cart, setCart] = useState<CartMap>(() => {
    const map: CartMap = {};
    cartItems.forEach((item) => {
      if (!map[item.product.id]) {
        map[item.product.id] = item.quantity;
      } else {
        map[item.product.id] += item.quantity;
      }
    });
    return map;
  });

  const count = useMemo(() => {
    return Object.keys(cart).length;
  }, [cart]);

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: current - 1,
      };
    });
  };

  const removeAllFromCart = (productId: string) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const getProductCount = (productId: string): number => {
    return cart[productId] || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        getProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
