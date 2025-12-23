"use server";

import { constructEndpoint } from "@/lib/api";
import { Product } from "@/types";
import { cookies } from "next/headers";

export const listProducts = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("product"), {
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
        data: [],
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
      data: [],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
