"use client";

import { createTransaction } from "@/actions/checkout/create";
import { useCheckout } from "../providers/checkout-provider";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCartItems } from "@/actions/cart/delete-items";

type CheckoutButtonProps = {
  total: number;
};

export const CheckoutButton = ({ total }: CheckoutButtonProps) => {
  const { checkout } = useCheckout();
  const router = useRouter();

  const handleCheckout = async () => {
    if (
      !checkout.receiverName ||
      !checkout.receiverPhoneNumber ||
      !checkout.receiverAddress
    ) {
      toast.error("Lengkapi data penerima terlebih dahulu");
      return;
    }

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
    await deleteCartItems();
    router.push("/");
  };

  return (
    <Button className="w-full" onClick={handleCheckout}>
      Checkout
    </Button>
  );
};
