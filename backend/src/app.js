import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import designRoutes from "./routes/design.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();





app.use(express.json());

// test route
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);


// Security middleware
// app.use(helmet());

// // Rate limiting
// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// }));

// Security middleware####
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Body parser
// app.use(express.json());

// CORS
// app.use(cors());

// CORS with specific origins and credentials
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://your-frontend-domain.vercel.app"
//   ],
//   credentials: true
// }));


// allow CORS for all origins (for development)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.send("BDD Celebrations API Running");
});

app.use("/api/protected", protectedRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/designs", designRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;