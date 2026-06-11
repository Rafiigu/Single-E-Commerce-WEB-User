import { getTopUp } from "@/actions/top-up/get-top-up";
import { ArrowBackButton } from "@/components/top-up-history.tsx/arrow-back-button";
import { CancelTopUpDialog } from "@/components/top-up-history.tsx/dialog";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

export default async function TopUpDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const { data: topUp, error } = await getTopUp({ id: (await params).id });
  const { data: topUp, error } = await getTopUp({ id });
  if (error) {
    console.log("test lagi");
    throw new Error(error);
  }

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
    <div className="flex justify-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-5 min-w-107 h-[700px] bg-white">
        <div className="w-full flex items-center">
          <ArrowBackButton />
          <h3 className="text-lg font-medium text-neutral-900">
            Top Up Details
          </h3>
        </div>
        <div className="w-full mt-10 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm">Top Up ID</h3>
            <h3 className="text-xs font-bold text-neutral-900 text-right">
              {topUp?.id}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">Top Up Time</h3>
            <h3 className="text-xs font-bold text-neutral-900 text-right">
              {topUp && topUp?.createdAt
                ? format(
                    new Date(topUp?.createdAt as string),
                    "dd MMMM yyyy, HH:mm:ss",
                  )
                : ""}
            </h3>
          </div>
          <div className=" flex justify-between items-center">
            <h3 className="text-sm">Status</h3>
            {topUp?.status && (
              <Badge className="px-0 py-0" variant={variantMap[topUp?.status]}>
                {valueMap[topUp?.status]}
              </Badge>
            )}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">Nominal</h3>
            <h3 className="text-xs font-bold text-neutral-900">
              {topUp?.nominal?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </h3>
          </div>
          <hr className="my-2 border-black" />
          <h3 className="text-sm">Transfer Details</h3>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">Metode Pembayaran</h3>
            <h3 className="text-xs font-bold text-neutral-900">
              {topUp?.paymentAccount.paymentTerm.name}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">No. Rekening</h3>
            <h3 className="text-xs font-bold text-neutral-900">
              {topUp?.paymentAccount.accountNumber}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">Nama Pemilik Rekening</h3>
            <h3 className="text-xs font-bold text-neutral-900">
              {topUp?.paymentAccount.accountHolderName}
            </h3>
          </div>
          {topUp?.status === "requested" && (
            <div className="w-full flex flex-col gap-y-2 mt-4">
              <Link className="w-full" href={`/account/top-up/${topUp.id}`}>
                <Button
                  variant="default"
                  className="w-full px-4 bg-blue-300 hover:bg-blue-300/80 text-blue-500 rounded-md"
                >
                  Upload Transfer Proof
                </Button>
              </Link>
              <CancelTopUpDialog topUp={topUp} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
