"use client";

import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { CartItem } from "@/types";

type CartMap = Record<string, number>; // { "productId": "quantity" }

type CartContextType = {
  cart: CartMap;
  count: number;
  addToCart: (productId: string) => void;
  subtractFromCart: (productId: string) => void;
  getProductCount: (productId: string) => number;
  setCart: React.Dispatch<React.SetStateAction<CartMap>>;
};

type Props = {
  children: ReactNode;
  cartItems: CartItem[];
};

const CartContext = createContext<CartContextType>({
  cart: {},
  count: 0,
  addToCart: () => {},
  subtractFromCart: () => {},
  getProductCount: () => 0,
  setCart: () => {},
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

  const subtractFromCart = (productId: string) => {
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

  const getProductCount = (productId: string): number => {
    return cart[productId] || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        addToCart,
        subtractFromCart,
        getProductCount,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
