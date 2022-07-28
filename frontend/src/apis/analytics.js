import { request } from ".";
import { getQueryParams } from "../utils/getQueryParams";

const requestGetCategoryRanking = async (query) => {
  const queryParams = getQueryParams(query);
  const data = await request(`/analytics/ranking?${queryParams}`, "GET");
  return data;
};

const requestGetCategoryYear = async (query) => {
  const queryParams = getQueryParams(query);
  const data = await request(`/analytics/year?${queryParams}`, "GET");
  return data;
};

export { requestGetCategoryRanking, requestGetCategoryYear };
