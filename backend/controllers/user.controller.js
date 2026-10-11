import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        message: "something is missing please fill all details",
        success: false,
      });
    }

    const user = await User.find({ email:email });
    console.log("password before hashing " + password);
    console.log(user)

    if (user) {
      return res.status(401).json({
        message: "User already exists wiht this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password after hashing is " + hashedPassword);

    await User.create({
      name, 
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User registered successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Something went wrong",
      success: false,
    });
    console.log(error);
  }
};
