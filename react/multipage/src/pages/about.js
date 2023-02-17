import React from "react";
import { Link } from "react-router-dom";
  
const About = () => {
  return (
    <div>
      <h1>
        GeeksforGeeks is a Computer 
        Science portal for geeks.
      </h1>
      <button>
        <Link to="/blogs">Go to Blogs</Link>
      </button>
    </div>
  );
};
  
export default About;