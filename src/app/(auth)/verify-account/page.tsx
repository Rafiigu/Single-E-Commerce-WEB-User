"use client";

import { verifyAccount } from "@/actions/verify-account";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const VerifyAccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (email && token) {
      const fetchAsync = async () => {
        const { error } = await verifyAccount({
          data: {
            email,
            token,
          },
        });

        if (error) {
          toast.error(error);
        } else {
          toast.success("Verfikasi akun berhasil!");
          router.replace("/login");
        }
      };

      fetchAsync().then();
    }
  }, [email, token, router]);

  return null;
};

export default VerifyAccountPage;
