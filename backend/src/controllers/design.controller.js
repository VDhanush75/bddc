
import Design from "../models/design.model.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

// CREATE DESIGN
export const createDesign = async (req, res) => {

  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, description, price, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const uploadedImages = [];

    for (const file of req.files) {

      const result = await uploadToCloudinary(file.buffer);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }

    const design = await Design.create({
      title,
      description,
      price,
      category,
      images: uploadedImages
    });

    res.status(201).json(design);

  } catch (error) {

    console.error("UPLOAD ERROR:", error); // ⭐ REAL ERROR

    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};


// UPDATE DESIGN
export const updateDesign = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    design.title = title || design.title;
    design.description = description || design.description;
    design.price = price || design.price;
    design.category = category || design.category;

    await design.save();

    res.json(design);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update design" });
  }
};



// GET ALL DESIGNS
export const getDesigns = async (req, res) => {

  const designs = await Design
    .find()
    .populate("category");

  res.json(designs);
};


// GET SINGLE DESIGN
export const getDesign = async (req, res) => {

  const design = await Design
    .findById(req.params.id)
    .populate("category");

  res.json(design);
};


// DELETE DESIGN
export const deleteDesign = async (req, res) => {

  await Design.findByIdAndDelete(req.params.id);

  res.json({ message: "Design deleted" });
};