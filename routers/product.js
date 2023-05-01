const express = require("express");

const router = express.Router();

const Product = require("../models/products");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    console.log("get request");
  } catch (error) {
    res.send("error : ", error);
  }
});

router.post("/", async (req, res) => {
  const newProduct = new Product({
    // title: "Redmi",
    // price: "Rs. 30,300",
    // image: "",
    // details: "Redmi Black white shade",

    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    details: req.body.details,
  });
  try {
    const p1 = await newProduct.save();
    res.status(200).json(p1);
    console.log("get request");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
