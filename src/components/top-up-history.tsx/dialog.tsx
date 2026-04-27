"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { TopUp } from "@/types";
import { cancelTopUp } from "@/actions/top-up/cancel";

export const CancelTopUpDialog = ({ topUp }: { topUp: TopUp }) => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const router = useRouter();
  return (
    <Dialog
      open={activeDialog === topUp.id}
      onOpenChange={(open) => setActiveDialog(open ? topUp.id : null)}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full px-4 bg-red-300 hover:bg-red-300/80 text-red-500 rounded-md"
        >
          Cancel Top Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Top Up</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin untuk membatalkan top-up ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={async () => {
              let error = null;
              console.log("test");
              const { error: err } = await cancelTopUp({
                id: topUp.id,
              });
              error = err;

              if (error) {
                alert(error);
              } else {
                router.push("/account/top-up-history");
              }
            }}
          >
            Cancel Top Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
