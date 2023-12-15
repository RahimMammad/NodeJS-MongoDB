import express from "express"
import { getUsers, getUserById, insertUser, updateUser, deleteUser } from "../controllers/UserController.js";

const userRouter = express.Router()

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", insertUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter