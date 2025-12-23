"use client";

import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { Button } from "../ui/button";
import { useAuth } from "../providers/auth-provider";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

type Props = {
  products: { data: Product[] };
};

export default function ProductPageClient({ products }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col h-screen ">
      <div className="flex justify-between w-full h-[12%] items-center px-4">
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
      <div className="px-4 mt-4 flex justify-start flex-wrap gap-x-4 border-b-black border-b-2">
        {products.data.map((product) => (
          <div
            key={product.id}
            className="mb-4 p-4 border rounded w-[24%] flex flex-col"
          >
            <img
              className="w-full h-44 object-cover mb-4"
              src={getProxiedDownloadUrl(
                `/product/file/${product.imageFileName}`
              )}
            />
            <h3 className="text-yellow-500">{product.category.name}</h3>
            <p className="line-clamp-2 text-blue-400">{product.name}</p>
            <p className="mt-auto text-green-400">
              {formatter.format(product.price).replace(/^Rp\s?/, "Rp")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
