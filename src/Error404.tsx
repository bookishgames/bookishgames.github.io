import React from "react";

export default function Error404() {
  return (
    <div className="home site-container theme-dark">
      <h1>Error 404</h1>
      <div className="home-logo">
        <img
          src="/logo.png"
          alt="The Bookish Games Logo: an ornate drop cap of the letter B in dark blue and gold colors.."
        />
      </div>
      <p>You might be lost.</p>
      <div className="centered">
        <a href="/">
          <button className="button primary">Back to Home</button>
        </a>
      </div>
    </div>
  );
}