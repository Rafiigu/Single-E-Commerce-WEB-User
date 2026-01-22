"use server";

import { constructEndpoint } from "@/lib/api";
import { Wishlist } from "@/types";
import { cookies } from "next/headers";

export const deleteWishlist = async ({ productId }: { productId: string }) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`unwishlist/${productId}`),
      {
        method: "POST",
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

    console.log(response);

    return {
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
    };
  }
};
