"use client";

import { TopUp } from "@/types";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { TopUpCard } from "../account/card";
import Link from "next/link";

type Props = {
  topUps: TopUp[];
};

export const TopUpHistoryDetail = ({ topUps }: Props) => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center min-w-screen min-h-screen">
      <div className="flex flex-col items-center gap-y-4 p-5 border-l-2 border-r-2 border-gray-300 max-w-screen">
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
