import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RedirectIfNotAuthenticated>{children}</RedirectIfNotAuthenticated>;
}