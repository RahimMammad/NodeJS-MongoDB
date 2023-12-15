import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import userRouter from "./src/routes/UserRouter.js";
import categoryRouter from "./src/routes/CategoryRouter.js";
import bookRouter from "./src/routes/BookRouter.js";


const app = express();
dotenv.config()

app.use(bodyParser.json())
app.use(cors());

app.use("/api/users", userRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/books", bookRouter)


const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err => console.log("DataBase is not connected", err))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})