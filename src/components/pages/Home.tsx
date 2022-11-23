import React from "react";
import { Link } from "react-router-dom";

export const SampleHome = () => {
  return (
    <>
      <h1>Sample Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="post">Sample Page1</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
