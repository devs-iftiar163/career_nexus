import mongoose from "mongoose";

// Database Connection
export const mongodbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_API);
    console.log(`MongoDB Connected`.bgCyan.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};
