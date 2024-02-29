// Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({bookItems}) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"}>
            <span className="text-white text-lg font-semibold">BOOKSTAR</span>
          </Link>
        </div>

        <div>
            <Link to={"/bookmarks"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Bookmark = {bookItems.length}
          </button>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
