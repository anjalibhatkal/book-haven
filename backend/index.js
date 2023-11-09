import express from "express";
import { PORT, URI } from "./config.js";

import mongoose from "mongoose";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());
// to allow all origins

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Mern Stack");
});

app.use("/books", bookRoutes);

mongoose
  .connect(URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
