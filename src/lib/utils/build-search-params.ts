export const buildSearchParams = (
  searchParams: Record<string, string | number | undefined | null>
) => {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      query.append(key, `${value}`);
    }
  });

  return query.toString();
};
