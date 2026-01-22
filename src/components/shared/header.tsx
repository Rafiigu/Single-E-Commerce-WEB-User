"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";

export const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <header className="flex justify-between w-full border-b border-b-neutral-100">
      <div className="flex justify-between items-center w-full h-24 px-4 max-w-[1440px]">
        <h2>E Commerce</h2>
        {user ? (
          <div className="flex gap-x-5 items-center">
            <h3>Hello, {user.name}</h3>{" "}
            <Button
              onClick={async () => {
                await logout();
              }}
              variant={"outline"}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              router.replace("/login");
            }}
            variant={"outline"}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};
