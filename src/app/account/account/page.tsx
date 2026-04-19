"use client";

import { listTopUps } from "@/actions/top-up/list-top-ups";
import { TopUpCard } from "@/components/account/card";
import { useAuth } from "@/components/providers/auth-provider";
import { TopUp } from "@/types";
import { useEffect, useState } from "react";

const HistoryTopUpPage = () => {
  const { user } = useAuth();
  const [topUps, setTopUps] = useState<TopUp[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopUps = async () => {
      try {
        const { data, error: listTopUpsError } = await listTopUps();
        if (listTopUpsError) {
          throw new Error(listTopUpsError);
        }
        setTopUps(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTopUps();
  }, []);
  if (error) return <div>Error: {error}</div>;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="border rounded w-[100%] h-34 p-4 flex">
        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-blue-300">
          {user?.profile ? (
            <img
              src={user?.profile}
              alt={`Gambar ${user?.name}`}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-white font-bold">{user?.name}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start ml-4">
          <h2 className="text-lg font-bold ">{user?.name}</h2>
          <div className="text-lg text-muted-foreground">
            Balance:{" "}
            {formatter.format(user ? user.balance : 0).replace(/^Rp\s?/, "Rp")}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4">
        {topUps.map((topUp, i) => (
          <TopUpCard key={i} topUp={topUp} />
        ))}
      </div>
    </div>
  );
};

export default HistoryTopUpPage;
