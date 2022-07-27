import { request } from ".";
import { getQueryParams } from "../utils/getQueryParams";

const requestGetPayments = async () => {
  const queryParams = getQueryParams();

  const data = await request(`/payment?${queryParams}`, "GET");

  return data;
};

const requestCreatePayment = async (body) => {
  const data = await request("/payment", "POST", { ...body, userId: 1 });

  return data;
};

const requestDeletePayment = async (body) => {
  const data = await request("/payment", "DELETE", { ...body, userId: 1 });

  return data;
};

export { requestGetPayments, requestCreatePayment, requestDeletePayment };
