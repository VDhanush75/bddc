// import { v2 as cloudinary } from "cloudinary";

// console.log("Cloudinary Key:", process.env.CLOUDINARY_KEY);

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

// export default cloudinary;

import dotenv from "dotenv";
dotenv.config(); // ✅ FORCE ENV LOAD HERE

import { v2 as cloudinary } from "cloudinary";

// Debug check
// console.log("Cloudinary ENV CHECK:");
// console.log("NAME:", process.env.CLOUDINARY_NAME);
// console.log("KEY:", process.env.CLOUDINARY_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export default cloudinary;