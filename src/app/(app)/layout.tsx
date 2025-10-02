"use client";

import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <RedirectIfNotAuthenticated>
        <main>{children}</main>
    </RedirectIfNotAuthenticated>
  );
};

export default AppLayout;
