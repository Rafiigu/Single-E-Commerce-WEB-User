"use server";

import { constructEndpoint } from "@/lib/api";
import { TopUp } from "@/types";
import { cookies } from "next/headers";

export const listTopUps = async () => {
  try {
    const fetchResponse = await fetch(constructEndpoint("top-up"), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(await cookies()).get("AUTH_TOKEN")?.value || ""}`,
      },
    });

    const response = await fetchResponse.json();
    console.log(response);
    if (!fetchResponse.ok) {
      return {
        data: [] as TopUp[],
        total: 0,
        error: response.error.message || null,
      };
    }

    return {
      data: response.data as TopUp[],
      total: response.total,
      error: null,
    };
  } catch (error) {
    return {
      data: [] as TopUp[],
      total: 0,
      error: (error as Error).message || null,
    };
  }
};
