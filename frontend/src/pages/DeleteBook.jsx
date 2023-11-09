import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

import BackButton from "../components/BackButton";
import axios from "axios";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-3">
        <BackButton />
        <h1 className="text-3xl my-4 font-bold">DELETE BOOK</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-[#01B4AF] rounded-xl w-[600px] px-8 py-4 space-y-4 mx-auto items-center justify-center">
        <h1 className="text-xl font-bold">
          Are you sure you want to delete this book?
        </h1>
        <button
          className="p-4 bg-red-500 rounded-md text-white w-1/2"
          onClick={handleDeleteBook}
        >
          Yes, delete it.
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
