import express from "express"
import { getBooks, insertBook, updateBook, deleteBook } from "../controllers/BookController.js";

const bookRouter = express.Router()

bookRouter.get("/", getBooks);
bookRouter.post("/", insertBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
