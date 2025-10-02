"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ErrorMessage } from "./error-message";
import { cva } from "class-variance-authority";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  containerClassName?: string;
  className?: string;
  inputClassName?: string;
  errorMessage?: string;
  renderLeftIcon?: () => React.ReactNode;
  renderRightIcon?: () => React.ReactNode;
};

const inputVariants = cva(
  "flex h-[2.5rem] items-center gap-x-2 border border-neutral-400 bg-white px-3 py-1 text-sm text-neutral-700 rounded-md",
  {
    variants: {
      state: {
        default: "focus-within:ring-1 focus-within:ring-neutral-700",
        error: "ring-1 ring-red-600",
        disabled: "bg-neutral-200 text-neutral-500",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

function Input({
  label,
  containerClassName,
  className,
  inputClassName,
  errorMessage,
  renderLeftIcon,
  renderRightIcon,
  ...props
}: Props) {
  return (
    <div className={cn("flex flex-col w-full", containerClassName)}>
      {label ? (
        <label className="text-neutral-400 text-xs mb-1">{label}</label>
      ) : null}
      <div
        className={cn(
          inputVariants({
            state: Boolean(errorMessage)
              ? "error"
              : props.disabled
              ? "disabled"
              : "default",
          }),
          className
        )}
      >
        {renderLeftIcon?.()}
        <input
          className={cn(
            "placeholder:text-neutral-400 focus-visible:outline-none bg-transparent w-full",
            inputClassName
          )}
          {...props}
        />
        {renderRightIcon?.()}
      </div>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </div>
  );
}

function PasswordInput({ ...props }: Omit<Props, "renderRightIcon" | "type">) {
  const [state, setState] = React.useState<"show" | "hide">("hide");

  return (
    <Input
      type={state === "show" ? "text" : "password"}
      renderRightIcon={() => {
        const renderIcon = () => {
          if (state === "hide") {
            return <MdOutlineVisibility className="size-6 text-neutral-400" />;
          }
          return <MdOutlineVisibilityOff className="size-6 text-neutral-400" />;
        };

        return (
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => setState((st) => (st === "hide" ? "show" : "hide"))}
          >
            {renderIcon()}
          </button>
        );
      }}
      {...props}
    />
  );
}

export { Input, PasswordInput };
