"use server";

import { cartItemDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

export const createCartItem = async ({ data }: { data: cartItemDTO }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`cart`), {
      method: "POST",
      body: JSON.stringify(data),
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
      data: response.data as CartItem,
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
