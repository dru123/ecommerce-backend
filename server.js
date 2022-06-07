const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
//create a file for logging the events
const accessFileStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

//using morgan which help in logging the request in the above file
app.use(morgan("combined", { stream: accessFileStream }));

//parsing the incoming request
app.use(express.json());

//to use env file we have require it
require("dotenv").config();

//allowing types of request  and header to make request.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//parse the request and give access of  data in the request body
app.use(bodyParser.urlencoded({ extended: false }));

// apis
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

//creating error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong in server";
  res.status(statusCode).json({ message: errorMessage });
});

//connecting mongo  database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000);
    console.log("server strt");
  })
  .catch((err) => {
    console.log(err);
  });
