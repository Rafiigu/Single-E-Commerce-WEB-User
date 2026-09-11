"use server";

import { TransactionDTO } from "@/dto";
import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const createTransaction = async ({ data }: { data: TransactionDTO }) => {
  try {
    const fetchResponse = await fetch(constructEndpoint(`transaction`), {
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
      data: response.data as TransactionDTO,
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
