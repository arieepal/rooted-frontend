import React, { useState, useEffect } from "react";
import Quote from "../components/Quote";
import "../components/Main/Main.css";
import hairImage from "../assets/bw-curls.png";
import hairImage2 from "../assets/long-brun.png";
import hairImage3 from "../assets/blondewhip.png";
import hairImage4 from "../assets/whipitcurls.png";
import hairType from "../assets/hair_types.png";

// import hairImage5 from "../assets/blackWaves.png";

function Home() {
  const leftImages = [hairImage, hairImage2];
  const rightImages = [hairImage3, hairImage4];

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Left image rotates every 3 seconds
    const leftInterval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftImages.length);
    }, 3000);

    // Right image rotates every 4 seconds
    const rightInterval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % rightImages.length);
    }, 4000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <main className="main">
      <div className="main__about">
        <p>
          {" "}
          Consistency creates health. Health creates length. Rooted helps you
          build simple, personal hair habits that make your routine sustainable.
        </p>
      </div>

      <div className="main__container">
        <div className="main__split main__left">
          <Quote /> {/*  Quote component */}
          {/* video */}
          <div className="main__hairtype">
            <h2>Hair Type</h2>
            <img
              src={hairType}
              alt={hairType}
              className="main__abc"
              style={{ width: "100%" }}
            />
          </div>
          <div
            className="main__video video-wrapper"
            onClick={() => setIsPlaying(true)}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/PjOsKWZi-rc?si=XBcAw5QEyIJqOXVd"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            {!isPlaying && (
              <div className="video-overlay">
                <p> Porosity video </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Image */}
        <div className="main__split main__right">
          {/* Left image rotates */}

          <img
            src={leftImages[leftIndex]}
            alt={`Hair style ${leftIndex + 1}`}
            className="main__icon_top"
          />

          {/* Right image rotates */}

          <img
            src={rightImages[rightIndex]}
            alt={`Hair style ${rightIndex + 1}`}
            className="main__icon_btm"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
