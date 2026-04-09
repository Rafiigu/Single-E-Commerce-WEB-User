import { listPaymentTerms } from "@/actions/payment-term/list-payment-terms";
import { Combobox } from "@/components/ui/combobox";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Combobox>, "queryFn">;

export const PaymentTermCombobox = ({ value, onValueChange, ...props }: Props) => {
  return (
    <Combobox
      value={value}
      placeholder="Pilih Metode Pembayaran"
      queryFn={async (search) => {
        const { data: paymentTerms, error } = await listPaymentTerms({
          page: 1,
          mode: "all",
          search,
        });

        if (error) {
          alert(error);
          return [];
        }

        return paymentTerms.map((pt) => ({
          data: pt,
          value: pt.id,
          label: pt.name,
        }));
      }}
      onValueChange={onValueChange}
      {...props}
    />
  );
};
