// Preloader.jsx
import React from "react";
import "./Preloader.css"; // make sure your CSS is here

function Preloader({ text = "Loading..." }) {
  return (
    <div className="preloader-container">
      <div className="circle-preloader"></div>
      <p>{text}</p>
    </div>
  );
}

export default Preloader;
