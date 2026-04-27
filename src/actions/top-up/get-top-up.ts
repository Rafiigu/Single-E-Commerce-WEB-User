"use server";

import { constructEndpoint } from "@/lib/api";
import { TopUp } from "@/types";
import { cookies } from "next/headers";

export const getTopUp = async ({ id }: { id: string }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`top-up/${id}`), {
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
      data: response.data as TopUp,
      total: response.total,
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
