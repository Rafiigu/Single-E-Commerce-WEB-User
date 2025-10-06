"use server";

import { ResetPasswordDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { User } from "@/types";

export const resetPassword = async ({ data }: { data: ResetPasswordDTO }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint("auth/user/reset-password"),
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
        errorFields: response.error.fields || null,
      };
    }

    return {
      data: response.data.user as User,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
      errorFields: null,
    };
  }
};
