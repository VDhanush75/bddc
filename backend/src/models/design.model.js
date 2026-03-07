

import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  images: [
    {
      url: String,
      public_id: String
    }
  ],

  availability: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true }
);

export default mongoose.model("Design", designSchema);