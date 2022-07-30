import { HOST } from "../constants/environment";

const request = async (path, method, body) => {
  try {
    const res = await fetch(`${HOST}${path}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.dir(error);
    return { ok: false, error: error.message };
  }
};

export { request };
