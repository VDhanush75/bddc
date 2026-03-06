
// real code with cloudinary integration
import express from "express";
import {
  createDesign,
  getDesigns,
  getDesign,
  deleteDesign
} from "../controllers/design.controller.js";

import upload from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getDesigns);
router.get("/:id", getDesign);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  createDesign
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDesign
);

export default router;