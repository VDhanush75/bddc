import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
} from "../controllers/booking.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// customer
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);

// admin
router.get("/", protect, authorize("admin"), getAllBookings);
router.put("/:id", protect, authorize("admin"), updateBookingStatus);

export default router;