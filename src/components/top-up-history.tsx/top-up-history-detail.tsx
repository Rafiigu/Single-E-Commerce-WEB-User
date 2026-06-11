"use client";

import { TopUp } from "@/types";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { TopUpCard } from "../account/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowBackButton } from "./arrow-back-button";

type Props = {
  topUps: TopUp[];
};

export const TopUpHistoryDetail = ({ topUps }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="flex justify-center min-w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-y-4 p-5 max-w-screen bg-white">
        <div className="w-full flex items-center">
          <ArrowBackButton />
          <h3 className="text-lg font-medium text-neutral-900">Wallet</h3>
        </div>
        <div className="w-full px-4 border-2 h-21 p-2">
          <h2 className="text-lg font-medium mb-2">Balance</h2>
          <span className="text-md font-medium">
            {user?.balance?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <Link className="w-full" href="/account/top-up">
          <Button
            variant="default"
            className="w-full px-4 bg-blue-300 hover:bg-blue-300/80 text-blue-500 rounded-md"
          >
            Top Up
          </Button>
        </Link>
        <div className="w-full h-auto mt-2">
          <h2 className="text-lg font-medium mb-2">Top Up History</h2>
          {topUps.map((topUp, i) => (
            <TopUpCard key={i} topUp={topUp} />
          ))}
        </div>
      </div>
    </div>
  );
};
