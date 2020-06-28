const Product = require("../schemas/product_schema");

function validateProduct(req, res, next) {
  const {
    product_name,
    size,
    price,
    image_url,
    details,
    type,
    category,
    color,
  } = req.body;
  if (
    !product_name ||
    !size ||
    !price ||
    !image_url ||
    !details ||
    !type ||
    !category ||
    !color
  ) {
    res.status(400).json({ errMessage: "Please enter require fields" });
  } else {
    next();
  }
}

function validateProductId(req, res, next) {
  const { id, product_id } = req.params;
  Product.findAdminProduct(id, product_id).then((product) => {
    if (product.length > 0) {
      next();
    } else {
      res.status(404).json({ errMessage: "invalid product id" });
    }
  });
}

module.exports = {
  validateProduct,
  validateProductId,
};
