const result = require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const app = express();

const listingRoutes = require("./routes/listings");
// API limiter, 100 requests/15min
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/", apiLimiter);

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Request received");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", listingRoutes);

app.listen(4000, () => console.log("Server app listening on port 4000"));

module.exports = app;
