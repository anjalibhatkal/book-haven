import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <nav className="bg-[#01B4AF] p-8">
        <div className="container mx-auto">
          <div className="text-white font-bold text-4xl text-center">
            Book Haven
          </div>
        </div>
      </nav>
      <div className="p-4">
        <h1 className="text-2xl my-2 mx-2 font-bold">
          Bibliophilic Chronicles
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="border border-[#01B4AF] rounded-md text-xl">
                  No.
                </th>
                <th className="border border-[#01B4AF] rounded-md text-xl">
                  Title
                </th>
                <th className="border border-[#01B4AF] rounded-md max-md:hidden text-xl">
                  Author
                </th>
                <th className="border border-[#01B4AF] rounded-md max-md:hidden text-xl">
                  Publish Year
                </th>
                <th className="border border-[#01B4AF] rounded-md  text-xl">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-[#01B4AF] rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-[#01B4AF] rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-[#01B4AF] rounded-md text-center max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-[#01B4AF] rounded-md text-center max-md:hidden">
                    {book.publishYear}
                  </td>
                  <td className="border border-[#01B4AF] rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link
        to="/books/create"
        className="flex justify-center items-center space-x-2 p-2 bg-[#01B4AF] w-56 mx-auto rounded-md text-white text-xl"
      >
        <MdOutlineAddBox />
        <p>Add a Book</p>
      </Link>
    </div>
  );
};

export default Home;
