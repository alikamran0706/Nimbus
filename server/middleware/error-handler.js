export default (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  if (err.name === "CastError") {
    err = new AppError("Invalid ID format", 400);
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
  });
};
