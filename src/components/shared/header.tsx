"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { useCart } from "../providers/cart-provider";
import { Cart } from "../product/cart";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Menu } from "../product/ellipsis";

export const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { count } = useCart();
  console.log("Header - Cart Count:", count);

  const userBalance = user?.balance || 0;

  return (
    <header className="bg-white sticky top-0 flex justify-around w-full border-b border-b-neutral-100">
      <div className="flex justify-between items-center w-full h-16 px-4 max-w-[1440px]">
        <h2 className="flex-shrink-0 mr-2">E Commerce</h2>
        {user ? (
          <div className="flex gap-x-5 items-center">
            <Button
              className="max-sm:hidden"
              onClick={() => {
                router.push("/account/me");
              }}
              variant={"outline"}
            >
              <h3 className="">Hello, {user.name}</h3>
            </Button>
            <Button
              variant="outline"
              className="w-50 max-sm:hidden"
              onClick={() => router.push("/account/top-up-history")}
            >
              Balance:{" "}
              {userBalance.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 2,
              })}
            </Button>
            <div className="relative">
              <div className="max-sm:hidden">
                <Cart />
              </div>
              <div className="sm:hidden">
                <Link href="/cart" className="relative">
                  <ShoppingCart />
                  {count > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            <Menu />
            <Button
              className="max-sm:hidden"
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
