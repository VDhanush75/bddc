import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  design: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design"
  },

  eventDate: {
    type: Date,
    required: true
  },

  eventLocation: {
    type: String,
    required: true
  },

  customRequirements: {
    type: String
  },

  totalPrice: {
    type: Number,
    required: true
  },

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending"
  },

  paymentStatus: {
    type: String,
    enum: ["COD"],
    default: "COD"
  }
},
{ timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);