import { listCartItems } from "@/actions/cart/list-cart";
import { CartProvider } from "@/components/providers/cart-provider";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: cartItems } = await listCartItems();

  return <CartProvider cartItems={cartItems}>{children}</CartProvider>;
}
