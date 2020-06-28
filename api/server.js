const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoute = require("../routes/authRoute");
const userRestricted = require("../middlewares/userRestricted");

const adminProductRoute = require("../routes/AdminProductRoute");
const productRoute = require("../routes/productRoute");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoute);

// /api/product/account/:id
server.use(
  "/api/product",
  //   userRestricted,
  //   checkAdmin(process.env.ROLE),
  adminProductRoute
);

server.use("/products", productRoute);

// let arr = ["hree", "are", "examples"];
// console.log(JSON.stringify(arr));

("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo" <ecommercetest15@gmail.com>', // sender address
    to: "", // list of receivers
    subject: "noreplay", // Subject line
    text: "Welcome", // plain text body
    html: "<b>Thanks for joining<h2>P&Con</2></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
// console.log(process.env.GMAIL_PASS);

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
