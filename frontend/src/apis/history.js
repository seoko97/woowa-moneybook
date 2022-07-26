import { request } from ".";
import { getQueryParams } from "../utils/getQueryParams";

const requestCreateHistory = async (body) => {
  const data = await request("/history", "POST", { ...body, userId: 1 });

  return data;
};

const requestUpdateHistory = async (body) => {
  const data = await request("/history", "PATCH", { ...body, userId: 1 });

  return data;
};

const requestGetHistories = async (query) => {
  const queryParams = getQueryParams(query);
  const data = await request(`/history?${queryParams}`, "GET");

  return data;
};

export { requestCreateHistory, requestGetHistories, requestUpdateHistory };
