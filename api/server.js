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
server.use("/api/product", productRoute);

// let arr = ["hree", "are", "examples"];
// console.log(JSON.stringify(arr));
module.exports = server;
