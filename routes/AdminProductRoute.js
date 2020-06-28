const express = require("express");
const Product = require("../schemas/product_schema");
const {
  validateProduct,
  validateProductId,
} = require("../validation/validateProduct");
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

// GET /api/product/account/:id/:product_id
route.get("/account/:id/:product_id", validateProductId, (req, res) => {
  const { id, product_id } = req.params;

  Product.findAdminProduct(id, product_id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "error here" });
    });
});

// PUT /api/product/account/:id/:product_id
route.put("/account/:id/:product_id", (req, res) => {
  const { id, product_id } = req.params;

  Product.updateProduct(id, product_id, req.body)
    .then((product) => {
      console.log("from routes ", product);
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "error hreer" });
    });
});

route.delete(
  "/account/:id/:product_id",
  validateId,
  validateProductId,
  (req, res) => {
    const { id, product_id } = req.params;

    Product.removeProduct(id, product_id)
      .then((product) => {
        res.status(200).json({ message: "product successfully removed" });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ errMessage: "there was an error deleting the product" });
      });
  }
);

// function convertStrToArr(arr) {
//   const newArr = arr.map((array) => {
//     let arrSize = array.size.split(",");
//     let arrColor = array.color.split(",");
//     return {
//       ...array,
//       size: arrSize,
//       color: arrColor,
//     };
//   });
//   return newArr;
// }

module.exports = route;
