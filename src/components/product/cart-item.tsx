"use client";

import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { CartItem as CartItemType } from "@/types";
import { Button } from "../ui/button";
import { createCartItem } from "@/actions/cart/create";
import { useCart } from "../providers/cart-provider";
import { deleteCartItem } from "@/actions/cart/delete";

type Props = {
  cartItem: CartItemType;
};

export const CartItemCard = ({ cartItem }: Props) => {
  const { addToCart, subtractFromCart, setCart } = useCart();

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });
  return (
    <div className=" border-b-black border-b-1 py-4 flex items-end relative">
      <img
        className="w-16 h-16 object-cover rounded-md"
        src={getProxiedDownloadUrl(
          `/product/file/${cartItem.product.productImages[0].imageFileName}`,
        )}
        alt={cartItem.product.name}
      />
      <div className="ml-8 flex-col">
        <h3>{cartItem.product.name}</h3>
        <div className="flex items-center">
          {formatter.format(cartItem.product.price).replace(/^Rp\s?/, "Rp")} x
          <Button
            className="ml-2 h-8 w-8"
            onClick={() => {
              subtractFromCart(cartItem.product.id);
              createCartItem({
                data: { productId: cartItem.product.id, removeQuantity: 1 },
              });
            }}
            size={"sm"}
          >
            -
          </Button>
          <span className="mx-2">{cartItem.quantity}</span>
          <Button
            onClick={() => {
              addToCart(cartItem.product.id);
              createCartItem({
                data: { productId: cartItem.product.id, quantity: 1 },
              });
            }}
            size={"sm"}
          >
            +
          </Button>
          <span className="ml-2 flex">
            =
            <p className="ml-2">
              {formatter
                .format(cartItem.product.price * cartItem.quantity)
                .replace(/^Rp\s?/, "Rp")}
            </p>
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          deleteCartItem({ cartItemId: cartItem.id });
          setCart((prev) => {
            const { [cartItem.product.id]: _, ...rest } = prev;
            return rest;
          });
        }}
        className="ml-auto text-gray-500 font-bold top-2 right-2 absolute cursor-pointer"
      >
        x
      </button>
    </div>
  );
};
