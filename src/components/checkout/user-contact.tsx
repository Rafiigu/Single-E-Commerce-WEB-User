"use client";

import { useCheckout } from "../providers/checkout-provider";
import { ArrowBackButton } from "../top-up-history/arrow-back-button";
import { Input } from "../ui/input";

export const UserContact = () => {
  const { checkout, updateCheckout } = useCheckout();
  console.log("checkout", checkout);

  return (
    <div className="flex flex-col gap-y-6 mt-4">
      <div className="flex items-center gap-x-2">
        <ArrowBackButton />
        <h1 className="text-2xl font-bold">Check Out</h1>
      </div>

      <span className="text-sm text-gray-500">
        Checkout adalah tempat Anda membayar barang-barang yang Anda beli.
      </span>

      <div className="ml-2 flex flex-col gap-y-6">
        <div>
          <label>1. Nama Penerima</label>
          <Input
            className="mt-2 w-full"
            placeholder="Nama Penerima"
            value={checkout.receiverName}
            onChange={(event) => updateCheckout("receiverName", event.target.value)}
          />
        </div>

        <div>
          <label>2. Nomor Penerima</label>
          <Input
            className="mt-2 w-full"
            placeholder="Nomor Penerima"
            value={checkout.receiverPhoneNumber}
            onChange={(event) =>
              updateCheckout("receiverPhoneNumber", event.target.value)
            }
          />
        </div>

        <div>
          <label>3. Alamat Penerima</label>
          <Input
            className="mt-2 w-full"
            placeholder="Alamat Penerima"
            value={checkout.receiverAddress}
            onChange={(event) => updateCheckout("receiverAddress", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
