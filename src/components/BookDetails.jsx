import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = ({ addToBookmark }) => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        const data = await response.json();

        setBookDetails(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="container mx-auto p-4 md:grid md:grid-cols-2 md:gap-4">
      <div className="mb-4 md:mb-0 md:col-span-1">
        <img
          src={bookDetails.volumeInfo?.imageLinks?.thumbnail}
          alt="Book cover"
          className="object-contain w-full h-[50%] rounded-lg shadow-lg"
        />
      </div>

      <div className="md:col-span-1">
        <h2 className="text-3xl font-semibold mb-2">
          {bookDetails.volumeInfo?.title}
        </h2>
        <p className="text-gray-600">{`Author: ${
          bookDetails.volumeInfo?.authors.join(", ") || "Unknown Author"
        }`}</p>
        <p className="text-gray-700 mt-2">
          {bookDetails.volumeInfo?.description}
        </p>
        <button
          className="p-2 m-2 w-full bg-blue-500 text-white rounded "
          onClick={() => addToBookmark(bookDetails)}
        >
          Add to Bookmarks
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
