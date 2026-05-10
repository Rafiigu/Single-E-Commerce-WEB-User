"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { Header } from "@/components/shared/header";

const AccountPage = () => {
  const { user } = useAuth();

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col items-center p-4 gap-y-4 w-full">
      <div className="border rounded max-w-[1440px] h-34 p-4 flex">
        <div className="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-blue-300">
          {user?.profile ? (
            <img
              src={user?.profile}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-white font-bold">
                {user?.name?.split(" ")[0]}
              </span>
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
    </div>
  );
};

export default AccountPage;
