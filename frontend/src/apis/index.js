const request = async (path, method, body) => {
  try {
    const res = await fetch(`http://localhost:3065${path}`, {
      method,
      body: JSON.stringify(body),
      credentials: "include",
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
