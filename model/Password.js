import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    site: String,
    username: String,
    password: String,
})


export const Password = mongoose.model("Password", PasswordSchema);