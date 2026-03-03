import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", protect, authorize("admin"), createCategory);

router.put("/:id", protect, authorize("admin"), updateCategory);

router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;