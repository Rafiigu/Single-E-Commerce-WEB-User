"use server";

import { listCartItems } from "@/actions/cart/list-cart";
import { Button } from "../ui/button";
import { getProxiedDownloadUrl } from "@/lib/download/get-proxied-download-url";
import { CheckoutButton } from "./checkout-button";

export const OrderSummary = async () => {
  const { data } = await listCartItems();
  const total =
    data.reduce((acc, item) => acc + item.product.price * item.quantity, 3000) *
    1.11;
  return (
    <div className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md max-w-88 h-fit">
      <Button className="bg-gray-200 text-gray-600 rounded-sm cursor-none pointer-events-none">
        Order Summary
      </Button>
      <div className="flex flex-col gap-y-8">
        {data.map((item) => (
          <div className="flex gap-x-4" key={item.id}>
            <div className="relative">
              <img
                className="w-20 h-20 rounded-sm flex-shrink-0 object-cover "
                src={getProxiedDownloadUrl(
                  `/product/file/${item.product.productImages[0].imageFileName}`,
                )}
              />
              <span className="absolute top-[-10px] right-[-10px] bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex justify-between w-50 items-center">
              <div className="flex flex-col gap-y-1">
                <span className="text-gray-700">{item.product.name}</span>
                <span className="text-gray-500">
                  {item.product.category.name}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-600">
                Rp {item.product.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        <div className="border-t-2 border-gray-300 pt-4 flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">
              items({data.reduce((acc, item) => acc + item.quantity, 0)}):
            </span>
            <span className="text-md font-semibold text-gray-600">
              Rp{" "}
              {data
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0,
                )
                .toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Ongkos Pengiriman:</span>
            <span className="text-md font-semibold text-gray-600">
              Rp 3.000
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Sebelum Pajak:</span>
            <span className="text-md font-bold text-gray-600">
              Rp{" "}
              {data
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  3000,
                )
                .toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Pajak (11%):</span>
            <span className="text-md font-bold text-gray-600">
              Rp{" "}
              {(
                data.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  3000,
                ) * 0.11
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="border-t-2 gap-y-8 border-gray-300 pt-4 flex flex-col justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-700 text-lg font-semibold">
              Order Total:
            </span>
            <span className="text-lg font-bold text-gray-600">
              Rp {total.toLocaleString()}
            </span>
          </div>
          <CheckoutButton total={total} />
        </div>
      </div>
    </div>
  );
};
