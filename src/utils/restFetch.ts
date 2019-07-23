const restFetch = async (url: string, options?: object) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.status >= 400) {
      console.error(json);
    }
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default restFetch;
