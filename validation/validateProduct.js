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

module.exports = {
  validateProduct,
};
