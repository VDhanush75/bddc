import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


// REGISTER USER
// export const registerUser = async (req, res) => {
//   const { name, email, phone, password } = req.body;

export const registerUser = async (req, res) => {

  console.log("BODY RECEIVED:", req.body);

  const { name, email, phone, password } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists){
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role)
  });
};


// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user && await user.matchPassword(password)){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};