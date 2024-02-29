import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import BookDetails from "./components/BookDetails";
import BookMark from "./components/BookMark";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [bookItems, setBookItems] = useState([]);

  const addToBookmark = (book) => {
    setBookItems([...bookItems, book]);
  };
  return (
    <Router>
      <Navbar bookItems={bookItems} />
      <Routes>
        <Route path="/" element={<SearchBar addToBookmark={addToBookmark} />} />
        <Route
          path="/details/:bookId"
          element={<BookDetails addToBookmark={addToBookmark} />}
        />
        <Route
          path="/bookmarks"
          element={
            <BookMark bookItems={bookItems} setBookItems={setBookItems} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
