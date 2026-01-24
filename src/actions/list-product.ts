"use server";

import { constructEndpoint } from "@/lib/api";
import { Product } from "@/types";
import { cookies } from "next/headers";

export const listProducts = async () => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint("product", {
        includeWishlist: (await cookies()).get("AUTH_TOKEN")?.value ? 1 : 0,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: [] as Product[],
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as Product[],
      total: response.total,
      error: null,
    };
  } catch (error) {
    return {
      data: [] as Product[],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
