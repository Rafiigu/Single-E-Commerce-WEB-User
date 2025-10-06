"use client";

import { resetPassword } from "@/actions/reset-password";
import { verifyAccount } from "@/actions/verify-account";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [formState, setFormState] = useState({
    newPassword: "",
    email: email || "",
    token: token || "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  useEffect(() => {
    if (email && token) {
      setFormState((prev) => ({
        ...prev,
        email,
        token,
      }));
    } else {
      toast.error("Email dan token harus tersedia untuk reset password.");
    }
  }, [email, token]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md w-80"
        action={async () => {
          const {
            data: user,
            error,
            errorFields,
          } = await resetPassword({
            data: formState,
          });

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            toast.error(error);
          } else {
            toast.success("Password berhasil diubah!");
            router.replace("/login");
          }
        }}
      >
        <h2 className="text-lg text-center font-medium text-neutral-900">
          Submit
        </h2>

        <div>
          <PasswordInput
            name="newPassword"
            placeholder="Input New Password"
            value={formState.newPassword}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                newPassword: e.target.value,
              }))
            }
            errorMessage={errorFields.newPassword}
          />
        </div>

        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
