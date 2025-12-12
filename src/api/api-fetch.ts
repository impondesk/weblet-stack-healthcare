export async function apiFetch(url: string, options: any = {}) {
  console.log(url);
  console.log(options);

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    // Add timeout for development
    // signal: AbortSignal.timeout(10000), // 10 second timeout
  };

  return fetch(url, mergedOptions).then(async (res) => {
    // console.log("Response : " + JSON.stringify(res));

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      return data;
    }
    throw new Error(
      `Error fetching page data: ${res.statusText} (${res.status})}`
    );
  });
}
