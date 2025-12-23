import { buildSearchParams } from "./utils/build-search-params";

export const constructEndpoint = (
  endpoint: string,
  searchParams?: Record<string, string | number | undefined | null>
) => {
  let endpointURL = `${process.env.API_URL}${
    endpoint.charAt(0) === "/" ? endpoint : "/" + endpoint
  }`;
  if (searchParams) {
    endpointURL = `${endpointURL}?${buildSearchParams(searchParams)}`;
  }

  return endpointURL;
};
