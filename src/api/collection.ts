// Inside your Astro.js component or script
export const fetchDynamicCollection = async (type, id, tenantId) => {
  console.log(
    "Fetching dynamic collection with type:",
    type,
    "id:",
    id,
    "tenantId:",
    tenantId
  );

  // console.warn(
  //   `${import.meta.env.PUBLIC_API_URL}/dynamicCollection?tenant=${tenantId}`
  // );

  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/dynamicCollection?tenant=${tenantId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, // Pass the necessary data
          type: type,
        }),
      }
    );

    // console.log("Response status:", response.status);
    // console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
