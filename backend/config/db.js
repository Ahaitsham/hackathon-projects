import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const conntectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoApp");
    console.log("database is connected successfully");

  } catch (error) {
    console.log(error)
  }
};

export default conntectToDb

