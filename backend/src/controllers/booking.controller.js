import { sendBookingEmail } from "../services/email.service.js";
import Booking from "../models/booking.model.js";
import Design from "../models/design.model.js";


// CUSTOMER BOOK DESIGN
export const createBooking = async (req, res) => {

  try {

    const { designId, eventDate, eventLocation, customRequirements } = req.body;

    const design = await Design.findById(designId);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // const booking = await Booking.create({
    //   user: req.user._id,
    //   design: designId,
    //   eventDate,
    //   eventLocation,
    //   customRequirements,
    //   totalPrice: design.price
    // });

    // res.status(201).json(booking);

    const booking = await Booking.create({
  user: req.user._id,
  design: designId,
  eventDate,
  eventLocation,
  customRequirements,
  totalPrice: design.price
});

// send email
await sendBookingEmail(booking, design, req.user);

res.status(201).json(booking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
};


// CUSTOMER BOOKINGS
export const getMyBookings = async (req, res) => {

  const bookings = await Booking.find({ user: req.user._id })
    .populate("design");

  res.json(bookings);
};


// ADMIN VIEW ALL BOOKINGS
export const getAllBookings = async (req, res) => {

  const bookings = await Booking.find()
    .populate("user")
    .populate("design");

  res.json(bookings);
};


// // ADMIN UPDATE STATUS
// export const updateBookingStatus = async (req, res) => {

//   const booking = await Booking.findById(req.params.id);

//   if (!booking) {
//     return res.status(404).json({ message: "Booking not found" });
//   }

//   booking.bookingStatus = req.body.status;

//   await booking.save();

//   res.json(booking);
// };

// ADMIN UPDATE STATUS
export const updateBookingStatus = async (req, res) => {

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.bookingStatus = req.body.bookingStatus;

  await booking.save();

  res.json(booking);
};