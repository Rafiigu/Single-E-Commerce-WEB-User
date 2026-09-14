"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../providers/cart-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { listCartItems } from "@/actions/cart/list-cart";
import { CartItem } from "@/types";
import { CartItemCard } from "./cart-item";
import { Button } from "../ui/button";

export const Cart = () => {
  const { count, cart } = useCart();
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const fetchAsync = async () => {
      if (open) {
        const { data } = await listCartItems();
        setCartItems(data);
      }
    };

    fetchAsync();
  }, [open, cart]);

  const isCartEmpty = cartItems.length === 0;
  return (
    <div>
      <Popover open={isCartEmpty ? false : open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className={isCartEmpty ? undefined : "cursor-pointer"}>
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {count}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="position: absolute top-6 -right-30 w-130 h-85 overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} cartItem={item} />
            ))}
          </div>
          <div
            className={
              cartItems.length <= 2
                ? "absolute bottom-5 right-5"
                : "flex justify-end mt-5"
            }
          >
            <Link href="/account/checkout">
              <Button className="min-w-[140px] px-5 py-2.5">Checkout</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
