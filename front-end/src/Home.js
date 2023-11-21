import React from "react"; 
import { Link } from "react-router-dom"; 
import Search from "./Search";

const Home = () => {
    return (
        <div>
            <h1> Welcome to Music Selector </h1>
            <Link to="/Music-Selector/Search/"> Search Your Favorite Artist Now!</Link>
        </div>
    );
};


export default Home; 