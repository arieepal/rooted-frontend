import { useEffect, useState } from "react";
import { getQuote } from "../../utils/quoteApi";
import "./Quote.css";

function Quote() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(false);

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long", // e.g., Thursday
    year: "numeric",
    month: "long", // e.g., January
    day: "numeric",
  });

  useEffect(() => {
    getQuote()
      .then((data) => {
        if (!data) {
          setError(true);
          return;
        }
        setQuote(data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return <p className="quote__error"> Sorry, not able to load this quote</p>;
  }

  if (!quote) {
    return <p className="quote__loading"> Loading inspiration for the day..</p>;
  }

  return (
    <blockquote className="quote">
      <h2 className="quote__date">{formattedDate}</h2>
      <p className="quote__text"> "{quote.content}"</p>
      <cite className="quote__author"> -{quote.author}</cite>
    </blockquote>
  );
}

export default Quote;
