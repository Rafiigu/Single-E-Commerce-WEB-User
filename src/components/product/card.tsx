"use client";

import { createWishlist } from "@/actions/wishlist/create";
import { deleteWishlist } from "@/actions/wishlist/delete";
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { Product } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCart } from "../providers/cart-provider";
import { createCartItem } from "@/actions/cart/create";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isWishlist, setIsWishlist] = useState(
    product.wishlists && product.wishlists.length > 0
      ? product.wishlists.find((wishlist) => wishlist.userId === user?.id) !==
          null
      : false,
  );

  useEffect(() => {
    setIsWishlist(
      product.wishlists && product.wishlists.length > 0
        ? product.wishlists.find((wishlist) => wishlist.userId === user?.id) !==
            null
        : false,
    );
  }, [product.wishlists, user]);

  const router = useRouter();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const toggleWishlist = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isWishlist) {
      await deleteWishlist({ productId: product.id });
    } else {
      await createWishlist({ productId: product.id });
    }
    setIsWishlist(!isWishlist);
  };

  return (
    <div
      key={product.id}
      className="mb-4 p-4 border rounded w-full flex gap-x-6"
    >
      <div>
        {product.productImages && product.productImages.length > 0 ? (
          <img
            className="w-35 h-35 rounded"
            src={getProxiedDownloadUrl(
              `/product/file/${product.productImages[0].imageFileName}`,
            )}
          />
        ) : (
          <div className="w-35 h-35 rounded bg-neutral-200"></div>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <div className="flex justify-between w-full">
          <p className="line-clamp-2 text-shadow-black text-lg">
            {product.name}
          </p>
          <Star
            className={cn(
              "cursor-pointer",
              isWishlist ? "fill-yellow-300" : "",
            )}
            onClick={async () => {
              await toggleWishlist();
            }}
          />
        </div>
        <h3 className="text-md text-muted-foreground mb-1">
          {product.category.name}
        </h3>
        <p className="font-semibold text-base mb-7">
          {formatter.format(product.price).replace(/^Rp\s?/, "Rp")}
        </p>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {format(new Date(product.updatedAt), "MM/dd/yyyy")}
          </p>
          {user ? (
            <Button
              onClick={() => {
                addToCart(product.id);
                createCartItem({
                  data: { productId: product.id, quantity: 1 },
                });
              }}
              size={"sm"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <p>Add to Cart</p>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
