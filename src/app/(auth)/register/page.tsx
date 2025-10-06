"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { register } from "@/actions/register";

const RegisterPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
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
          } = await register({
            data: formState,
          });

          console.log("test");

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            toast.error(error);
          } else {
            toast.success("Registrasi berhasil!");
            router.replace("/verify-account/link-sent");
            // TODO: Redirect ke satu halaman, isinya teks doang
            // kata"nya "Link verifikasi akun telah dikirimkan pada email yang digunakan untuk registrasi."
          }
        }}
      >
        <h2 className="text-lg text-center font-medium text-neutral-900">
          Register
        </h2>

        <Input
          name="name"
          placeholder="Input nama"
          value={formState.name}
          onChange={(e) =>
            setFormState((st) => ({
              ...st,
              name: e.target.value,
            }))
          }
          errorMessage={errorFields.name}
        />

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

        <Button className="mt-2" type="submit">
          Register
        </Button>
        <div className="flex flex-row justify-between text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              router.replace("/login");
            }}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
