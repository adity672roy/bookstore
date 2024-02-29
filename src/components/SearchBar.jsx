// src/components/SearchBar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = ({ addToBookmark }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setBooks([]);
    }
  }, [search]);

  const filteredBooks = books?.filter(
    (book) =>
      (!category ||
        (book.volumeInfo.categories &&
          book.volumeInfo.categories.includes(category))) &&
      (!minDate ||
        (book.volumeInfo.publishedDate &&
          book.volumeInfo.publishedDate >= minDate)) &&
      (!maxDate ||
        (book.volumeInfo.publishedDate &&
          book.volumeInfo.publishedDate <= maxDate))
  );

  return (
    <div className="p-3">
      <div className="container mx-auto mt-8">
        <div>
          <h1 className="font-bold text-2xl">SEARCH ANY BOOK</h1>
          <input
            type="text"
            placeholder="Search for books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="m-2 p-2 w-[100%] border border-gray-300 rounded"
          />
        </div>
        <div className="p-2 flex-wrap flex items-center justify-between">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded "
          >
            <option value="">All category</option>
            {books?.map((book) => (
              <option key={book.id} value={book.volumeInfo.categories}>
                {book.volumeInfo.categories}
              </option>
            ))}
          </select>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Min Publication Date:
            </label>
            <input
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Max Publication Date:
            </label>
            <input
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks?.map((book) => (
            <div className="bg-white rounded-lg shadow-lg" key={book.id}>
              <Link to={`/details/${book.id}`}>
                <div className="h-[200px]">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || ""}
                    alt={book.volumeInfo.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="p-2 text-center">
                  <h2 className="text-md font-semibold mb-2">
                    {book.volumeInfo.title}
                  </h2>
                  <p className="text-gray-600">{book.volumeInfo.categories}</p>
                </div>
              </Link>
              <div className="text-center m-2">
                <button
                  className="p-2 bg-blue-500 text-white rounded"
                  onClick={() => addToBookmark(book)}
                >
                  Add to Bookmarks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
