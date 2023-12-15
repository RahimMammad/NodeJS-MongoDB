import UserSchema from "../schemas/UserSchema.js"

export const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const getUserById = async(req, res) => {
    try {
        const users = await UserSchema.findById(req.params.id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({message: error})
        
    }
}

export const insertUser = async  (req, res) => {
    try {
        const user = new UserSchema({
            fullName: req.query.fullName,
            age: req.query.age,
            email: req.query.email
        })
        user.save()
        res.send({msg: "User created"})
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const updateUser = async (req, res) => {
    try {
        const users = await UserSchema.findByIdAndUpdate(req.params.id)
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
}

export const deleteUser = async (req, res) => {
    try {
        const users = await UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({msg: "User Deleted"})        
    } catch (error) {
        res.status(500).send({msg: error})
    }
}

