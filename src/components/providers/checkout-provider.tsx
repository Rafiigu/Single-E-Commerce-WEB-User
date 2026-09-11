"use client";

import { TransactionDTO } from "@/dto";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./auth-provider";

type CheckoutContextType = {
  checkout: TransactionDTO;
  updateCheckout: (field: keyof TransactionDTO, value: string) => void;
};

const CheckoutContext = createContext<CheckoutContextType>({
  checkout: {
    receiverName: "",
    receiverPhoneNumber: "",
    receiverAddress: "",
    total: 0,
  },
  updateCheckout: () => {},
});

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [checkout, setCheckout] = useState<TransactionDTO>({
    receiverName: user?.name || "",
    receiverPhoneNumber: "",
    receiverAddress: "",
    total: 0,
  });

  const updateCheckout = (field: keyof TransactionDTO, value: string) => {
    setCheckout((current) => ({ ...current, [field]: value }));
  };

  return (
    <CheckoutContext.Provider value={{ checkout, updateCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
