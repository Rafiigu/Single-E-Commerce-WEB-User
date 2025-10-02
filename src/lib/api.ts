export const constructEndpoint = (endpoint: string) => {
  return `${process.env.API_URL}/${endpoint}`;
};
