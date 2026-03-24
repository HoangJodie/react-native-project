type ParamPrimitive = string | number | boolean;
type ParamValue = ParamPrimitive | ParamPrimitive[];

export const paramsSerializer = (params: Record<string, ParamValue | undefined | null>) => {
  const queryStrings: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      });
    } else if (value !== '') {
      queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });

  return queryStrings.join("&");
};
