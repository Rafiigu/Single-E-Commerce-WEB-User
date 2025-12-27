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
        {products.data.map((product) => (
          <div
            key={product.id}
            className="mb-4 p-4 border rounded w-[20%] flex flex-col gap-y-1"
          >
            <div>
              <img
                onClick={() => handleClick(product.imageFileName)}
                className="w-full h-65 object-cover mb-4 rounded"
                src={getProxiedDownloadUrl(
                  `/product/file/${product.imageFileName}`
                )}
              />

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTitle></DialogTitle>
                <DialogContent
                  showCloseButton={false}
                  className="flex items-center justify-center h-100 w-100 p-0 bg-transparent border-none shadow-none"
                >
                  {selectedImage && (
                    <img
                      src={getProxiedDownloadUrl(
                        `/product/file/${selectedImage}`
                      )}
                      className="h-full w-full rounded-lg"
                    />
                  )}
                </DialogContent>
              </Dialog>
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
        ))}
      </div>
    </div>
  );
}
