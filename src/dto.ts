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
