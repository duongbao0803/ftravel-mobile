export const getQueryParams = (url: string): {[key: string]: string} => {
  const params: {[key: string]: string} = {};
  const queryString = url.split('?')[1];
  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }
  return params;
};
