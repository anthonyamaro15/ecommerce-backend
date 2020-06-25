function validateUser(req, res, next) {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ errMessage: "Please enter require fields" });
  } else {
    next();
  }
}

module.exports = {
  validateUser,
};
