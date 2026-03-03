const errorHandler = (err, req, res, next) => {

  console.error("GLOBAL ERROR:", err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message || "Server Error";

  // MongoDB Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }

  // Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production"
      ? null
      : err.stack
  });
};

export default errorHandler;