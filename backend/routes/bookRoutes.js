import express from "express";

import { BookModel } from "../models/bookModel.js";

const router = express.Router();

// to get details of one book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// to get details of all books
router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find({});

    return res.status(201).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// to create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : Author, Title, Publish Year",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await BookModel.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// to update a book in the database
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : Author, Title, Publish Year",
      });
    }

    const { id } = req.params;
    const result = await BookModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    } else {
      return res.status(201).send({ message: "Book updated succesfully!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    } else {
      return res.status(201).send({ message: "Book deleted succesfully!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
