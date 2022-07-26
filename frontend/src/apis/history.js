import { request } from ".";

const requestCreateHistory = async (body) => {
  const data = await request("/history", "POST", body);

  console.log(data);
};

export { requestCreateHistory };
