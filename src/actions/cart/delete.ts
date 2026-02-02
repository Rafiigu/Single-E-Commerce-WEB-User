"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const deleteCartItem = async ({
  cartItemId,
}: {
  cartItemId: string;
}) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`cart/${cartItemId}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          (await cookies()).get("AUTH_TOKEN")?.value || ""
        }`,
      },
    });
    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data,
      error: null,
      errorFields: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
    };
  }
};
