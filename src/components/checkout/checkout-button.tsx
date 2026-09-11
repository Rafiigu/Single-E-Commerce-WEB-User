"use client";

import { createTransaction } from "@/actions/checkout/create";
import { useCheckout } from "../providers/checkout-provider";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTransition } from "react";

type CheckoutButtonProps = {
  total: number;
};

export const CheckoutButton = ({ total }: CheckoutButtonProps) => {
  const { checkout } = useCheckout();
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    if (
      !checkout.receiverName ||
      !checkout.receiverPhoneNumber ||
      !checkout.receiverAddress
    ) {
      toast.error("Lengkapi data penerima terlebih dahulu");
      return;
    }

    startTransition(async () => {
      const result = await createTransaction({
        data: {
          receiverName: checkout.receiverName,
          receiverPhoneNumber: checkout.receiverPhoneNumber,
          receiverAddress: checkout.receiverAddress,
          total: total,
        },
      });
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Transaksi berhasil dibuat");
    });
  };

  return (
    <Button className="w-full" onClick={handleCheckout} disabled={isPending}>
      {isPending ? "Processing..." : "Checkout"}
    </Button>
  );
};
