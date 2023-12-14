import express from "express"
import { deleteCategory, getCategories, getCategoryById, insertCategory, updateCategory } from "../controllers/CategoriesController.js";

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", insertCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;

