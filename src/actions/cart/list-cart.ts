"use server";

import { constructEndpoint } from "@/lib/api";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

export const listCartItems = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("cart"), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(await cookies()).get("AUTH_TOKEN")?.value || ""}`,
      },
    });

    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: [] as CartItem[],
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as CartItem[],
      total: response.total,
      error: null,
    };
  } catch (error) {
    return {
      data: [] as CartItem[],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
