/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
// Bring Mongoose into the app
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Build the connection string
const dbURI = process.env.DB_URl;

// Create the database connection
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log(dbURI);
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ");
    throw err;
  });
