import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check console.");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const newBook = {
      title,
      author,
      publishYear,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, newBook)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check console.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-3">
        <BackButton />
        <h1 className="text-3xl my-4 font-bold">EDIT BOOK</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-[#01B4AF] rounded-xl w-[600px] px-14 py-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button
          className="p-2 bg-[#01B4AF] rounded-md m-3 text-xl text-white"
          onClick={handleEditBook}
        >
          Save Edit
        </button>
      </div>
    </div>
  );
};

export default EditBook;
