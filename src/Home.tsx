import React from "react";

export default function Home() {
  return (
    <div className="home site-container theme-dark">
      <h1>Bookish Games</h1>
      <div className="home-logo">
        <img
          src="/logo.png"
          alt="The Bookish Games Logo: an ornate drop cap of the letter B in dark blue and gold colors.."
        />
      </div>
      <h2>Play a Game</h2>
      <p>Stories in your community.</p>
      <div className="game-book-container">
        <div className="game-book">
          <a href="/jungle">
            <img
              src="/images/jungle-portal-opening.png"
              alt="Lucy stands on the 22nd Street Jungle Staircase looking up at Sutro Tower and a magical portal."
            />
          </a>
        </div>
      </div>
    </div>
  );
}