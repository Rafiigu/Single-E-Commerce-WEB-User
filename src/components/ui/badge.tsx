import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type BadgeVariants =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "info";

type Props = {
  variant?: BadgeVariants;
  children: ReactNode;
  className?: string;
};

const map: Record<BadgeVariants, string> = {
  success: "text-green-600",
  danger: "text-red-600",
  warning: "text-amber-600",
  default: "text-neutral-600",
  info: "text-blue-600",
};

export const Badge = ({ variant = "default", children, className }: Props) => {
  return (
    <div
      className={cn(
        "text-[0.775rem] font-medium px-1.5 py-2 rounded-sm w-fit",
        map[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};
