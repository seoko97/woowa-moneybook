const getQueryParams = (query = {}) => new URLSearchParams({ ...query, userId: 1 }).toString();

export { getQueryParams };
