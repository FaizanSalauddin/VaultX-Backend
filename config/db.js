// config/db.js
import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL
            ,
            { dbName: "Password_Manager" }
        ).then(() => console.log("Mongo DB connected..."))
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
};

export default {connectDB,isConnected};