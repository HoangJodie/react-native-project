type ParamPrimitive = string | number | boolean;
type ParamValue = ParamPrimitive | ParamPrimitive[];

export const paramsSerializer = (params: Record<string, ParamValue>) => {
  const queryStrings: string[] = [];

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      });
    } else {
      queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return queryStrings.join("&");
};