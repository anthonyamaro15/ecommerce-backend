const User = require("../schemas/auth_schema");
const userRestricted = require("../middlewares/userRestricted");

function validateUser(req, res, next) {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ errMessage: "Please enter require fields" });
  } else {
    next();
  }
}

function validateCredentials(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errMessage: "Please enter email and password" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        console.log("here ", user);
        next();
      } else {
        res.status(404).json({ errMessage: "Invalid id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error finding the user" });
    });
}

module.exports = {
  validateUser,
  validateCredentials,
  validateId,
};
