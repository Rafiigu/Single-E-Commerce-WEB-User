"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">
            <EllipsisVertical className="w-6 h-6 sm:hidden" />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="  w-40 overflow-hidden">
          <div className="flex flex-col gap-y-2">
            <Link href={"/account/me"} className="cursor-pointer">
              Profile
            </Link>
            <button
              className="text-left"
              onClick={async () => {
                await logout();
                router.replace("/");
                router.refresh();
              }}
            >
              Logout
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
