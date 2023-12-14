import CategoriesSchema from "../schemas/CategoriesSchema.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoriesSchema.find({})
        res.send(categories)
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const getCategoryById = async(req, res) => {
    try {
        const categories = await CategoriesSchema.findById(req.params.id)
        res.send(categories)
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const insertCategory = async  (req, res) => {
    try {
        const category = new CategoriesSchema({
            name: req.query.name,
            description: req.query.description,
        })
        category.save()
        res.send({msg: "Category created"})
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const updateCategory = async (req, res) => {
    try {
        const categories = await CategoriesSchema.findByIdAndUpdate(req.params.id)
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
}

export const deleteCategory = async (req, res) => {
    try {
        const categories = await CategoriesSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({msg: "Category Deleted"})        
    } catch (error) {
        res.status(500).send({msg: error})
    }
}

