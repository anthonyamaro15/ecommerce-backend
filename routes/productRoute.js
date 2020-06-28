const express = require("express");
const Product = require("../schemas/product_schema");

const route = express.Router();

route.get("/", (req, res) => {
  Product.getProducts()
    .then((products) => {
      // let newProducts = convertStrToArr(products);
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({ errMessage: "invalid" });
    });
});

module.exports = route;
