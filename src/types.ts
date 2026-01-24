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
