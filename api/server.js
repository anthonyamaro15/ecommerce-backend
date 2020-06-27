const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoute = require("../routes/authRoute");
const userRestricted = require("../middlewares/userRestricted");

const productRoute = require("../routes/productRoute");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoute);

// /api/product/account/:id
server.use(
  "/api/product",
  userRestricted,
  checkAdmin(process.env.ROLE),
  productRoute
);

// let arr = ["hree", "are", "examples"];
// console.log(JSON.stringify(arr));

function checkAdmin(roles) {
  return (req, res, next) => {
    if (req.decodedToken.user && req.decodedToken.user === roles) {
      next();
    } else {
      res.status(403).json({ errMessage: "you are not allowed." });
    }
  };
}
module.exports = server;
