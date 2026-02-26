// const QUOTE_API_URL =
//   "https://api.quotable.io/random?tags=motivational|inspirational";

// const getQuote = async () => {
//   try {
//     const res = await fetch(QUOTE_API_URL);
//     if (!res.ok) throw new Error("Failed to fetch quote");
//     return await res.json();
//   } catch (err) {
//     console.error("Quote API error:", err);
//     return null;
//   }
// };

// export { getQuote };

// export const getQuote = async () => {
//   try {
//     const res = await fetch("https://zenquotes.io/api/random");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("Quote API error:", err);
//     return { content: "Believe and your hair will grow!", author: "Rooted" }; // fallback quote
//   }
// };
export const getQuote = async () => {
  try {
    // Fetch motivational quotes from ZenQuotes
    const res = await fetch("/api/quotes/motivational"); // Vite proxy will handle CORS
    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    // Pick a random quote from the returned array
    const randomIndex = Math.floor(Math.random() * data.length);
    return {
      content: data[randomIndex].q,
      author: data[randomIndex].a,
    };
  } catch (err) {
    console.error("Quote API error:", err);
    return null;
  }
};

// https://api.quotable.io/random
