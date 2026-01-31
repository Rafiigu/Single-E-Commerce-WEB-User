"use server";

import { constructEndpoint } from "@/lib/api";
import { Wishlist } from "@/types";
import { cookies } from "next/headers";

export const createWishlist = async ({ productId }: { productId: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`wishlist/${productId}`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
      },
    );
    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as Wishlist,
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
