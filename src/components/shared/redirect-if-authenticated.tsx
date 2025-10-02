"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";

type Props = {
  children: ReactNode;
};

export const RedirectIfAuthenticated = ({ children }: Props) => {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  if (user) {
    return null;
  }

  return children;
};
