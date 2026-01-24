"use client";

import { createWishlist } from "@/actions/wishlist/create";
import { deleteWishlist } from "@/actions/wishlist/delete";
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { Product } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { user } = useAuth();
  const isWishlisted = product.wishlists?.map((wishlist) => {
    if (wishlist.userId === user?.id) {
      return true;
    } else {
      return false;
    }
  });
  console.log("Is wishlisted:", isWishlisted);
  const [isWishlist, setIsWishlist] = useState(
    isWishlisted?.includes(true) || false,
  );
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
      className="mb-4 p-4 border rounded w-[80%] flex gap-x-6"
    >
      <div>
        <img
          className="w-35 h-35 mb-4 rounded"
          src={getProxiedDownloadUrl(
            `/product/file/${product.productImages[0].imageFileName}`,
          )}
        />
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
        <p className="text-sm text-muted-foreground">
          {format(new Date(product.updatedAt), "MM/dd/yyyy")}
        </p>
      </div>
    </div>
  );
};
