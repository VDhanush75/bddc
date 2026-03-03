import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/customer", protect, (req, res) => {
  res.json({
    message: "Customer Route Accessed",
    user: req.user
  });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Admin Route Accessed"
  });
});

export default router;