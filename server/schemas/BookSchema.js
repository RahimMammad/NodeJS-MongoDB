import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true}, 
        category: [{type: String}],
        image: {type: String, required: true}
    },
    {timestamps: true}
);

export default mongoose.model("Book", BookSchema);
