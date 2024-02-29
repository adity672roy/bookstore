import React from "react";
import { Link } from "react-router-dom";

const BookDetails = ({ bookItems, setBookItems }) => {
  const removeBookmark = (bookId) => {
    setBookItems(bookItems.filter((bookmark) => bookmark.id !== bookId));
  };
  return (
    <>
      {bookItems && bookItems.length > 0 ? (
        <div className="container mx-auto mt-8 flex">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {bookItems.map((book) => (
              <div className="bg-white rounded-lg shadow-lg " key={book.id}>
                <Link to={`/details/${book.id}`}>
                  <div className=" h-[200px]">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail || ""}
                      alt={book.volumeInfo.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h2 className="text-xl font-semibold mb-1">
                      {book.volumeInfo.title}
                    </h2>
                    <p className="text-gray-600">
                      {book.volumeInfo.authors?.join(", ")}
                    </p>
                  </div>
                </Link>
                <div className="text-center p-2">
                  <button
                    onClick={() => removeBookmark(book.id)}
                    className=" w-full p-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-3xl font-bold">
          <h1>No Books</h1>
        </div>
      )}
    </>
  );
};

export default BookDetails;
