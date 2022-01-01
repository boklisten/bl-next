export const fetchData = async (url: string, method: string, data: unknown) => {
  try {
    // eslint-disable-next-line compat/compat
    return await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });
  } catch (error) {
    console.error(error);
  }
};
