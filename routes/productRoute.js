const express = require("express");
const Product = require("../schemas/product_schema");
const { validateProduct } = require("../validation/validateProduct");
const { validateId } = require("../validation/validateUser");

const route = express.Router();

// POST /api/product/account/:id
route.post("/account/:id", validateProduct, validateId, (req, res) => {
  const { id } = req.params;

  Product.add(req.body, id)
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was a problem adding the product" });
    });
});

// POST /api/product/account/:id
route.post("/account/size/:product_id", (req, res) => {
  const { product_id } = req.params;
});

route.get("/account", (req, res) => {
  Product.getAll()
    .then((products) => {
      let newProducts = convertStrToArr(products);
      res.status(200).json(newProducts);
    })
    .catch((err) => {
      res.status(400).json({ errMessage: "invalid" });
    });
});

function convertStrToArr(arr) {
  const newArr = arr.map((array) => {
    let arrSize = array.size.split(",");
    let arrColor = array.color.split(",");
    return {
      ...array,
      size: arrSize,
      color: arrColor,
    };
  });
  return newArr;
}

module.exports = route;
