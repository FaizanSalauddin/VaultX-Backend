import mongoose from "mongoose";

let isConnected = false; // track connection status

// Function to connect with MongoDB
export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected ✅");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Password_Manager",
    });

    isConnected = true;
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

// Export connection state (for checking)
export { isConnected };
