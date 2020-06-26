const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../schemas/auth_schema");
const { validateUser } = require("../validation/validateUser");
const { generateToken } = require("../middlewares/generateToken");

const route = express.Router();

// "email": "lisa@example.comn",
// "password": "lisa1"

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

// POST /api/auth/login
route.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findBy({ email })
    .then(([user]) => {
      console.log("here ", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ user: user.id, token });
      } else {
        res.status(400).json({ errMessage: "Invalid email or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error logging in" });
    });
});

module.exports = route;
