import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";

export const getDashboardStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      bookingStatus: "Pending"
    });

    const completedBookings = await Booking.countDocuments({
      bookingStatus: "Completed"
    });

    const revenueData = await Booking.aggregate([
      {
        $match: { bookingStatus: "Completed" }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
};