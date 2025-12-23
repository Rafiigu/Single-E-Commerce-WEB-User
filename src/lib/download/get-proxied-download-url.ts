export const getProxiedDownloadUrl = (
  url: string,
  params: Record<string, any> = {}
) => {
  const parsedURLSearchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) {
      parsedURLSearchParams.set(k, v);
    }
  });

  console.log(parsedURLSearchParams.toString());

  return `/api/download?url=${url}${parsedURLSearchParams.toString()}`;
};
