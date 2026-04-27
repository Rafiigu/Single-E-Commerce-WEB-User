import { constructEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url") as string;
  console.log(constructEndpoint(url));
  const fetchResponse = await fetch(constructEndpoint(url), {
    headers: {
      Authorization: `Bearer ${
        (await cookies()).get("AUTH_TOKEN")?.value || ""
      }`,
    },
  });
  if (fetchResponse.ok) {
    const headers = fetchResponse.headers;
    const buffer = await fetchResponse.arrayBuffer();
    return new NextResponse(buffer, {
      headers: headers,
    });
  }
};
