"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../providers/cart-provider";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { listCartItems } from "@/actions/cart/list-cart";
import { CartItem } from "@/types";

export const Cart = () => {
  const { count } = useCart();
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
  }, [open]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {count}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="position: absolute top-6 -right-30 w-80 h-95">
          <div>Test</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
