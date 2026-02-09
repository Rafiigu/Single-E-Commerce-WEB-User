"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { useCart } from "../providers/cart-provider";
import { Cart } from "../product/cart";

export const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { count } = useCart();
  console.log("Header - Cart Count:", count);

  return (
    <header className="bg-white sticky top-0 flex justify-around w-full border-b border-b-neutral-100">
      <div className="flex justify-between items-center w-full h-16 px-4 max-w-[1440px]">
        <h2>E Commerce</h2>
        {user ? (
          <div className="flex gap-x-5 items-center">
            <h3>Hello, {user.name}</h3>
            <div className="relative">
              <Cart />
            </div>
            <Button
              onClick={async () => {
                await logout();
                router.replace("/");
                router.refresh();
              }}
              variant={"outline"}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              router.replace("/login");
            }}
            variant={"outline"}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};
