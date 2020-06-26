const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoute = require("../routes/authRoute");
const userRestricted = require("../middlewares/userRestricted");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoute);

module.exports = server;
