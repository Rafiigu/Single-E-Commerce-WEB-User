"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
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
          } = await login({
            data: formState,
          });

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            toast.error(error);
          } else {
            toast.success("Login berhasil!");
            router.replace("/");
          }
        }}
      >
        <h2 className="text-lg text-center font-medium text-neutral-900">
          Login
        </h2>
        <Input
          name="email"
          placeholder="Input email"
          value={formState.email}
          onChange={(e) =>
            setFormState((st) => ({
              ...st,
              email: e.target.value,
            }))
          }
          errorMessage={errorFields.email}
        />

        <div>
          <PasswordInput
            name="password"
            placeholder="Input password"
            value={formState.password}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                password: e.target.value,
              }))
            }
            errorMessage={errorFields.password}
          />
          <div
            className="flex flex-row justify-between text-sm text-blue-500 mt-2 cursor-pointer"
            onClick={() => {
              router.replace("/forgot-password");
            }}
          >
            Forgot Password?
          </div>
        </div>

        <Button className="mt-2" type="submit">
          Login
        </Button>
        <div className="flex flex-row justify-between text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => {
              router.replace("/register");
            }}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
