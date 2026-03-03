import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingEmail = async (booking, design, user) => {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.ADMIN_EMAIL,
    subject: "New Event Booking 🎉",

    html: `
      <h2>New Booking Received</h2>

      <p><strong>Customer:</strong> ${user.name}</p>
      <p><strong>Contact:</strong> ${user.phone}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Design:</strong> ${design.title}</p>
      <p><strong>Event Date:</strong> ${booking.eventDate}</p>
      <p><strong>Location:</strong> ${booking.eventLocation}</p>
      <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
      <p><strong>Requirements:</strong> ${booking.customRequirements || "None"}</p>
    `
  });
};