"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";

type Props = {
  children: ReactNode;
};

export const RedirectIfNotAuthenticated = ({ children }: Props) => {
  const router = useRouter();

  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return children;
};
