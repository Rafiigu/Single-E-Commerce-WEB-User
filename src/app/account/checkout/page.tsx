import { OrderSummary } from "@/components/checkout/checkout";
import { UserContact } from "@/components/checkout/user-contact";
import { CheckoutProvider } from "@/components/providers/checkout-provider";

const CheckoutPage = async () => {
  return (
    <CheckoutProvider>
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full flex justify-between items-start max-w-4xl border-0 rounded-lg shadow-md bg-white p-4">
          <UserContact />
          <OrderSummary />
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutPage;
