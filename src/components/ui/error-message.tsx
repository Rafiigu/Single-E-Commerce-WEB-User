import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export const ErrorMessage = ({ className, children }: Props) => {
  return (
    <p className={cn("text-red-600 mt-1 text-xs", className)}>{children}</p>
  );
};
