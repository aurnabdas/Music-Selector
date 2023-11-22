
import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import './home.css'; // Import the custom styles for Home component

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Music Selector</h1>
        <p>Discover and explore your favorite music with ease.</p>
      </header>
      <main>
        <Link to="/Music-Selector/Search/" className="search-link">
          Search Your Favorite Artist Now!
        </Link>
      </main>
    </div>
  );
};


export default Home;

