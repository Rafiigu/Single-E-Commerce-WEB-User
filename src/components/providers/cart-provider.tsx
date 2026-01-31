"use client";

import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { useAuth } from "./auth-provider";
import { CartItem } from "@/types";

type CartMap = Record<string, number>; // { "productId": "quantity" }

type CartContextType = {
  carts: CartMap;
  count: number;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  getProductCount: (productId: string) => number;
};

type Props = {
  children: ReactNode;
  cartItems: CartItem[];
};

const CartContext = createContext<CartContextType>({
  carts: {},
  count: 0,
  increment: () => {},
  decrement: () => {},
  getProductCount: () => 0,
});

export const CartProvider = ({ cartItems, children }: Props) => {
  const { user } = useAuth();

  const [carts, setCarts] = useState<CartMap>({});

  const count = useMemo(() => {
    return Object.values(carts).reduce(
      (total, qty) => total + qty,
      cartItems.length > 0 ? cartItems.length : 0,
    );
  }, [carts]);
  const increment = (productId: string) => {
    setCarts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrement = (productId: string) => {
    setCarts((prev) => {
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
    return carts[productId] || 0;
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        count,
        increment,
        decrement,
        getProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
