const result = require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const listingRoutes = require("./routes/listings");

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Request received")
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

app.listen(4000, () => console.log('Server app listening on port 4000'));
