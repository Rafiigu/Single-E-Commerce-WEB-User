"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const transferTopUpProof = async ({
  id,
  transferProofFileName,
}: {
  id: string;
  transferProofFileName: string;
}) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`top-up/${id}/upload-transfer-proof`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
        body: JSON.stringify({ transferProofFileName }),
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
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || null,
    };
  }
};
