const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// connect
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParse: true,
  },
  () => console.log("DB connected")
);

app.listen(4000, () => {
  console.log("server is up and running on 4000");
});
// mongodb://localhost:27017
