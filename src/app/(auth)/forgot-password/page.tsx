"use client";

import { forgotPassword } from "@/actions/forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md w-80"
        action={async () => {
          const {
            data: user,
            error,
            errorFields,
          } = await forgotPassword({ data: formState });

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            toast.error(error);
          } else {
            toast.success("Link OTP telah dikirim ke email Anda!");
          }
        }}
      >
        <h2 className="text-lg text-center font-medium text-neutral-900">
          Forgot Password
        </h2>
        <Input
          name="email"
          placeholder="Input email"
          value={formState.email}
          onChange={(e) =>
            setFormState((st) => ({
              email: e.target.value,
            }))
          }
          errorMessage={errorFields.email}
        />

        <Button className="mt-2" type="submit">
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
