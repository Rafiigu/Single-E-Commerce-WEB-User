export type User = {
  email: string;
  status: string;
  id: string;
  name: string;
  profile: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  status: string;
  price: number;
  stock: number;
  description: string;
  productImages: {
    imageFileName: string;
  }[];
  category: Pick<Category, "id" | "name">;
  createdAt: string;
  updatedAt: string;
  wishlists: Pick<Wishlist, "productId" | "userId">[];
};

export type Category = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Wishlist = {
  productId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Pick<
    Product,
    "id" | "name" | "price" | "productImages" | "category"
  >;
};

export type TopUp = {
  id: string;
  nominal: number;
  paymentTermId: string;
  adminId?: string;
  userId: string;
  paymentAccountId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentAccount: Pick<
    PaymentAccount,
    "id" | "accountNumber" | "accountHolderName"
  > & {
    paymentTerm: Pick<PaymentTerm, "id" | "name">;
  };
  user: Pick<User, "name">;
  admin?: "string";
};

export type PaymentAccount = {
  id: string;
  paymentTerm: Pick<PaymentTerm, "id" | "name">;
  accountHolderName: string;
  accountNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentTerm = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentAccounts: Pick<
    PaymentAccount,
    "id" | "accountNumber" | "accountHolderName"
  >[];
};
