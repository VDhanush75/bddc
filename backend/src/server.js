// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import dotenv from "dotenv";

// ✅ LOAD ENV FIRST
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});