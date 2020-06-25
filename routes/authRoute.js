const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../schemas/auth_schema");
const { validateUser } = require("../validation/validateUser");

const route = express.Router();

// POST /api/auth/register
route.post("/register", validateUser, (req, res) => {
  const credentials = req.body;
  const { email } = req.body;

  User.findBy({ email }).then((user) => {
    if (user) {
      res.status(400).json({ errMessage: "Email already taken" });
    } else {
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;
      User.add(credentials)
        .then(([user]) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ errMessage: "there was an error creating the account" });
        });
    }
  });
});

module.exports = route;
