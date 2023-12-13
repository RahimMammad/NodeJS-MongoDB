import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express();
dotenv.config()

const {Schema} = mongoose

const userSchema = new Schema({
    fullName: {type:String, required: true},
    age: {type: Number, required: true},
    email: {type:String, unique: true, required: true},
}, {timestamps: true})

app.use(bodyParser.json())
app.use(cors());

const Users = mongoose.model("users", userSchema)

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

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err => console.log("DataBase is not connected", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})