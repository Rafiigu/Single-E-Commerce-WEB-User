"use server";

import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";

export const uploadTransferProof = async ({
  formData,
}: {
  formData: FormData;
}) => {
  try {
    const fetchResponse = await fetch(
      constructEndpoint(`top-up/upload-transfer-proof/image`),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("AUTH_TOKEN")?.value || ""
          }`,
        },
        body: formData,
      },
    );

    const response = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return {
        data: null,
        error: response.error.message || null,
        errorFields: response.error.fields || null,
      };
    }

    console.log("Test1");
    return {
      data: response.data.files as {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
      }[],
      error: null,
      errorFields: null,
    };
  } catch (error) {
    console.log("Test2");
    return {
      data: null,
      error: (error as Error).message || null,
      errorFields: null,
    };
  }
};
