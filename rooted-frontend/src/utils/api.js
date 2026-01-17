export const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};
