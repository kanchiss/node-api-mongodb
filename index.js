const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// connect
mongoose.connect("mongodb://0.0.0.0:27017/product", {
  useNewUrlParser: true
});

const conn = mongoose.connection;
conn.on("open", function () {
  console.log("connected...........");
});

app.listen(4000, () => {
  console.log("server is up and running on 4000");
});
// mongodb://localhost:27017
