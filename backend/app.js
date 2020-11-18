/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");

const logDirectory = path.join(__dirname, "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// specify the folder for upload
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

app.use("/category", express.static(path.join(__dirname, "/uploads/category")));
app.use("/activity", express.static(path.join(__dirname, "/uploads/activity")));
app.use("/class", express.static(path.join(__dirname, "/uploads/class")));
app.use("/user", express.static(path.join(__dirname, "/uploads/users")));
app.use("/", indexRouter);
//connect to mongoDB
require("./db");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
