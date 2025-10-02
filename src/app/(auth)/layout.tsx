import { RedirectIfAuthenticated } from "@/components/shared/redirect-if-authenticated";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <RedirectIfAuthenticated>
      <main className="flex w-full min-h-screen justify-center items-center">
        {children}
      </main>
    </RedirectIfAuthenticated>
  );
};

export default AuthLayout;
