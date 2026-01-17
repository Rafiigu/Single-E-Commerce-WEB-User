"use client";

import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { Button } from "../ui/button";
import { useAuth } from "../providers/auth-provider";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

type Props = {
  products: { data: Product[] };
};

export default function ProductPageClient({ products }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col h-screen ">
      <div className="flex justify-between w-full h-24 items-center px-4">
        <h2>E Commerce</h2>
        {user ? (
          <div className="flex gap-x-5 items-center">
            <h3>Hello, {user.name}</h3>{" "}
            <Button
              onClick={async () => {
                await logout();
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
      <div className="px-4 mt-4 flex justify-start flex-wrap gap-x-4 shadow-sm">
        {products.data.map((product) => {
          console.log(product.productImages[0].imageFileName);
          return (
            <div
              key={product.id}
              className="mb-4 p-4 border rounded w-[20%] flex flex-col gap-y-1"
            >
              <div className="relative">
                <img
                  onClick={() =>
                    handleClick(product.productImages[0].imageFileName)
                  }
                  className="w-full h-65 object-cover mb-4 rounded"
                  src={getProxiedDownloadUrl(
                    `/product/file/${product.productImages[0].imageFileName}`,
                  )}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  width="24"
                  height="24"
                  fill="#000000"
                  className="absolute top-2 right-2"
                >
                  <path d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3M664.8 561.6l36.1 210.3L512 672.7L323.1 772l36.1-210.3l-152.8-149L417.6 382L512 190.7L606.4 382l211.2 30.7z" />
                </svg>
              </div>
              <h3 className="text-blue-700 font-normal text-xl">
                {product.category.name}
              </h3>
              <p className="line-clamp-2 text-shadow-black font-medium text-base h-12">
                {product.name}
              </p>
              <p className="text-blue-600 font-semibold text-2xl">
                {formatter.format(product.price).replace(/^Rp\s?/, "Rp")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
