import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const conntectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully");

  } catch (error) {
    console.log(error)
  }
};

export default conntectToDb

