import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {

  const adminExists = await User.findOne({
    email: "admin@bdd.com"
  });

  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  const admin = await User.create({
    name: "Admin",
    email: "admin@bdd.com",
    phone: "9999999999",
    password: "admin123",
    role: "admin"
  });

  console.log("Admin Created Successfully ✅");
  console.log(admin);

  process.exit();
};

createAdmin();