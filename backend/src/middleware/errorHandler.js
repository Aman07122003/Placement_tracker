// errorHandlerController.js
import { APIError } from "../utils/APIError.js";

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log the error (optional — can be expanded for production)
  if (process.env.NODE_ENV !== "test") {
    console.error(`[Error] ${req.method} ${req.url} —`, message);
  }

  // If it's an instance of your custom APIError, respect its status/message
  if (err instanceof APIError) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Handle specific known error types (optional)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // Uncomment for dev/debugging
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export { errorHandler };
