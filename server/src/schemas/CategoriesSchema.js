import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true }
    },
    {timestamps: true}
);

export default mongoose.model("Category", CategoriesSchema)

