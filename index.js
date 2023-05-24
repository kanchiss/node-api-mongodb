const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

dotenv.config();

// connect
mongoose.connect(
  process.env.DB_CONNECT
  // "mongodb://0.0.0.0:27017/product"
  , {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());

const conn = mongoose.connection;
conn.on("open", function () {
  console.log("connected...........");
});

const productRoute = require("./routers/product");
app.use("/product", productRoute);

app.listen(4000, () => {
  console.log("server is up and running on 4000");
});
// mongodb://localhost:27017

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // if ( req.method === 'OPTIONS' ) {
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  //    return res.status ( 200 ).json ( {} );
  // }
  next();
});

app.post("/api/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const  product  = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 10,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});
// {
//   "name": "Redmi",
//   "price": 5,
//   "quantity": 1
// }