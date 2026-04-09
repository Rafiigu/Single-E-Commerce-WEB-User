export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
};

export type ForgetPasswordDTO = {
  email: string;
};

export type UpdatePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type VerifyDTO = {
  email: string;
  token: string;
};

export type ResetPasswordDTO = {
  email: string;
  token: string;
  newPassword: string;
};

export type CartItemDTO = {
  productId: string;
  quantity?: number;
  removeQuantity?: number;
};

export type TopUpDTO = {
  nominal: number;
  paymentTermId: string;
  paymentAccountId: string;
};
