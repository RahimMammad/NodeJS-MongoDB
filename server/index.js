import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express();
dotenv.config()

const { Schema } = mongoose
app.use(bodyParser.json())
app.use(cors());



const userSchema = new Schema({
    fullName: {type:String, required: true},
    age: {type: Number, required: true},
    email: {type:String, unique: true, required: true},
}, {timestamps: true})

const Users = mongoose.model("users", userSchema)

const categoriesSchema = new Schema({
    name: {type:String, required: true},
    description: {type: String, required: true},
}, {timestamps: true})

const Categories = mongoose.model("categories", categoriesSchema)




app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send({message: error})
    }
})

app.post("/users", (req, res) => {
    const user = new Users({
        fullName: req.query.fullName,
        age: req.query.age,
        email: req.query.email
    })
    user.save()
    res.send({msg: "User created"})
})

app.put("/users/:id", async (req, res) => {
    try {
        const users = await Users.findByIdAndUpdate(req.params.id)
        if(users) {
            users.fullName = req.query.fullName,
            users.age = req.query.age,
            users.email = req.query.email           
            await users.save()
            res.send({msg: "User Updated"})
        } else {
            res.status(404).json({message:"Not Found"})
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const users = await Users.findByIdAndDelete(req.params.id)
        res.status(200).send({msg: "User Deleted"})        
    } catch (error) {
        res.status(500).send({msg: error})
    }
})

app.get("/categories", async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.send(categories)
    } catch (error) {
        res.status(500).send({message: error})
    }
})

app.get("/categories/:id", async (req, res) => {
    try {
        const categories = await Categories.findById(req.params.id)
        res.send(categories)
    } catch (error) {
        res.status(500).send({message: error})
    }
})

app.post("/categories", (req, res) => {
    const category = new Categories({
        name: req.query.name,
        description: req.query.description,
    })
    category.save()
    res.send({msg: "Category created"})
})

app.put("/categories/:id", async (req, res) => {
    try {
        const categories = await Categories.findByIdAndUpdate(req.params.id)
        if(categories) {
            categories.name = req.query.name,
            categories.description = req.query.description,          
            await categories.save()
            res.send({msg: "Category Updated"})
        } else {
            res.status(404).json({message:"Not Found"})
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

app.delete("/categories/:id", async (req, res) => {
    try {
        const categories = await Categories.findByIdAndDelete(req.params.id)
        res.status(200).send({msg: "Category Deleted"})        
    } catch (error) {
        res.status(500).send({msg: error})
    }
})

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err => console.log("DataBase is not connected", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})