import BookSchema from "../schemas/BookSchema.js"

export const getBooks = async (req, res) => {
    try {
        const books = await BookSchema.find({})
        res.status(200).send(books)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const insertBook = async  (req, res) => {
    try {
        const book = new BookSchema({
            title: req.query.title,
            description: req.query.description,
            category: req.query.category,
            image: req.query.image
        })
        book.save()
        res.status(200).send({msg: "Book created"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateBook= async (req, res) => {
    try {
        const updatedBook = await BookSchema.findByIdAndUpdate(req.params.id)
        if(updatedBook) {
            updatedBook.title = req.query.title
            updatedBook.description = req.query.description,
            updatedBook.category = req.query.category,
            updatedBook.image = req.query.image
            await updatedBook.save()
            res.status(200).send({msg: "Book Updated"})
        } else {
            res.status(404).send({msg: "Not Found"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await BookSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({msg: "Book Deleted"})
    } catch (error) {
        res.status(500).send(error)
    }
}

