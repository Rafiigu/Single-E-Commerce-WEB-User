"use client";

import { TopUp } from "@/types";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";

type Props = {
  topUp: TopUp;
};

export const TopUpCard = ({ topUp }: Props) => {
  const { user } = useAuth();

  const router = useRouter();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return (
    <div key={topUp.id} className="mb-4">
      <div className="mb-4 p-4 border rounded w-120 h-46 gap-x-6 bg-blue-300 flex flex-wrap">
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-between w-full">
            <p className="line-clamp-2 text-shadow-black text-lg">
              {formatter.format(topUp.nominal).replace(/^Rp\s?/, "Rp")}
            </p>
          </div>
          <h3 className="text-md mb-1">
            Nomor Rekening: {topUp.paymentAccount.accountNumber} (
            {topUp.paymentAccount.accountHolderName})
          </h3>
          <h3>Metode Pembayaran: {topUp.paymentAccount.paymentTerm.name}</h3>
          <h3>Status: {topUp.status}</h3>
          <div className="flex justify-between">
            <p className="text-sm">
              {new Date(topUp.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
