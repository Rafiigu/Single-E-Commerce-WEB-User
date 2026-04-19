"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RedirectIfNotAuthenticated } from "@/components/shared/redirect-if-not-authenticated";
import { createTopUp } from "@/actions/top-up/create";
import { PaymentTermCombobox } from "@/components/shared/comboboxes/payment-term";
import { getPaymentTerm } from "@/actions/payment-term/get-payment-term";

const TopUpPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    nominal: "",
    paymentTermId: "",
    paymentAccountId: "",
    paymentAccountNumber: "",
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAsync = async () => {
      console.log(formState.paymentTermId);
      const { data, error } = await getPaymentTerm({
        id: formState.paymentTermId,
      });

      if (error) {
        toast.error(error);
      } else {
        if (data?.paymentAccounts && data.paymentAccounts.length > 0) {
          setFormState((st) => ({
            ...st,
            paymentAccountId: data.paymentAccounts[0].id,
            paymentAccountNumber: data.paymentAccounts[0].accountNumber,
          }));
        } else {
          setFormState((st) => ({
            ...st,
            paymentAccountId: "",
          }));
        }
      }
    };

    fetchAsync().then();
  }, [formState.paymentTermId]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-y-5 p-5 rounded-lg bg-white shadow-md w-80"
        action={async () => {
          const { paymentAccountNumber, ...rest } = formState;
          const {
            data: user,
            error,
            errorFields,
          } = await createTopUp({
            data: { ...rest, nominal: Number(formState.nominal) },
          });
          console.log(formState);

          if (errorFields) {
            setErrorFields(errorFields);
          } else if (error) {
            toast.error(error);
          } else {
            toast.success("Top up berhasil!");
            console.log(user);
            // router.replace("/top-up/success");
          }
        }}
      >
        <h2 className="text-lg text-center font-medium text-neutral-900">
          Top Up
        </h2>

        <div>
          <label>Nominal</label>
          <Input
            name="nominal"
            placeholder="Input nominal"
            value={formState.nominal}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                nominal: e.target.value,
              }))
            }
            errorMessage={errorFields.nominal}
          />
        </div>

        <div>
          <label>Metode Pembayaran</label>
          <PaymentTermCombobox
            value={formState.paymentTermId ? [formState.paymentTermId] : []}
            onValueChange={(val) =>
              setFormState((st) => ({
                ...st,
                paymentTermId: val?.at(-1) || "",
              }))
            }
          />
        </div>

        <div>
          <label>Nomor Rekening</label>
          <Input
            name="paymentAccountNumber"
            value={formState.paymentAccountNumber}
            onChange={(e) =>
              setFormState((st) => ({
                ...st,
                paymentAccountNumber: e.target.value,
              }))
            }
            errorMessage={errorFields.paymentAccountNumber}
            readOnly
          />
        </div>

        <Button className="mt-2" type="submit">
          Request
        </Button>
      </form>
    </div>
  );
};

export default TopUpPage;
