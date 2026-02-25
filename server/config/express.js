const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

module.exports = function configureExpress() {
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  
  const apiRouter = require("../app/routers");
  app.use("/api", apiRouter);

  app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "COMP229 Assignment 2 API Running"
  });
});

  // 404
  app.use((req, res, next) => {
    next(createError(404, "Endpoint not found"));
  });

  // Global error handler 
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Server error"
    });
  });

  return app;
};