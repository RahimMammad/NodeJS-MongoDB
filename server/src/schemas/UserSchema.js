import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        age: { type: Number, required: true }, 
        email: { type: String, unique: true, required: true }
    },
    {timestamps: true}
);

export default mongoose.model("User", UserSchema)