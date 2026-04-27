"use client";

import { TopUp } from "@/types";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";
import { Badge, BadgeVariants } from "../ui/badge";

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

  const variantMap: Record<string, BadgeVariants> = {
    approved: "success",
    rejected: "danger",
    cancelled: "warning",
    requested: "default",
    transferred: "info",
  };

  const valueMap: Record<string, string> = {
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    requested: "Requested",
    transferred: "Transferred",
  };

  return (
    <div
      key={topUp.id}
      className="mb-4 cursor-pointer "
      onClick={() => router.push(`/account/top-up-history/${topUp.id}`)}
    >
      <div className="mb-4 p-4 border rounded w-full h-22">
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-between w-full">
            <h3 className="line-clamp-2 text-shadow-black text-xs">
              {topUp.id}
            </h3>
            <h3 className="text-sm">
              {new Date(topUp.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h3>
          </div>
          <div className="flex justify-between w-full">
            <h3 className="text-lg mb-1">
              {formatter.format(topUp.nominal).replace(/^Rp\s?/, "Rp")}
            </h3>
            <Badge variant={variantMap[topUp.status]}>
              {valueMap[topUp.status]}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
