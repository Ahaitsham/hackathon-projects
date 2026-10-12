import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

export const SECRET_KEY =
  "ahtshamjflaksdjflajsdkflmahilfajsdlkfjronaklfajsdlkfj123123";

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

    const user = await User.findOne({ email: email });
    console.log(user);
    console.log("password before hashing " + password);
    console.log(user);

    if (user) {
      return res.status(401).json({
        message: "User already exists wiht this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password after hashing is " + hashedPassword);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User registered successfully",
      newUser,
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

export const login = async (req, res) => {
  // const password = req.body.password;
  // const email = req.body.email

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "something is missing",
      success: false,
    });
  }

  const user = await User.findOne({ email });
  // console.log(user);
  const storedPassword = user.password;
  // console.log(storedPassword)

  const isVerified = await bcrypt.compare(password, storedPassword);
  // console.log(isVerified)

  if (!isVerified) {
    return res.status(401).json({
      message: "Please enter correct password",
      success: false,
    });
  }

  const tokenData = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(tokenData, SECRET_KEY, {
    expiresIn: "1d",
  });

  console.log(token);

  return res.status(200).cookie('token',token,{
    httpOnly:'true',
    sameSite:'Strict'
  }).json({
    message: "user logged in successfully",
    success: true,
  });
};


export const logout = async (req,res)=>{
  try {
    
    res
      .status(200)
      .clearCookie('token')
      .json({
      message:"user logged out successfully",
      success:true
    })

  } catch (error) {
    
  }
}